import { z } from "zod";

/* ================= COMMON ================= */

const websiteSchema = z.preprocess((val) => {
  if (!val) return undefined;

  if (typeof val === "string" && !/^https?:\/\//i.test(val)) {
    return `https://${val}`;
  }

  return val;
},
z.string().url({
  message: "Enter a valid website URL",
}).optional());

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => (val === "" ? undefined : val), schema);

/* ================= ENUMS ================= */

export const categoryEnum = z.enum([
  "trader",
  "manufacturer",
  "authorised_dealer",
  "service_provider",
]);

export const establishmentTypeEnum = z.enum([
  "proprietorship",
  "partnership",
  "private_ltd",
  "public_ltd",
  "trust",
  "llp",
  "society",
  "other",
]);

export const gstRegistrationTypeEnum = z.enum([
  "registered",
  "composite",
  "unregistered",
  "exempt",
]);

/* ================= DOCUMENT FLAGS ================= */

const documentFlagsSchema = z.object({
  hasAuthorizationCertificate: z.boolean(),
  hasTradeLicense: z.boolean(),
  hasItrYear1: z.boolean(),
  hasItrYear2: z.boolean(),
  hasPfRegistration: z.boolean(),
  hasEsicRegistration: z.boolean(),
  hasClraRegistration: z.boolean(),
});

export const msmeTypeEnum = z.enum(["micro", "small", "medium"]);
export const msmeClassEnum = z.enum(["trading", "service", "manufacturing"]);

/* ================= ADDRESS ================= */

const registeredAddressSchema = z.object({
  address: z.string().min(3, {
    message: "Address must be at least 3 characters",
  }).trim(),

  pin: z.string().regex(/^[1-9][0-9]{5}$/, {
    message: "PIN code must be a valid 6-digit number",
  }),

  contactNumber: z.string().regex(/^[6-9]\d{9}$/, {
    message: "Enter a valid 10-digit mobile number",
  }),
});

const communicationAddressSchema = z.discriminatedUnion(
  "sameAsRegistered",
  [
    z.object({
      sameAsRegistered: z.literal(true),
    }),
    z.object({
      sameAsRegistered: z.literal(false),
      address: z.string().min(3, {
        message: "Communication address is required",
      }),
      pin: z.string().regex(/^[1-9][0-9]{5}$/, {
        message: "PIN code must be a valid 6-digit number",
      }),
      contactNumber: z.string().regex(/^[6-9]\d{9}$/, {
        message: "Enter a valid 10-digit mobile number",
      }),
    }),
  ]
);

/* ================= GST ================= */

const gstSchema = z.discriminatedUnion("gstApplicable", [
  z.object({
    gstApplicable: z.literal(true),

    gstRegistrationType: gstRegistrationTypeEnum,

    gstNumber: z.string().regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/,
      { message: "Enter a valid GST number" }
    ),
  }),

  z.object({
    gstApplicable: z.literal(false),
  }),
]);

/* ================= MSME ================= */

const msmeSchema = z.discriminatedUnion("msmeApplicable", [
  z.object({
    msmeApplicable: z.literal(true),

    msmeNumber: z.string().min(5, {
      message: "MSME number is required",
    }),

    msmeType: msmeTypeEnum,
    msmeClass: msmeClassEnum,
  }),

  z.object({
    msmeApplicable: z.literal(false),
  }),
]);

/* ================= TAX DETAILS ================= */

const baseTaxSchema = z.object({
  panNumber: z.string().regex(
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    { message: "Enter a valid PAN number (ABCDE1234F)" }
  ),

  cinNumber: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .refine(
      (v) => v === undefined || /^[A-Z0-9]{21}$/.test(v),
      { message: "Enter a valid CIN number" }
    )
    .optional(),
});

const taxDetailsSchema =
  baseTaxSchema.and(gstSchema).and(msmeSchema);

/* ================= BUSINESS ================= */

const businessDetailsSchema = z.object({
  establishmentType: establishmentTypeEnum,

  keyProducts: z.array(z.string().min(2)).min(1, {
    message: "Select at least one key product",
  }),

  specificProducts: z.array(z.string().min(2)).min(1, {
    message: "Select at least one specific product",
  }),

  hasRelationWithAGIHF: z.boolean(),

  relationDetails: emptyToUndefined(
    z.string().min(3, {
      message: "Please provide relation details",
    })
  ).optional(),
}).superRefine((data, ctx) => {
  if (data.hasRelationWithAGIHF && !data.relationDetails) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Relation details required",
      path: ["relationDetails"],
    });
  }
});

/* ================= APPLICANT ================= */

const applicantSchema = z.object({
  applicantName: z.string().min(2, {
    message: "Applicant name must be at least 2 characters",
  }),

  authorisedPerson: z.string().min(2, {
    message: "Authorised person name must be at least 2 characters",
  }),
});

/* ================= MAIN ================= */

export const vendorSchema = z.object({
  category: z.array(categoryEnum).min(1, {
    message: "Select at least one vendor category",
  }),

  entityName: z.string().min(2, {
    message: "Entity name must be at least 2 characters",
  }),

  email: z.string().email({
    message: "Enter a valid email address",
  }),

  website: websiteSchema,

  registeredAddress: registeredAddressSchema,
  communicationAddress: communicationAddressSchema,

  taxDetails: taxDetailsSchema,
  businessDetails: businessDetailsSchema,
  applicant: applicantSchema,
  documentFlags: documentFlagsSchema,

})
.superRefine((data, ctx) => {
  const corporateTypes = ["private_ltd", "public_ltd", "llp"];

  if (
    corporateTypes.includes(data.businessDetails.establishmentType) &&
    !data.taxDetails.cinNumber
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "CIN is required for corporate entities",
      path: ["taxDetails", "cinNumber"],
    });
  }
});

export type VendorInput = z.infer<typeof vendorSchema>;