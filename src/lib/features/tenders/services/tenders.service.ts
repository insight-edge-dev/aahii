import { randomUUID } from "crypto";
import { TenderDocumentKind } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import {
  createTenderSchema,
  tenderDocumentInputSchema,
  updateTenderSchema,
} from "../validations/tenders.validation";

const TENDER_FOLDER = "aahii/tenders";
const MAX_DOCUMENT_SIZE = 25 * 1024 * 1024;

type ServiceResponse<T = unknown> = {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
  errors?: unknown;
};

type UploadResult = {
  secure_url: string;
  public_id: string;
};

type ParsedDocumentUpload = {
  title: string;
  kind: TenderDocumentKind;
  sortOrder: number;
  file: File;
};

const isFileLike = (value: unknown): value is Blob =>
  value instanceof Blob &&
  typeof (value as Blob).arrayBuffer === "function" &&
  (value as Blob).size > 0;

function ok<T>(data: T, status = 200): ServiceResponse<T> {
  return { success: true, status, data };
}

function fail(
  message: string,
  status = 400,
  errors?: unknown,
): ServiceResponse {
  return {
    success: false,
    status,
    message,
    errors,
  };
}

function parseJson(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") {
    throw new Error("Invalid request payload");
  }

  return JSON.parse(value);
}

function normalizeOptionalText(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

async function uploadPdf(file: File, tenderId: string): Promise<UploadResult> {
  if (file.type !== "application/pdf") {
    throw new Error("Only PDF documents are allowed");
  }

  if (file.size > MAX_DOCUMENT_SIZE) {
    throw new Error("PDF document must be under 25MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `${TENDER_FOLDER}/${tenderId}`,
          resource_type: "raw",
          format: "pdf",
        },
        (error, result) => {
          if (error || !result) {
            reject(new Error("Document upload failed"));
            return;
          }

          resolve(result as UploadResult);
        },
      )
      .end(buffer);
  });
}

async function deleteCloudinaryFile(publicId: string) {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
  });
}

function parseDocumentUploads(formData: FormData): ParsedDocumentUpload[] {
  const raw = formData.get("documents");

  if (!raw) return [];

  const parsedJson = JSON.parse(String(raw));
  const parsed = Array.isArray(parsedJson) ? parsedJson : [];

  return parsed.map((item, index) => {
    const validation = tenderDocumentInputSchema.safeParse({
      title: item.title,
      kind: item.kind,
      sortOrder: item.sortOrder ?? index,
    });

    if (!validation.success) {
      throw new Error("Invalid document metadata");
    }

    const file = formData.get(`documentFile_${index}`);

    if (!isFileLike(file)) {
      throw new Error(`Missing PDF file for ${validation.data.title}`);
    }

    return {
      title: validation.data.title,
      kind: validation.data.kind as TenderDocumentKind,
      sortOrder: validation.data.sortOrder ?? index,
      file: file as File,
    };
  });
}

async function replaceDocuments(
  tenderId: string,
  documents: ParsedDocumentUpload[],
) {
  if (!documents.length) return;

  const existing = await prisma.tenderDocument.findMany({
    where: { tenderId },
  });

  const uploadedPublicIds: string[] = [];

  try {
    const uploadedDocuments = await Promise.all(
      documents.map(async (document) => {
        const upload = await uploadPdf(document.file, tenderId);
        uploadedPublicIds.push(upload.public_id);

        return {
          tenderId,
          kind: document.kind,
          title: document.title,
          fileUrl: upload.secure_url,
          publicId: upload.public_id,
          originalName: document.file.name,
          sortOrder: document.sortOrder,
        };
      }),
    );

    await prisma.$transaction([
      prisma.tenderDocument.deleteMany({
        where: { tenderId },
      }),
      prisma.tenderDocument.createMany({
        data: uploadedDocuments,
      }),
    ]);

    await Promise.all(
      existing.map((document) => deleteCloudinaryFile(document.publicId)),
    );
  } catch (error) {
    await Promise.all(uploadedPublicIds.map(deleteCloudinaryFile));
    throw error;
  }
}

