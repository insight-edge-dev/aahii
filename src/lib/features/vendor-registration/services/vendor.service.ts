import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { vendorSchema } from "@/lib/features/vendor-registration/validations/vendor";
import { DocumentType, Prisma, VendorStatus } from "@prisma/client";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

const DEBUG_LOG_PATH = path.join(process.cwd(), "debug-log.txt");

function logDebug(message: string, data?: any) {
  const logEntry = `\n[${new Date().toISOString()}] ${message}\n${data ? JSON.stringify(data, null, 2) : ""}\n`;
  fs.appendFileSync(DEBUG_LOG_PATH, logEntry);
}

const MAX_FILE_SIZE = 300 * 1024;

type UploadedDocument = {

  documentType: DocumentType;

  fileUrl: string;

  publicId: string;

  originalName: string;

  fileSize: number;

  mimeType: string;

};

type VendorDocumentKey =
  | "PAN_CARD"
  | "CANCELLED_CHEQUE"
  | "DECLARATION_FORM"
  | "GST_CERTIFICATE"
  | "MSME_CERTIFICATE"
  | "AUTHORIZATION_CERTIFICATE"
  | "TRADE_LICENSE"
  | "ITR_YEAR_1"
  | "ITR_YEAR_2"
  | "PF_REGISTRATION"
  | "ESIC_REGISTRATION"
  | "CLRA_REGISTRATION";

type DocumentRule = {
  required?: true;
  requiredIf?: (data:any)=>boolean;
};

const DOCUMENT_CONFIG:Record<VendorDocumentKey,DocumentRule> = {

  PAN_CARD:{ required:true },

  CANCELLED_CHEQUE:{ required:true },

  DECLARATION_FORM:{ required:true },

  GST_CERTIFICATE:{
    requiredIf:(data)=>data.taxDetails.gstApplicable
  },

  MSME_CERTIFICATE:{
    requiredIf:(data)=>data.taxDetails.msmeApplicable
  },

  AUTHORIZATION_CERTIFICATE:{
    requiredIf:(data)=>data.documentFlags?.hasAuthorizationCertificate
  },

  TRADE_LICENSE:{
    requiredIf:(data)=>data.documentFlags?.hasTradeLicense
  },

  ITR_YEAR_1:{
    requiredIf:(data)=>data.documentFlags?.hasItrYear1
  },

  ITR_YEAR_2:{
    requiredIf:(data)=>data.documentFlags?.hasItrYear2
  },

  PF_REGISTRATION:{
    requiredIf:(data)=>data.documentFlags?.hasPfRegistration
  },

  ESIC_REGISTRATION:{
    requiredIf:(data)=>data.documentFlags?.hasEsicRegistration
  },

  CLRA_REGISTRATION:{
    requiredIf:(data)=>data.documentFlags?.hasClraRegistration
  }

};
const ALLOWED_MIME = ["application/pdf"];

function isValidFile(file: File) {
  return (
    file.type.startsWith("image/") ||
    ALLOWED_MIME.includes(file.type)
  );
}
/* ===================================================== */
/* ================= REGISTER VENDOR =================== */
/* ===================================================== */

