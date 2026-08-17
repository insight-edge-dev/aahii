import { z } from "zod";

export const MAX_INFRASTRUCTURE_IMAGE_SIZE = 10 * 1024 * 1024;
export const MAX_INFRASTRUCTURE_IMAGE_SIZE_MB = 10;
export const INFRASTRUCTURE_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const infrastructureCategorySchema = z.enum([
  "ON_SITE_DEVELOPMENT",
  "CONCEPT_PLAN",
]);

const metadataSchema = z.object({
  category: infrastructureCategorySchema,
  caption: z.string().trim().max(500, "Caption is too long").optional(),
  altText: z.string().trim().max(300, "Alt text is too long").optional(),
  sortOrder: z.number().int().min(0, "Sort order cannot be negative"),
  isFeatured: z.boolean(),
});

export const createInfrastructureImageSchema = metadataSchema;
export const updateInfrastructureImageSchema = metadataSchema.partial();

export function validateInfrastructureImageFile(file: File) {
  if (!file.size) {
    throw new Error("Image file is empty");
  }

  if (!INFRASTRUCTURE_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Invalid image type. Allowed: JPG, PNG, WEBP");
  }

  if (file.size > MAX_INFRASTRUCTURE_IMAGE_SIZE) {
    throw new Error(
      `Image exceeds ${MAX_INFRASTRUCTURE_IMAGE_SIZE_MB}MB limit`,
    );
  }
}
