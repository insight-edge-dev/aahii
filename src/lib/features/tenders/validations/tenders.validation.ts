import { z } from "zod";

export const tenderStatusSchema = z.enum([
  "ACTIVE",
  "CLOSED",
  "CANCELLED",
]);

export const tenderDocumentKindSchema = z.enum([
  "TENDER_DOCUMENT",
  "CORRIGENDUM",
]);

const baseTenderSchema = z.object({
  ref: z.string().trim().min(3, "Tender reference required").max(180),
  title: z.string().trim().min(5, "Title too short").max(300),
  description: z.string().trim().min(10, "Description too short").max(3000),
  itemType: z.string().trim().max(160).optional().or(z.literal("")),
  publicationDate: z.string().trim().max(240).optional().or(z.literal("")),
  preBidMeeting: z.string().trim().max(240).optional().or(z.literal("")),
  bidEndDateTime: z.string().trim().max(240).optional().or(z.literal("")),
  bidOpeningDateTime: z.string().trim().max(240).optional().or(z.literal("")),
  status: tenderStatusSchema,
  archived: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const createTenderSchema = baseTenderSchema;

export const updateTenderSchema = baseTenderSchema.partial();

export const tenderDocumentInputSchema = z.object({
  title: z.string().trim().min(2, "Document title required").max(180),
  kind: tenderDocumentKindSchema,
  sortOrder: z.number().int().min(0).optional(),
});

export type CreateTenderInput = z.infer<typeof createTenderSchema>;
export type UpdateTenderInput = z.infer<typeof updateTenderSchema>;
export type TenderDocumentInput = z.infer<typeof tenderDocumentInputSchema>;