export async function createTender(
  formData: FormData,
): Promise<ServiceResponse> {
  const tenderId = randomUUID();
  let createdTenderId: string | null = null;

  try {
    const parsedJson = parseJson(formData.get("tenderData"));
    const validation = createTenderSchema.safeParse(parsedJson);

    if (!validation.success) {
      return fail("Validation failed", 400, validation.error.flatten());
    }

    const documents = parseDocumentUploads(formData);

    const tender = await prisma.tender.create({
      data: {
        id: tenderId,
        ref: validation.data.ref,
        title: validation.data.title,
        description: validation.data.description,
        itemType: normalizeOptionalText(validation.data.itemType),
        bidSubmission: normalizeOptionalText(validation.data.bidSubmission),
        status: validation.data.status,
        archived: validation.data.archived ?? false,
        isActive: validation.data.isActive ?? true,
      },
      include: {
        documents: {
          orderBy: [{ kind: "asc" }, { sortOrder: "asc" }],
        },
      },
    });

    createdTenderId = tender.id;

    await replaceDocuments(tender.id, documents);

    const tenderWithDocuments = await getTenderById(tender.id);

    return ok(tenderWithDocuments.data, 201);
  } catch (error) {
    if (createdTenderId) {
      await prisma.tender.delete({
        where: { id: createdTenderId },
      });
    }

    console.error("CREATE TENDER:", error);

    return fail(
      error instanceof Error ? error.message : "Failed to create tender",
      500,
    );
  }
}

export async function updateTender(
  tenderId: string,
  formData: FormData,
): Promise<ServiceResponse> {
  try {
    const existing = await prisma.tender.findUnique({
      where: { id: tenderId },
    });

    if (!existing) {
      return fail("Tender not found", 404);
    }

    const parsedJson = parseJson(formData.get("tenderData"));
    const validation = updateTenderSchema.safeParse(parsedJson);

    if (!validation.success) {
      return fail("Validation failed", 400, validation.error.flatten());
    }

    const documents = parseDocumentUploads(formData);

    const updated = await prisma.tender.update({
      where: { id: tenderId },
      data: {
        ref: validation.data.ref ?? existing.ref,
        title: validation.data.title ?? existing.title,
        description: validation.data.description ?? existing.description,
        itemType:
          validation.data.itemType === undefined
            ? existing.itemType
            : normalizeOptionalText(validation.data.itemType),
        bidSubmission:
          validation.data.bidSubmission === undefined
            ? existing.bidSubmission
            : normalizeOptionalText(validation.data.bidSubmission),
        status: validation.data.status ?? existing.status,
        archived: validation.data.archived ?? existing.archived,
        isActive: validation.data.isActive ?? existing.isActive,
      },
    });

    await replaceDocuments(updated.id, documents);

    const tenderWithDocuments = await getTenderById(updated.id);

    return ok(tenderWithDocuments.data);
  } catch (error) {
    console.error("UPDATE TENDER:", error);

    return fail(
      error instanceof Error ? error.message : "Failed to update tender",
      500,
    );
  }
}

export async function deleteTender(
  tenderId: string,
): Promise<ServiceResponse> {
  try {
    const existing = await prisma.tender.findUnique({
      where: { id: tenderId },
      include: { documents: true },
    });

    if (!existing) {
      return fail("Tender not found", 404);
    }

    await prisma.tender.delete({
      where: { id: tenderId },
    });

    await Promise.all(
      existing.documents.map((document) =>
        deleteCloudinaryFile(document.publicId),
      ),
    );

    return ok({ id: tenderId });
  } catch (error) {
    console.error("DELETE TENDER:", error);

    return fail("Failed to delete tender", 500);
  }
}

export async function getAllTenders({
  page = 1,
  limit = 20,
  admin = false,
}: {
  page?: number;
  limit?: number;
  admin?: boolean;
} = {}) {
  const skip = (page - 1) * limit;
  const where = admin ? {} : { isActive: true };

  const [tenders, total] = await Promise.all([
    prisma.tender.findMany({
      where,
      orderBy: [{ archived: "asc" }, { createdAt: "desc" }],
      skip,
      take: limit,
      include: {
        documents: {
          orderBy: [{ kind: "asc" }, { sortOrder: "asc" }],
        },
      },
    }),
    prisma.tender.count({ where }),
  ]);

  return {
    success: true,
    status: 200,
    data: {
      tenders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  };
}

export async function getTenderById(id: string): Promise<ServiceResponse> {
  const tender = await prisma.tender.findUnique({
    where: { id },
    include: {
      documents: {
        orderBy: [{ kind: "asc" }, { sortOrder: "asc" }],
      },
    },
  });

  if (!tender) {
    return fail("Tender not found", 404);
  }

  return ok(tender);
}
