import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

import type { VacancyItem, VacancyPayload, VacancyStatus } from "../vacancy.types";

type ServiceResponse<T = unknown> = {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
};

type VacancyRecord = Omit<VacancyItem, "postedAt" | "applicationDeadline" | "createdAt" | "updatedAt"> & {
  postedAt: Date;
  applicationDeadline: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type VacancyDelegate = {
  findMany(args?: unknown): Promise<VacancyRecord[]>;
  findUnique(args: unknown): Promise<VacancyRecord | null>;
  findFirst(args: unknown): Promise<{ id: string } | null>;
  create(args: unknown): Promise<VacancyRecord>;
  update(args: unknown): Promise<VacancyRecord>;
  delete(args: unknown): Promise<VacancyRecord>;
};

const vacancyDb = (prisma as unknown as { vacancy: VacancyDelegate }).vacancy;

const VACANCIES_FOLDER = "aahii/vacancies";
const MAX_PDF_SIZE = 5 * 1024 * 1024;

const statuses: VacancyStatus[] = ["DRAFT", "OPEN", "CLOSED"];

type UploadResult = {
  secure_url: string;
  public_id: string;
};

function ok<T>(data: T, status = 200): ServiceResponse<T> {
  return { success: true, status, data };
}

function fail<T = never>(message: string, status = 400): ServiceResponse<T> {
  return { success: false, status, message };
}

const isFileLike = (value: unknown): value is Blob =>
  value instanceof Blob && typeof (value as Blob).arrayBuffer === "function";

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
    const exists = await vacancyDb.findFirst({
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

function serializeVacancy(vacancy: VacancyRecord): VacancyItem {
  return {
    ...vacancy,
    postedAt: vacancy.postedAt.toISOString(),
    applicationDeadline: vacancy.applicationDeadline?.toISOString() ?? null,
    createdAt: vacancy.createdAt.toISOString(),
    updatedAt: vacancy.updatedAt.toISOString(),
  };
}

function parseDate(value: string | null | undefined, field: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${field} is invalid`);
  }

  return date;
}

function parseVacancyPayload(raw: unknown): ServiceResponse<VacancyPayload> {
  if (!raw || typeof raw !== "string") {
    return fail("Invalid vacancy payload");
  }

  try {
    const payload = JSON.parse(raw) as VacancyPayload;
    return ok(payload);
  } catch {
    return fail("Invalid vacancy JSON");
  }
}

function normalizePayload(payload: VacancyPayload) {
  const title = payload.title?.trim();
  const location = payload.location?.trim();
  const employmentType = payload.employmentType?.trim();
  const department = payload.department?.trim();
  const description = payload.description?.trim();
  const applyEmail = payload.applyEmail?.trim();
  const status = payload.status;
  const customSlug = payload.slug?.trim();

  if (!title || title.length < 5) {
    throw new Error("Title must be at least 5 characters");
  }

  if (!location) throw new Error("Location is required");
  if (!employmentType) throw new Error("Employment type is required");
  if (!department) throw new Error("Department is required");
  if (!description || description.length < 10) {
    throw new Error("Description must be at least 10 characters");
  }
  if (!applyEmail || !applyEmail.includes("@")) {
    throw new Error("A valid apply email is required");
  }
  if (!statuses.includes(status)) {
    throw new Error("Vacancy status is invalid");
  }

  const postedAt = parseDate(payload.postedAt, "Posted date");

  if (!postedAt) {
    throw new Error("Posted date is required");
  }

  return {
    title,
    slug: customSlug ? slugify(customSlug) : "",
    location,
    employmentType,
    department,
    description,
    applyEmail,
    status,
    postedAt,
    applicationDeadline: parseDate(
      payload.applicationDeadline,
      "Application deadline",
    ),
  };
}

async function uploadAdvertisement(file: File): Promise<UploadResult> {
  if (file.type && file.type !== "application/pdf") {
    throw new Error("Advertisement must be a PDF");
  }

  if (file.size > MAX_PDF_SIZE) {
    throw new Error("PDF must be under 5MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: VACANCIES_FOLDER,
          resource_type: "raw",
        },
        (error, result) => {
          if (error || !result) {
            reject(new Error("PDF upload failed"));
            return;
          }

          resolve(result as UploadResult);
        },
      )
      .end(buffer);
  });
}

export async function getAdminVacancies() {
  const vacancies = await vacancyDb.findMany({
    orderBy: {
      postedAt: "desc",
    },
  });

  return ok(vacancies.map(serializeVacancy));
}

export async function getPublicVacancies() {
  const [open, closed] = await Promise.all([
    vacancyDb.findMany({
      where: { status: "OPEN" },
      orderBy: { postedAt: "desc" },
    }),
    vacancyDb.findMany({
      where: { status: "CLOSED" },
      orderBy: { applicationDeadline: "desc" },
    }),
  ]);

  return {
    open: open.map(serializeVacancy),
    closed: closed.map(serializeVacancy),
  };
}

export async function getVacancyById(vacancyId: string) {
  const vacancy = await vacancyDb.findUnique({
    where: { id: vacancyId },
  });

  if (!vacancy) {
    return fail("Vacancy not found", 404);
  }

  return ok(serializeVacancy(vacancy));
}

export async function createVacancy(formData: FormData) {
  let uploadedPublicId: string | null = null;

  try {
    const parsed = parseVacancyPayload(formData.get("vacancyData"));

    if (!parsed.success || !parsed.data) {
      return parsed;
    }

    const data = normalizePayload(parsed.data);
    const slug = data.slug || await generateSlug(data.title);

    const existing = await vacancyDb.findFirst({
      where: { slug },
      select: { id: true },
    });

    if (existing) {
      return fail("Slug already exists");
    }

    let advertisementUrl: string | null = null;
    let advertisementPublicId: string | null = null;
    const file = formData.get("advertisement");

    if (isFileLike(file) && file.size) {
      const upload = await uploadAdvertisement(file as File);
      advertisementUrl = upload.secure_url;
      advertisementPublicId = upload.public_id;
      uploadedPublicId = upload.public_id;
    }

    const vacancy = await vacancyDb.create({
      data: {
        ...data,
        slug,
        advertisementUrl,
        advertisementPublicId,
      },
    });

    return ok(serializeVacancy(vacancy), 201);
  } catch (error) {
    if (uploadedPublicId) {
      await cloudinary.uploader.destroy(uploadedPublicId, {
        resource_type: "raw",
      });
    }

    return fail(error instanceof Error ? error.message : "Failed to create vacancy", 500);
  }
}

export async function updateVacancy(vacancyId: string, formData: FormData) {
  let newPublicId: string | null = null;

  try {
    const existing = await vacancyDb.findUnique({
      where: { id: vacancyId },
    });

    if (!existing) {
      return fail("Vacancy not found", 404);
    }

    const parsed = parseVacancyPayload(formData.get("vacancyData"));

    if (!parsed.success || !parsed.data) {
      return parsed;
    }

    const data = normalizePayload(parsed.data);
    const slug = data.slug || await generateSlug(data.title, vacancyId);

    const duplicate = await vacancyDb.findFirst({
      where: {
        slug,
        id: { not: vacancyId },
      },
      select: { id: true },
    });

    if (duplicate) {
      return fail("Slug already exists");
    }

    let advertisementUrl = existing.advertisementUrl ?? null;
    let advertisementPublicId = existing.advertisementPublicId ?? null;
    const file = formData.get("advertisement");

    if (isFileLike(file) && file.size) {
      const upload = await uploadAdvertisement(file as File);
      advertisementUrl = upload.secure_url;
      advertisementPublicId = upload.public_id;
      newPublicId = upload.public_id;
    }

    const vacancy = await vacancyDb.update({
      where: { id: vacancyId },
      data: {
        ...data,
        slug,
        advertisementUrl,
        advertisementPublicId,
      },
    });

    if (newPublicId && existing.advertisementPublicId) {
      await cloudinary.uploader.destroy(existing.advertisementPublicId, {
        resource_type: "raw",
      });
    }

    return ok(serializeVacancy(vacancy));
  } catch (error) {
    if (newPublicId) {
      await cloudinary.uploader.destroy(newPublicId, {
        resource_type: "raw",
      });
    }

    return fail(error instanceof Error ? error.message : "Failed to update vacancy", 500);
  }
}

export async function deleteVacancy(vacancyId: string) {
  try {
    const existing = await vacancyDb.findUnique({
      where: { id: vacancyId },
    });

    if (!existing) {
      return fail("Vacancy not found", 404);
    }

    await vacancyDb.delete({
      where: { id: vacancyId },
    });

    if (existing.advertisementPublicId) {
      await cloudinary.uploader.destroy(existing.advertisementPublicId, {
        resource_type: "raw",
      });
    }

    return ok({ id: vacancyId });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to delete vacancy", 500);
  }
}