export async function registerVendor(formData: FormData) {

  const vendorId = randomUUID();

  const uploadedPublicIds:string[] = [];

  const isFileLike = (value:unknown): value is Blob =>
    value instanceof Blob &&
    typeof (value as Blob).arrayBuffer === "function";

  try{

    /* ================= Parse payload ================= */

    const raw = formData.get("vendorData");

    if(!raw || typeof raw !== "string"){

      return {
        success:false,
        status:400,
        message:"Invalid payload"
      };

    }

    let jsonPayload:any;

    try{
      jsonPayload = JSON.parse(raw);
    }
    catch{

      return {
        success:false,
        status:400,
        message:"Invalid JSON"
      };

    }

    const parsed = vendorSchema.safeParse(jsonPayload);

    if(!parsed.success){

      return {
        success:false,
        status:400,
        message:"Validation failed",
        errors:parsed.error.flatten()
      };

    }

    const data = parsed.data;

    /* ================= Duplicate check ================= */

    const existing = await prisma.vendor.findUnique({
      where:{ email:data.email }
    });

    if(existing){

      return {
        success:false,
        status:409,
        message:"Vendor already exists"
      };

    }

    /* ================= Build required docs ================= */

    const requiredDocs:VendorDocumentKey[] = [];

    for(const doc of Object.keys(DOCUMENT_CONFIG) as VendorDocumentKey[]){

      const config = DOCUMENT_CONFIG[doc];

      if(config.required === true){
        requiredDocs.push(doc);
        continue;
      }

      if(config.requiredIf?.(data)){
        requiredDocs.push(doc);
      }

    }

    /* ================= Validate missing docs ================= */

    const missingDocs:VendorDocumentKey[] = [];

    for(const doc of requiredDocs){

      const file = formData.get(doc);

      if(!isFileLike(file)){
        missingDocs.push(doc);
      }

    }

    if(missingDocs.length){

      return {
        success:false,
        status:400,
        message:"Missing required documents",
        missingDocs
      };

    }

    /* ================= Upload only provided docs ================= */

    const providedDocs =
    Array.from(formData.keys())
    .filter(k => k in DOCUMENT_CONFIG) as VendorDocumentKey[];

    const uploadDocs =
    new Set<VendorDocumentKey>([
      ...requiredDocs,
      ...providedDocs
    ]);

const uploadedDocuments = [] as UploadedDocument[];
    for(const docType of uploadDocs){

      const file = formData.get(docType);

      if(!isFileLike(file)) continue;

      const typedFile = file as File;

      /* MIME validation */

      if(
        !typedFile.type.startsWith("image/") &&
        !ALLOWED_MIME.includes(typedFile.type)
      ){

        throw new Error(`${docType} invalid file type`);

      }

      /* Size validation */

      if(typedFile.size > MAX_FILE_SIZE){

        throw new Error(`${docType} exceeds 300KB`);

      }

      /* Upload */

      const buffer = Buffer.from(
        await typedFile.arrayBuffer()
      );

      const upload = await new Promise<{
        secure_url:string;
        public_id:string;
      }>((resolve,reject)=>{

        cloudinary.uploader.upload_stream(

          {
            resource_type:"auto",
            folder:`aahii/vendor-request/${vendorId}`
          },

          (error,result)=>{

            if(error || !result){
              return reject(error);
            }

            resolve(result as any);

          }

        ).end(buffer);

      });

      uploadedPublicIds.push(upload.public_id);

      uploadedDocuments.push({

        documentType:docType as DocumentType,

        fileUrl:upload.secure_url,

        publicId:upload.public_id,

        originalName:typedFile.name ?? "uploaded-file",

        fileSize:typedFile.size,

        mimeType:typedFile.type

      });

    }

    /* ================= DB TRANSACTION ================= */

    await prisma.$transaction(async(tx)=>{

      await tx.vendor.create({

        data:{
          id:vendorId,
          entityName:data.entityName,
          email:data.email,
          website:data.website ?? null,
          status:VendorStatus.PENDING
        }

      });

      await tx.vendorCategory.createMany({

        data:data.category.map(cat=>({

          vendorId,
          category:cat

        }))

      });

      await tx.vendorAddress.create({

        data:{

          vendorId,

          registeredAddress:
            data.registeredAddress.address,

          registeredPin:
            data.registeredAddress.pin,

          registeredContact:
            data.registeredAddress.contactNumber,

          sameAsRegistered:
            data.communicationAddress.sameAsRegistered,

          communicationAddress:
            data.communicationAddress.sameAsRegistered
            ? data.registeredAddress.address
            : data.communicationAddress.address,

          communicationPin:
            data.communicationAddress.sameAsRegistered
            ? data.registeredAddress.pin
            : data.communicationAddress.pin,

          communicationContact:
            data.communicationAddress.sameAsRegistered
            ? data.registeredAddress.contactNumber
            : data.communicationAddress.contactNumber

        }

      });

      const tax = data.taxDetails;

      const gst = tax.gstApplicable ? tax : null;
      const msme = tax.msmeApplicable ? tax : null;

      await tx.vendorTaxDetails.create({

        data:{

          vendorId,

          panNumber:tax.panNumber,

          cinNumber:tax.cinNumber ?? null,

          gstApplicable:tax.gstApplicable,

          gstRegistrationType:
            gst?.gstRegistrationType ?? null,

          gstNumber:
            gst?.gstNumber ?? null,

          msmeApplicable:tax.msmeApplicable,

          msmeNumber:
            msme?.msmeNumber ?? null,

          msmeType:
            msme?.msmeType ?? null,

          msmeClass:
            msme?.msmeClass ?? null

        }

      });

      await tx.vendorBusinessDetails.create({

        data:{

          vendorId,

          establishmentType:
            data.businessDetails.establishmentType,

          keyProducts:
            data.businessDetails.keyProducts,

          specificProducts:
            data.businessDetails.specificProducts,

          hasRelationWithAGIHF:
            data.businessDetails.hasRelationWithAGIHF,

          relationDetails:
            data.businessDetails.relationDetails ?? null

        }

      });

      await tx.vendorApplicant.create({

        data:{

          vendorId,

          applicantName:
            data.applicant.applicantName,

          authorisedPerson:
            data.applicant.authorisedPerson

        }

      });

      if(uploadedDocuments.length){

        await tx.vendorDocument.createMany({

          data:uploadedDocuments.map(doc=>({

            vendorId,
            documentType:doc.documentType,
            fileUrl:doc.fileUrl,
            publicId:doc.publicId,
            originalName:doc.originalName

          }))

        });

      }

    });

    return {

      success:true,

      status:201,

      vendorId

    };

  }
  catch(error){

    await Promise.allSettled(

      uploadedPublicIds.map(id =>
        cloudinary.uploader.destroy(id)
      )

    );

    console.error(error);

    return {

      success:false,

      status:500,

      message:"Vendor registration failed"

    };

  }

}

