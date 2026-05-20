import { NewsArticle } from "@/components/news/news.types";

type NewsRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is NewsRecord =>
  typeof value === "object" && value !== null;

const readString = (
  source: NewsRecord,
  keys: string[],
): string | undefined => {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
};

const readBoolean = (
  source: NewsRecord,
  keys: string[],
): boolean | undefined => {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "boolean") return value;
  }
};

const formatDate = (value: string | undefined) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getNewsItemsFromResponse = (response: unknown): unknown[] => {
  if (Array.isArray(response)) return response;
  if (!isRecord(response)) return [];

  if (Array.isArray(response.news)) return response.news;
  if (Array.isArray(response.data)) return response.data;

  if (isRecord(response.data)) {
    if (Array.isArray(response.data.news)) return response.data.news;
    if (Array.isArray(response.data.items)) return response.data.items;
    if (Array.isArray(response.data.results)) return response.data.results;
  }

  return [];
};

export const normalizeNewsArticle = (
  item: unknown,
  index = 0,
): NewsArticle | null => {
  if (!isRecord(item)) return null;

  const title = readString(item, ["title", "headline"]);

  if (!title) return null;

  const id =
    readString(item, ["id", "slug"]) ??
    `${title.toLowerCase().replace(/\s+/g, "-")}-${index}`;
  const slug = readString(item, ["slug", "id"]);

  return {
    id,
    slug,
    source:
      readString(item, ["source", "category", "type"]) ?? "AAHII Newsroom",
    title,
    excerpt: readString(item, ["excerpt", "description", "summary"]) ?? "",
    image:
      readString(item, ["coverImage", "image", "thumbnail"]) ??
      "/press/news1.jpg",
    link: readString(item, ["link", "url", "href"]) ?? "#",
    publishedAt: formatDate(
      readString(item, ["publishedAt", "published", "date", "createdAt"]),
    ),
    featured: readBoolean(item, ["featured"]),
  };
};

export const normalizeNewsArticles = (items: unknown[]): NewsArticle[] => {
  const seen = new Set<string>();
  const normalized: NewsArticle[] = [];

  items.forEach((item, index) => {
    const article = normalizeNewsArticle(item, index);
    if (!article) return;

    const key =
      article.slug ?? (article.link !== "#" ? article.link : undefined) ?? article.id;
    if (seen.has(key)) return;

    seen.add(key);
    normalized.push(article);
  });

  return normalized;
};
