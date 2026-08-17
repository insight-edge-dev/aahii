import { InfrastructureCategory, Prisma } from "@prisma/client";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import {
  createInfrastructureImageSchema,
  updateInfrastructureImageSchema,
  validateInfrastructureImageFile,
} from "../validations/infrastructure.validation";

const INFRASTRUCTURE_FOLDER = "aahii/infrastructure";

type ServiceResult<T = unknown> = {
  success: boolean;
  status: number;
  data?: T;
  message?: string;
  errors?: unknown;
};

type UploadResult = {
  secure_url: string;
  public_id: string;
};

const isFileLike = (value: unknown): value is File =>
  value instanceof Blob &&
  typeof value.arrayBuffer === "function" &&
  value.size > 0;

function normalizeOptionalText(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function fail(message: string, status = 400, errors?: unknown): ServiceResult {
  return { success: false, status, message, errors };
}

function isInputError(error: unknown) {
  return (
    error instanceof Error &&
    (error.message.includes("Invalid infrastructure") ||
      error.message.includes("image type") ||
      error.message.includes("Image exceeds") ||
      error.message.includes("empty"))
  );
}

function parseMetadata(formData: FormData) {
  const raw = formData.get("infrastructureData");

  if (!raw || typeof raw !== "string") {
    throw new Error("Invalid infrastructure data");
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new Error("Invalid infrastructure JSON");
  }
}

async function uploadImage(file: File, category: InfrastructureCategory) {
  validateInfrastructureImageFile(file);
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<UploadResult>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `${INFRASTRUCTURE_FOLDER}/${category.toLowerCase()}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            reject(new Error("Infrastructure image upload failed"));
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        },
      )
      .end(buffer);
  });
}

async function deleteCloudinaryImage(publicId: string) {
  await cloudinary.uploader.destroy(publicId, {
    invalidate: true,
    resource_type: "image",
  });
}

export async function getPublicInfrastructureImages() {
  const images = await prisma.infrastructureImage.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      category: true,
      imageUrl: true,
      caption: true,
      altText: true,
      sortOrder: true,
      isFeatured: true,
    },
  });

  return {
    ON_SITE_DEVELOPMENT: images.filter(
      (image) => image.category === InfrastructureCategory.ON_SITE_DEVELOPMENT,
    ),
    CONCEPT_PLAN: images.filter(
      (image) => image.category === InfrastructureCategory.CONCEPT_PLAN,
    ),
  };
}

export async function getAdminInfrastructureImages() {
  return prisma.infrastructureImage.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function getInfrastructureImageById(imageId: string) {
  return prisma.infrastructureImage.findUnique({ where: { id: imageId } });
}

export async function createInfrastructureImage(
  formData: FormData,
): Promise<ServiceResult> {
  let uploadedPublicId: string | null = null;

  try {
    const parsed = createInfrastructureImageSchema.safeParse(
      parseMetadata(formData),
    );

    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten());
    }

    const file = formData.get("image");
    if (!isFileLike(file)) {
      return fail("An image is required");
    }

    const upload = await uploadImage(file, parsed.data.category);
    uploadedPublicId = upload.public_id;

    const image = await prisma.$transaction(
      async (tx) => {
        const categoryCount = await tx.infrastructureImage.count({
          where: { category: parsed.data.category },
        });
        const shouldFeature = parsed.data.isFeatured || categoryCount === 0;

        if (shouldFeature) {
          await tx.infrastructureImage.updateMany({
            where: { category: parsed.data.category, isFeatured: true },
            data: { isFeatured: false },
          });
        }

        return tx.infrastructureImage.create({
          data: {
            category: parsed.data.category,
            imageUrl: upload.secure_url,
            publicId: upload.public_id,
            caption: normalizeOptionalText(parsed.data.caption),
            altText: normalizeOptionalText(parsed.data.altText),
            sortOrder: parsed.data.sortOrder,
            isFeatured: shouldFeature,
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    return { success: true, status: 201, data: image };
  } catch (error) {
    if (uploadedPublicId) {
      await Promise.allSettled([deleteCloudinaryImage(uploadedPublicId)]);
    }

    console.error("CREATE INFRASTRUCTURE IMAGE:", error);
    return fail(
      isInputError(error) && error instanceof Error
        ? error.message
        : "Failed to create infrastructure image",
      isInputError(error) ? 400 : 500,
    );
  }
}

export async function updateInfrastructureImage(
  imageId: string,
  formData: FormData,
): Promise<ServiceResult> {
  let uploaded: UploadResult | null = null;

  try {
    const existing = await prisma.infrastructureImage.findUnique({
      where: { id: imageId },
    });

    if (!existing) {
      return fail("Infrastructure image not found", 404);
    }

    const parsed = updateInfrastructureImageSchema.safeParse(
      parseMetadata(formData),
    );

    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten());
    }

    const nextCategory = parsed.data.category ?? existing.category;
    const replacement = formData.get("image");

    if (isFileLike(replacement)) {
      uploaded = await uploadImage(replacement, nextCategory);
    }

    const nextFeatured = parsed.data.isFeatured ?? existing.isFeatured;
    const updated = await prisma.$transaction(
      async (tx) => {
        if (nextFeatured) {
          await tx.infrastructureImage.updateMany({
            where: {
              category: nextCategory,
              isFeatured: true,
              id: { not: imageId },
            },
            data: { isFeatured: false },
          });
        }

        return tx.infrastructureImage.update({
          where: { id: imageId },
          data: {
            category: nextCategory,
            caption:
              parsed.data.caption === undefined
                ? existing.caption
                : normalizeOptionalText(parsed.data.caption),
            altText:
              parsed.data.altText === undefined
                ? existing.altText
                : normalizeOptionalText(parsed.data.altText),
            sortOrder: parsed.data.sortOrder ?? existing.sortOrder,
            isFeatured: nextFeatured,
            imageUrl: uploaded?.secure_url ?? existing.imageUrl,
            publicId: uploaded?.public_id ?? existing.publicId,
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    if (uploaded && existing.publicId) {
      await Promise.allSettled([deleteCloudinaryImage(existing.publicId)]);
    }

    return { success: true, status: 200, data: updated };
  } catch (error) {
    if (uploaded) {
      await Promise.allSettled([deleteCloudinaryImage(uploaded.public_id)]);
    }

    console.error("UPDATE INFRASTRUCTURE IMAGE:", error);
    return fail(
      isInputError(error) && error instanceof Error
        ? error.message
        : "Failed to update infrastructure image",
      isInputError(error) ? 400 : 500,
    );
  }
}

export async function deleteInfrastructureImage(
  imageId: string,
): Promise<ServiceResult> {
  try {
    const existing = await prisma.infrastructureImage.findUnique({
      where: { id: imageId },
    });

    if (!existing) {
      return fail("Infrastructure image not found", 404);
    }

    await prisma.infrastructureImage.delete({ where: { id: imageId } });

    if (existing.publicId) {
      const cleanup = await Promise.allSettled([
        deleteCloudinaryImage(existing.publicId),
      ]);

      if (cleanup[0].status === "rejected") {
        console.error("DELETE INFRASTRUCTURE CLOUDINARY IMAGE:", cleanup[0].reason);
      }
    }

    return { success: true, status: 200, data: { id: imageId } };
  } catch (error) {
    console.error("DELETE INFRASTRUCTURE IMAGE:", error);
    return fail("Failed to delete infrastructure image", 500);
  }
}
