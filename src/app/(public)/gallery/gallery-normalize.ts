export type GalleryImage = {
  id: string;
  fileUrl: string;
};

export type GalleryEvent = {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  images: GalleryImage[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (
  source: Record<string, unknown>,
  keys: string[],
): string | undefined => {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
};

const normalizeImage = (
  image: unknown,
  fallbackId: string,
): GalleryImage | null => {
  if (typeof image === "string" && image.trim()) {
    return {
      id: fallbackId,
      fileUrl: image.trim(),
    };
  }

  if (!isRecord(image)) return null;

  const fileUrl = readString(image, [
    "fileUrl",
    "url",
    "image",
    "thumbnail",
    "secure_url",
    "src",
  ]);

  if (!fileUrl) return null;

  return {
    id: readString(image, ["id", "publicId", "public_id"]) ?? fallbackId,
    fileUrl,
  };
};

export const normalizeGalleryEvent = (
  event: unknown,
  index = 0,
): GalleryEvent | null => {
  if (!isRecord(event)) return null;

  const title = readString(event, ["title", "name"]);
  const slug = readString(event, ["slug"]);

  if (!title || !slug) return null;

  const rawImages = Array.isArray(event.images)
    ? event.images
    : Array.isArray(event.gallery)
      ? event.gallery
      : [];

  const images = rawImages
    .map((image, imageIndex) =>
      normalizeImage(image, `${slug}-${index}-${imageIndex}`),
    )
    .filter((image): image is GalleryImage => Boolean(image));

  const coverImage =
    readString(event, ["coverImage", "image", "thumbnail"]) ??
    images[0]?.fileUrl ??
    "/404.png";

  return {
    id: readString(event, ["id"]) ?? slug,
    title,
    slug,
    coverImage,
    images,
  };
};

export const normalizeGalleryEvents = (events: unknown[]): GalleryEvent[] => {
  const seenSlugs = new Set<string>();
  const normalized: GalleryEvent[] = [];

  events.forEach((event, index) => {
    const galleryEvent = normalizeGalleryEvent(event, index);

    if (!galleryEvent || seenSlugs.has(galleryEvent.slug)) return;

    seenSlugs.add(galleryEvent.slug);
    normalized.push(galleryEvent);
  });

  return normalized;
};
