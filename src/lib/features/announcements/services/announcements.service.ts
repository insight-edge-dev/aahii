import { prisma } from "@/lib/prisma";
import type { AnnouncementPayload } from "../announcement.types";

type ServiceResponse<T = unknown> = {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
};

function ok<T>(data: T, status = 200): ServiceResponse<T> {
  return { success: true, status, data };
}

function fail<T = never>(message: string, status = 400): ServiceResponse<T> {
  return { success: false, status, message };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function generateSlug(title: string, currentId?: string) {
  const base = slugify(title);
  let slug = base;
  let count = 1;

  while (true) {
    const exists = await prisma.announcement.findFirst({
      where: {
        slug,
        ...(currentId ? { id: { not: currentId } } : {}),
      },
      select: { id: true },
    });

    if (!exists) return slug;

    slug = `${base}-${count++}`;
  }
}

type NormalizedAnnouncementPayload = {
  title: string;
  category: string;
  slug: string;
  link: string | null;
  priority: boolean;
  isActive: boolean;
  publishedAt: Date;
};

function normalizePayload(
  payload: AnnouncementPayload,
): ServiceResponse<NormalizedAnnouncementPayload> {
  const title = payload.title?.trim();
  const category = payload.category?.trim();
  const customSlug = payload.slug?.trim();
  const link = payload.link?.trim();
  const publishedAt = payload.publishedAt ? new Date(payload.publishedAt) : null;

  if (!title || title.length < 5) {
    return fail("Title must be at least 5 characters");
  }

  if (!category) {
    return fail("Category is required");
  }

  if (!publishedAt || Number.isNaN(publishedAt.getTime())) {
    return fail("Published date is required");
  }

  return ok({
    title,
    category,
    slug: customSlug ? slugify(customSlug) : "",
    link: link || null,
    priority: payload.priority ?? false,
    isActive: payload.isActive ?? true,
    publishedAt,
  });
}

export async function createAnnouncement(payload: AnnouncementPayload) {
  try {
    const normalized = normalizePayload(payload);

    if (!normalized.success || !normalized.data) {
      return normalized;
    }

    const data = normalized.data;
    const slug = data.slug || await generateSlug(data.title);

    const existing = await prisma.announcement.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existing) {
      return fail("Slug already exists");
    }

    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        slug,
        category: data.category,
        link: data.link,
        priority: data.priority,
        isActive: data.isActive,
        publishedAt: data.publishedAt,
      },
    });

    return ok(announcement, 201);
  } catch (error) {
    console.error("CREATE ANNOUNCEMENT:", error);
    return fail("Failed to create announcement", 500);
  }
}

export async function updateAnnouncement(
  announcementId: string,
  payload: AnnouncementPayload,
) {
  try {
    const existing = await prisma.announcement.findUnique({
      where: { id: announcementId },
    });

    if (!existing) {
      return fail("Announcement not found", 404);
    }

    const normalized = normalizePayload(payload);

    if (!normalized.success || !normalized.data) {
      return normalized;
    }

    const data = normalized.data;
    const slug = data.slug || await generateSlug(data.title, announcementId);

    const duplicate = await prisma.announcement.findFirst({
      where: {
        slug,
        id: { not: announcementId },
      },
      select: { id: true },
    });

    if (duplicate) {
      return fail("Slug already exists");
    }

    const announcement = await prisma.announcement.update({
      where: { id: announcementId },
      data: {
        title: data.title,
        slug,
        category: data.category,
        link: data.link,
        priority: data.priority,
        isActive: data.isActive,
        publishedAt: data.publishedAt,
      },
    });

    return ok(announcement);
  } catch (error) {
    console.error("UPDATE ANNOUNCEMENT:", error);
    return fail("Failed to update announcement", 500);
  }
}

export async function deleteAnnouncement(announcementId: string) {
  try {
    const existing = await prisma.announcement.findUnique({
      where: { id: announcementId },
      select: { id: true },
    });

    if (!existing) {
      return fail("Announcement not found", 404);
    }

    await prisma.announcement.delete({
      where: { id: announcementId },
    });

    return ok({ id: announcementId });
  } catch (error) {
    console.error("DELETE ANNOUNCEMENT:", error);
    return fail("Failed to delete announcement", 500);
  }
}

export async function getAdminAnnouncements() {
  const announcements = await prisma.announcement.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });

  return ok(announcements);
}

export async function getAnnouncementById(announcementId: string) {
  const announcement = await prisma.announcement.findUnique({
    where: { id: announcementId },
  });

  if (!announcement) {
    return fail("Announcement not found", 404);
  }

  return ok(announcement);
}

export async function getLatestAnnouncements(limit = 20) {
  const announcements = await prisma.announcement.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      link: true,
      priority: true,
      publishedAt: true,
    },
    take: limit,
  });

  return announcements;
}
