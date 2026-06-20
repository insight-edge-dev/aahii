import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

import {
  createNewsSchema,
  updateNewsSchema,
  type CreateNewsInput,
  type UpdateNewsInput,
} from "../validations/news.validation";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];
const NEWS_FOLDER = "aahii/news";

export type NewsStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type NewsKind = "PRESS" | "INTERNAL";

export type NewsRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  source: string;
  category: string | null;
  link: string | null;
  coverImage: string | null;
  publicId: string | null;
  featuredImageUrl: string | null;
  featuredImagePublicId: string | null;
  publishedAt: Date;
  featured: boolean;
  status: NewsStatus;
  type: NewsKind;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  facebookCaption: string | null;
  linkedinCaption: string | null;
  twitterCaption: string | null;
  socialCaption: string | null;
  socialHashtags: string | null;
  createdAt: Date;
  updatedAt: Date;
};

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

type NewsListParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  source?: string;
  status?: NewsStatus | "ALL";
  featured?: boolean;
  publicOnly?: boolean;
};

type NewsDelegate = {
  findMany(args?: unknown): Promise<NewsRecord[]>;
  findFirst(args?: unknown): Promise<NewsRecord | null>;
  findUnique(args: unknown): Promise<NewsRecord | null>;
  create(args: unknown): Promise<NewsRecord>;
  update(args: unknown): Promise<NewsRecord>;
  delete(args: unknown): Promise<NewsRecord>;
  count(args?: unknown): Promise<number>;
};

const newsDb = prisma.news as unknown as NewsDelegate;

const newsSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  content: true,
  source: true,
  category: true,
  link: true,
  coverImage: true,
  publicId: true,
  featuredImageUrl: true,
  featuredImagePublicId: true,
  publishedAt: true,
  featured: true,
  status: true,
  type: true,
  isActive: true,
  metaTitle: true,
  metaDescription: true,
  facebookCaption: true,
  linkedinCaption: true,
  twitterCaption: true,
  socialCaption: true,
  socialHashtags: true,
  createdAt: true,
  updatedAt: true,
};

function ok<T>(data: T, status = 200): ServiceResponse<T> {
  return { success: true, status, data };
}

function fail<T = never>(
  message: string,
  status = 400,
  errors?: unknown,
): ServiceResponse<T> {
  return { success: false, status, message, errors };
}

const isFileLike = (value: unknown): value is Blob =>
  value instanceof Blob && typeof value.arrayBuffer === "function";

function emptyToNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
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
  const base = slugify(title) || "news";
  let slug = base;
  let count = 1;

  while (true) {
    const exists = await newsDb.findFirst({
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

async function uploadImage(file: File, newsId: string): Promise<UploadResult> {
  if (!ALLOWED_MIME.includes(file.type)) {
    throw new Error("Featured image must be JPG, PNG, or WEBP");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Featured image must be under 2MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `${NEWS_FOLDER}/${newsId}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            reject(new Error("Image upload failed"));
            return;
          }

          resolve(result as UploadResult);
        },
      )
      .end(buffer);
  });
}

function mapCreateData(data: CreateNewsInput, slug: string, image?: UploadResult) {
  const isPublished = data.status === "PUBLISHED";

  return {
    slug,
    source: emptyToNull(data.source) ?? "AAHII",
    category: data.category,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    link: emptyToNull(data.link),
    coverImage: image?.secure_url ?? null,
    publicId: image?.public_id ?? null,
    featuredImageUrl: image?.secure_url ?? null,
    featuredImagePublicId: image?.public_id ?? null,
    publishedAt: new Date(data.publishedAt),
    featured: data.featured ?? false,
    status: data.status,
    type: data.type ?? "INTERNAL",
    isActive: data.isActive ?? isPublished,
    metaTitle: emptyToNull(data.metaTitle),
    metaDescription: emptyToNull(data.metaDescription),
    facebookCaption: emptyToNull(data.facebookCaption),
    linkedinCaption: emptyToNull(data.linkedinCaption),
    twitterCaption: emptyToNull(data.twitterCaption),
    socialCaption: emptyToNull(data.socialCaption),
    socialHashtags: emptyToNull(data.socialHashtags),
  };
}

function mapUpdateData(
  data: UpdateNewsInput,
  existing: NewsRecord,
  slug: string,
  image?: UploadResult,
) {
  const status = data.status ?? existing.status;
  const isPublished = status === "PUBLISHED";

  return {
    slug,
    source: emptyToNull(data.source) ?? existing.source,
    category: emptyToNull(data.category) ?? existing.category,
    title: data.title ?? existing.title,
    excerpt: data.excerpt ?? existing.excerpt,
    content: data.content ?? existing.content,
    link: data.link === undefined ? existing.link : emptyToNull(data.link),
    coverImage: image?.secure_url ?? existing.coverImage,
    publicId: image?.public_id ?? existing.publicId,
    featuredImageUrl: image?.secure_url ?? existing.featuredImageUrl,
    featuredImagePublicId: image?.public_id ?? existing.featuredImagePublicId,
    publishedAt: data.publishedAt ? new Date(data.publishedAt) : existing.publishedAt,
    featured: data.featured ?? existing.featured,
    status,
    type: data.type ?? existing.type,
    isActive: data.isActive ?? isPublished,
    metaTitle: data.metaTitle === undefined ? existing.metaTitle : emptyToNull(data.metaTitle),
    metaDescription:
      data.metaDescription === undefined
        ? existing.metaDescription
        : emptyToNull(data.metaDescription),
    facebookCaption:
      data.facebookCaption === undefined
        ? existing.facebookCaption
        : emptyToNull(data.facebookCaption),
    linkedinCaption:
      data.linkedinCaption === undefined
        ? existing.linkedinCaption
        : emptyToNull(data.linkedinCaption),
    twitterCaption:
      data.twitterCaption === undefined
        ? existing.twitterCaption
        : emptyToNull(data.twitterCaption),
    socialCaption:
      data.socialCaption === undefined
        ? existing.socialCaption
        : emptyToNull(data.socialCaption),
    socialHashtags:
      data.socialHashtags === undefined
        ? existing.socialHashtags
        : emptyToNull(data.socialHashtags),
  };
}

function parseNewsPayload(raw: FormDataEntryValue | null) {
  if (!raw || typeof raw !== "string") {
    return fail("Invalid request payload");
  }

  try {
    return ok(JSON.parse(raw) as unknown);
  } catch {
    return fail("Invalid JSON format");
  }
}

function buildWhere(params: NewsListParams) {
  const where: Record<string, unknown> = {};

  if (params.publicOnly) {
    where.status = "PUBLISHED";
    where.isActive = true;
    where.publishedAt = { lte: new Date() };
  } else if (params.status && params.status !== "ALL") {
    where.status = params.status;
  }

  if (params.category && params.category !== "ALL") {
    where.category = params.category;
  }

  if (params.source && params.source !== "ALL") {
    where.source = params.source;
  }

  if (typeof params.featured === "boolean") {
    where.featured = params.featured;
  }

  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: "insensitive" } },
      { excerpt: { contains: params.search, mode: "insensitive" } },
      { category: { contains: params.search, mode: "insensitive" } },
    ];
  }

  return where;
}

export async function createNews(formData: FormData): Promise<ServiceResponse> {
  const newsId = randomUUID();
  let uploadedPublicId: string | null = null;

  try {
    const parsed = parseNewsPayload(formData.get("newsData"));
    if (!parsed.success) return parsed;

    const validation = createNewsSchema.safeParse(parsed.data);
    if (!validation.success) {
      return fail("Validation failed", 400, validation.error.flatten());
    }

    const data = validation.data;
    const slug = data.slug ? await generateSlug(data.slug) : await generateSlug(data.title);
    const file = formData.get("featuredImage") ?? formData.get("coverImage");
    let upload: UploadResult | undefined;

    if (isFileLike(file) && file.size) {
      upload = await uploadImage(file as File, newsId);
      uploadedPublicId = upload.public_id;
    }

    const news = await newsDb.create({
      data: {
        id: newsId,
        ...mapCreateData(data, slug, upload),
      },
      select: newsSelect,
    });

    return ok(news, 201);
  } catch (error) {
    if (uploadedPublicId) {
      await cloudinary.uploader.destroy(uploadedPublicId);
    }

    console.error("CREATE NEWS:", error);
    return fail(error instanceof Error ? error.message : "Failed to create news", 500);
  }
}

export async function updateNews(newsId: string, formData: FormData): Promise<ServiceResponse> {
  let newPublicId: string | null = null;

  try {
    const existing = await newsDb.findUnique({ where: { id: newsId } });
    if (!existing) return fail("News not found", 404);

    const parsed = parseNewsPayload(formData.get("newsData"));
    if (!parsed.success) return parsed;

    const validation = updateNewsSchema.safeParse(parsed.data);
    if (!validation.success) {
      return fail("Validation failed", 400, validation.error.flatten());
    }

    const data = validation.data;
    const slugSource = data.slug || data.title;
    const slug = slugSource ? await generateSlug(slugSource, newsId) : existing.slug;
    const file = formData.get("featuredImage") ?? formData.get("coverImage");
    let upload: UploadResult | undefined;

    if (isFileLike(file) && file.size) {
      upload = await uploadImage(file as File, newsId);
      newPublicId = upload.public_id;
    }

    const updated = await newsDb.update({
      where: { id: newsId },
      data: mapUpdateData(data, existing, slug, upload),
      select: newsSelect,
    });

    const previousPublicId = existing.featuredImagePublicId ?? existing.publicId;
    if (newPublicId && previousPublicId) {
      await cloudinary.uploader.destroy(previousPublicId);
    }

    return ok(updated);
  } catch (error) {
    if (newPublicId) {
      await cloudinary.uploader.destroy(newPublicId);
    }

    console.error("UPDATE NEWS:", error);
    return fail(error instanceof Error ? error.message : "Failed to update news", 500);
  }
}

export async function deleteNews(newsId: string): Promise<ServiceResponse> {
  try {
    const existing = await newsDb.findUnique({ where: { id: newsId } });
    if (!existing) return fail("News not found", 404);

    await newsDb.delete({ where: { id: newsId } });

    const publicId = existing.featuredImagePublicId ?? existing.publicId;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    return ok({ id: newsId });
  } catch (error) {
    console.error("DELETE NEWS:", error);
    return fail("Failed to delete news", 500);
  }
}

export async function getAllNews(page = 1, limit = 10) {
  return getAdminNews({ page, limit });
}

export async function getAdminNews(params: NewsListParams = {}) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 10, 1), 50);
  const skip = (page - 1) * limit;
  const where = buildWhere(params);

  const [news, total, categories] = await Promise.all([
    newsDb.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
      select: newsSelect,
    }),
    newsDb.count({ where }),
    newsDb.findMany({
      distinct: ["category"],
      where: { category: { not: null } },
      select: { category: true },
      orderBy: { category: "asc" },
    }),
  ]);

  return ok({
    news,
    categories: categories.map((item) => item.category).filter(Boolean),
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(Math.ceil(total / limit), 1),
    },
  });
}

export async function getPublicNews(params: NewsListParams = {}) {
  return getAdminNews({
    ...params,
    publicOnly: true,
    status: "PUBLISHED",
  });
}

export async function getFeaturedNews() {
  return newsDb.findFirst({
    where: buildWhere({ publicOnly: true, featured: true }),
    orderBy: { publishedAt: "desc" },
    select: newsSelect,
  });
}

export async function getLatestNews(limit = 10) {
  return newsDb.findMany({
    where: buildWhere({ publicOnly: true }),
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: newsSelect,
  });
}

export async function getNewsById(id: string): Promise<ServiceResponse<NewsRecord>> {
  const news = await newsDb.findUnique({
    where: { id },
    select: newsSelect,
  });

  if (!news) return fail("News not found", 404);
  return ok(news);
}

export async function getNewsBySlug(slug: string): Promise<ServiceResponse<NewsRecord>> {
  const news = await newsDb.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      isActive: true,
      publishedAt: { lte: new Date() },
    },
    select: newsSelect,
  });

  if (!news) return fail("News not found", 404);
  return ok(news);
}

export async function getRelatedNews({
  slug,
  category,
  limit = 3,
}: {
  slug: string;
  category?: string | null;
  limit?: number;
}) {
  return newsDb.findMany({
    where: {
      ...buildWhere({ publicOnly: true }),
      slug: { not: slug },
      ...(category ? { category } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: newsSelect,
  });
}
