import { z } from "zod";

export const newsStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const newsBaseSchema = z.object({
  title: z.string().trim().min(5, "Title too short").max(300),
  slug: z.string().trim().max(300).optional(),
  category: z.string().trim().min(2, "Category is required").max(120),
  source: z.string().trim().max(120).optional(),
  excerpt: z.string().trim().min(10, "Excerpt too short").max(1000),
  content: z.string().trim().min(20, "Article content is required"),
  link: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  publishedAt: z.string().min(1, "Publish date required"),
  featured: z.boolean().optional(),
  status: newsStatusSchema.default("DRAFT"),
  isActive: z.boolean().optional(),
  type: z.enum(["PRESS", "INTERNAL"]).optional(),
  metaTitle: z.string().trim().max(300).optional(),
  metaDescription: z.string().trim().max(500).optional(),
  facebookCaption: z.string().trim().max(1000).optional(),
  linkedinCaption: z.string().trim().max(1000).optional(),
  twitterCaption: z.string().trim().max(280).optional(),
  socialCaption: z.string().trim().max(1000).optional(),
  socialHashtags: z.string().trim().max(300).optional(),
});

export const createNewsSchema = newsBaseSchema;
export const updateNewsSchema = newsBaseSchema.partial().extend({
  status: newsStatusSchema.optional(),
});

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;
