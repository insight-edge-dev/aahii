import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

import {
  createEventSchema,
  updateEventSchema,
  validateImageFile,
  MAX_IMAGES,
  MAX_IMAGE_SIZE_MB,
} from "../validations/events.validations";

import { randomUUID } from "crypto";

/* ================= CONSTANTS ================= */

const EVENTS_FOLDER = "aahii/events";

type UploadResult = {
  secure_url: string;
  public_id: string;
};

type EventImageInsert = {
  id: string;
  eventId: string;
  fileUrl: string;
  publicId: string;
};

const isFileLike = (value: unknown): value is Blob =>
  value instanceof Blob && typeof (value as Blob).arrayBuffer === "function";

const isKnownUploadError = (error: unknown) =>
  error instanceof Error &&
  (
    error.message.includes("image type") ||
    error.message.includes("Image exceeds") ||
    error.message.includes("Image file is empty") ||
    error.message.includes("Max ") ||
    error.message.includes("No images provided")
  );

function uploadErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Image upload failed";
}

/* ================= SLUG ================= */

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function generateSlug(title: string) {
  const base = slugify(title);

  let slug = base;
  let count = 1;

  while (true) {
    const exists = await prisma.event.findFirst({
      where: { slug },
    });

    if (!exists) return slug;

    slug = `${base}-${count++}`;
  }
}

/* ================= UPLOAD ================= */

async function uploadImage(file: File, folder: string): Promise<UploadResult> {
  validateImageFile(file);

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
        },

        (error, result) => {
          if (error || !result) {
            return reject(
              error instanceof Error
                ? error
                : new Error("Cloudinary image upload failed"),
            );
          }

          resolve(result as UploadResult);
        },
      )
      .end(buffer);
  });
}

async function uploadGalleryImages(
  files: FormDataEntryValue[],
  eventId: string,
  uploadedPublicIds: string[],
) {
  const validImages: EventImageInsert[] = [];

  for (const file of files) {
    if (!isFileLike(file) || !file.size) continue;

    const upload = await uploadImage(
      file as File,
      `${EVENTS_FOLDER}/${eventId}/gallery`,
    );

    uploadedPublicIds.push(upload.public_id);

    validImages.push({
      id: randomUUID(),
      eventId,
      fileUrl: upload.secure_url,
      publicId: upload.public_id,
    });
  }

  return validImages;
}

/* ================= CREATE EVENT ================= */

export async function createEvent(formData: FormData) {
  const eventId = randomUUID();

  const uploadedPublicIds: string[] = [];

  try {
    const raw = formData.get("eventData");

    if (!raw || typeof raw !== "string") {
      return {
        success: false,
        status: 400,
        message: "Invalid event data",
      };
    }

    let json;

    try {
      json = JSON.parse(raw);
    } catch {
      return {
        success: false,
        status: 400,
        message: "Invalid JSON",
      };
    }

    const parsed = createEventSchema.safeParse(json);

    if (!parsed.success) {
      return {
        success: false,

        status: 400,

        errors: parsed.error.flatten(),
      };
    }

    const data = parsed.data;

    const slug = await generateSlug(data.title);

    const images = formData.getAll("images");

    if (images.length > MAX_IMAGES) {
      return {
        success: false,

        status: 400,

        message: `Max ${MAX_IMAGES} images allowed`,
      };
    }

    /* ================= COVER ================= */

    let coverImage: string | null = null;

    let coverPublicId: string | null = null;

    const cover = formData.get("coverImage") as File | null;

    if (cover && cover.size) {
      const upload = await uploadImage(
        cover,

        `${EVENTS_FOLDER}/${eventId}/cover`,
      );

      coverImage = upload.secure_url;

      coverPublicId = upload.public_id;

      uploadedPublicIds.push(upload.public_id);
    }

    /* ================= GALLERY ================= */

    const validImages = await uploadGalleryImages(
      images,
      eventId,
      uploadedPublicIds,
    );

    /* ================= COVER FALLBACK ================= */

    if (!coverImage && validImages.length) {
      coverImage = validImages[0].fileUrl;

      coverPublicId = validImages[0].publicId;
    }

    /* require at least one image */

    if (!coverImage) {
      return {
        success: false,

        status: 400,

        message: "At least one image required",
      };
    }

    /* ================= DB TRANSACTION ================= */

    await prisma.$transaction(async (tx) => {
      await tx.event.create({
        data: {
          id: eventId,

          title: data.title,

          slug,

          description: data.description ?? null,

          eventDate: new Date(data.eventDate),

          coverImage,

          coverPublicId,
        },
      });

      if (validImages.length) {
        await tx.eventImage.createMany({
          data: validImages,
        });
      }
    });

    return {
      success: true,

      status: 201,

      eventId,
    };
  } catch (error) {
    /* rollback cloudinary */

    await Promise.allSettled(
      uploadedPublicIds.map((id) => cloudinary.uploader.destroy(id)),
    );

    console.error("CREATE EVENT ERROR:", error);

    return {
      success: false,

      status: isKnownUploadError(error) ? 400 : 500,

      message: isKnownUploadError(error)
        ? uploadErrorMessage(error)
        : "Event creation failed",
    };
  }
}

/* ================= UPDATE EVENT ================= */