/* ===================================================== */
/* ================= APPROVE VENDOR ==================== */
/* ===================================================== */

export async function approveVendor(vendorId: string) {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      include: { documents: true },
    });

    if (!vendor) {
      return { success: false, status: 404, message: "Vendor not found" };
    }

    if (vendor.status === VendorStatus.APPROVED) {
      return { success: true, status: 200 };
    }

    if (vendor.status !== VendorStatus.PENDING) {
      return {
        success: false,
        status: 400,
        message: "Vendor is not in pending state",
      };
    }

    /* ========== Rename Files FIRST ========== */

    const renamedDocs = await Promise.all(
      vendor.documents.map(async (doc) => {
        const filename = doc.publicId.split("/").pop();
        const newPublicId = `aahii/vendors/${vendorId}/${filename}`;

        const result = await cloudinary.uploader.rename(
          doc.publicId,
          newPublicId,
          { overwrite: true },
        );

        return {
          id: doc.id,
          publicId: result.public_id,
          fileUrl: result.secure_url,
        };
      }),
    );

    /* ========== Short DB Transaction ========== */

    await prisma.$transaction(async (tx) => {
      for (const doc of renamedDocs) {
        await tx.vendorDocument.update({
          where: { id: doc.id },
          data: {
            publicId: doc.publicId,
            fileUrl: doc.fileUrl,
          },
        });
      }

      await tx.vendor.update({
        where: { id: vendorId },
        data: { status: VendorStatus.APPROVED },
      });
    });

    return { success: true, status: 200 };
  } catch (error) {
    console.error("Approve Error:", error);
    return {
      success: false,
      status: 500,
      message: "Approval failed",
    };
  }
}

/* ===================================================== */
/* ================= REJECT VENDOR ===================== */
/* ===================================================== */

export async function rejectVendor(vendorId: string, reason: string) {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      return { success: false, status: 404, message: "Vendor not found" };
    }

    if (vendor.status === VendorStatus.REJECTED) {
      return { success: true, status: 200 };
    }

    await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        status: VendorStatus.REJECTED,
        adminReview: {
          upsert: {
            create: {
              rejectionReason: reason,
              reviewedAt: new Date(),
            },
            update: {
              rejectionReason: reason,
              reviewedAt: new Date(),
            },
          },
        },
      },
    });

    return { success: true, status: 200 };
  } catch (error) {
    console.error("Reject Error:", error);
    return {
      success: false,
      status: 500,
      message: "Rejection failed",
    };
  }
}

/* ===================================================== */
/* ================= FETCH ============================= */
/* ===================================================== */

export async function getVendors(status?: VendorStatus) {
  return prisma.vendor.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getVendorById(id: string) {
  return prisma.vendor.findUnique({
    where: { id },
    include: {
      categories: true,
      address: true,
      taxDetails: true,
      business: true,
      applicant: true,
      documents: true,
    },
  });
}
