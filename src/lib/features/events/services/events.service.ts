import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

import {
  createEventSchema,
  updateEventSchema,
  validateImageFile,
  MAX_IMAGES,
} from "../validations/events.validations";

import { randomUUID } from "crypto";
import { image } from "framer-motion/m";

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
            return reject(error);
          }

          resolve(result as UploadResult);
        },
      )
      .end(buffer);
  });
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

    const images = formData.getAll("images");

    if (images.length > MAX_IMAGES) {
      return {
        success: false,

        status: 400,

        message: `Max ${MAX_IMAGES} images allowed`,
      };
    }

    const galleryUploads = await Promise.all(
      images.map(async (file) => {
        const f = file as File;

        if (!f || !f.size) return null;

        const upload = await uploadImage(
          f,

          `${EVENTS_FOLDER}/${eventId}/gallery`,
        );

        uploadedPublicIds.push(upload.public_id);

        return {
          id: randomUUID(),

          eventId,

          fileUrl: upload.secure_url,

          publicId: upload.public_id,
        };
      }),
    );

    const validImages = galleryUploads.filter(Boolean) as EventImageInsert[];

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

      status: 500,

      message: "Event creation failed",
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

      status: 500,

      message: "Update failed",
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

    const uploads = await Promise.all(
      files.map(async (file) => {
        if (!isFileLike(file)) return null;

        const upload = await uploadImage(
          file as File,
          `${EVENTS_FOLDER}/${eventId}/gallery`,
        );

        uploaded.push(upload.public_id);

        return {
          id: randomUUID(),
          eventId,
          fileUrl: upload.secure_url,
          publicId: upload.public_id,
        } as EventImageInsert;
      }),
    );

    const valid = uploads.filter(Boolean) as EventImageInsert[];

    await prisma.eventImage.createMany({
      data: valid,
    });

    return {
      success: true,
      status: 200,
    };
  } catch {
    await Promise.allSettled(
      uploaded.map((id) => cloudinary.uploader.destroy(id)),
    );

    return {
      success: false,
      status: 500,
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