export async function updateEvent(eventId: string, formData: FormData) {
  let newCoverPublicId: string | null = null;

  try {
    const existing = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existing) {
      return {
        success: false,

        status: 404,

        message: "Event not found",
      };
    }

    const raw = formData.get("eventData");

    if (!raw || typeof raw !== "string") {
      return {
        success: false,

        status: 400,

        message: "Invalid payload",
      };
    }

    let json;

    try {
      json = JSON.parse(raw);
    } catch {
      return {
        success: false,

        status: 400,

        message: "Invalid JSON",
      };
    }

    const parsed = updateEventSchema.safeParse(json);

    if (!parsed.success) {
      return {
        success: false,

        status: 400,

        errors: parsed.error.flatten(),
      };
    }

    const data = parsed.data;

    /* ================= SLUG ================= */

    let slug = existing.slug;

    if (data.title && data.title !== existing.title) {
      slug = await generateSlug(data.title);
    }

    /* ================= COVER ================= */

    let coverImage = existing.coverImage;

    let coverPublicId = existing.coverPublicId;

    const cover = formData.get("coverImage") as File | null;

    if (cover && cover.size) {
      const upload = await uploadImage(
        cover,

        `${EVENTS_FOLDER}/${eventId}/cover`,
      );

      coverImage = upload.secure_url;

      coverPublicId = upload.public_id;

      newCoverPublicId = upload.public_id;
    }

    /* ================= UPDATE ================= */

    const updated = await prisma.event.update({
      where: { id: eventId },

      data: {
        title: data.title ?? existing.title,

        slug,

        description: data.description ?? existing.description,

        eventDate: data.eventDate
          ? new Date(data.eventDate)
          : existing.eventDate,

        coverImage,

        coverPublicId,
      },
    });

    /* ================= CLEAN OLD COVER ================= */

    if (
      newCoverPublicId &&
      existing.coverPublicId &&
      existing.coverPublicId !== newCoverPublicId
    ) {
      await cloudinary.uploader.destroy(existing.coverPublicId);
    }

    return {
      success: true,

      status: 200,

      data: updated,
    };
  } catch (error) {
    /* rollback new cover */

    if (newCoverPublicId) {
      await cloudinary.uploader.destroy(newCoverPublicId);
    }

    console.error("UPDATE EVENT ERROR:", error);

    return {
      success: false,

      status: isKnownUploadError(error) ? 400 : 500,

      message: isKnownUploadError(error)
        ? uploadErrorMessage(error)
        : "Update failed",
    };
  }
}

/* ================= ADD IMAGES ================= */

export async function addEventImages(eventId: string, formData: FormData) {
  const uploaded: string[] = [];

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return {
        success: false,
        status: 404,
      };
    }

    const files = formData.getAll("images");

    if (!files.length) {
      return {
        success: false,
        status: 400,
        message: "No images provided",
      };
    }

    const validFiles = files.filter((file) => isFileLike(file) && file.size);

    if (!validFiles.length) {
      return {
        success: false,
        status: 400,
        message: "No valid image files provided",
      };
    }

    const existingCount = await prisma.eventImage.count({
      where: { eventId },
    });

    if (existingCount + validFiles.length > MAX_IMAGES) {
      return {
        success: false,
        status: 400,
        message: `Max ${MAX_IMAGES} event images allowed`,
      };
    }

    const valid = await uploadGalleryImages(validFiles, eventId, uploaded);

    await prisma.eventImage.createMany({
      data: valid,
    });

    return {
      success: true,
      status: 200,
    };
  } catch (error) {
    await Promise.allSettled(
      uploaded.map((id) => cloudinary.uploader.destroy(id)),
    );

    console.error("ADD EVENT IMAGES ERROR:", error);

    return {
      success: false,
      status: isKnownUploadError(error) ? 400 : 500,
      message: isKnownUploadError(error)
        ? uploadErrorMessage(error)
        : `Failed to upload event images. Each image must be JPG, PNG, or WEBP and under ${MAX_IMAGE_SIZE_MB}MB.`,
    };
  }
}

/* ================= DELETE IMAGES ================= */

export async function deleteEventImages(imageIds: string[]) {
  try {
    const images = await prisma.eventImage.findMany({
      where: {
        id: {
          in: imageIds,
        },
      },
    });

    await prisma.eventImage.deleteMany({
      where: {
        id: {
          in: imageIds,
        },
      },
    });

    await Promise.allSettled(
      images.map((img) =>
        cloudinary.uploader.destroy(img.publicId, { invalidate: true }),
      ),
    );

    return {
      success: true,
      status: 200,
    };
  } catch {
    return {
      success: false,
      status: 500,
    };
  }
}

/* ================= DELETE EVENT ================= */

export async function deleteEvent(eventId: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },

      include: { images: true },
    });

    if (!event) {
      return {
        success: false,
        status: 404,
      };
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    /* delete entire folder */

    await cloudinary.api.delete_resources_by_prefix(
  `${EVENTS_FOLDER}/${eventId}`,
  { invalidate:true }
);

    return {
      success: true,
      status: 200,
    };
  } catch {
    return {
      success: false,
      status: 500,
    };
  }
}

/* ================= ADMIN LIST ================= */

export async function getAdminEvents() {
  return prisma.event.findMany({
    include: { images: true },

    orderBy: {
      createdAt: "desc",
    },
  });
}

/* ================= PUBLIC LIST ================= */

export async function getPublicEvents() {
  return prisma.event.findMany({
    where: { isActive: true },

    include: { images: true },

    orderBy: {
      eventDate: "desc",
    },
  });
}

/* ================= GET BY ID ================= */

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },

    include: { images: true },
  });
}

/* ================= GET BY SLUG ================= */

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },

    include: { images: true },
  });
}

/* ================= FILTER DATE ================= */

export async function getEventsByDate(date: string) {
  const start = new Date(date);

  const end = new Date(date);

  end.setHours(23, 59, 59, 999);

  return prisma.event.findMany({
    where: {
      eventDate: {
        gte: start,
        lte: end,
      },

      isActive: true,
    },

    include: { images: true },
  });
}
