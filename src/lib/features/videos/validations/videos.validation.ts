import { z } from "zod";

/* ================= CONSTANTS ================= */

export const MAX_THUMBNAIL_SIZE = 1024 * 1024; // 1MB

export const ALLOWED_THUMBNAIL_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

/* ================= HELPERS ================= */

export function validateThumbnail(file: File){

  if(!ALLOWED_THUMBNAIL_TYPES.includes(file.type)){
    throw new Error(
      "Thumbnail must be JPG, PNG or WEBP"
    );
  }

  if(file.size > MAX_THUMBNAIL_SIZE){
    throw new Error(
      "Thumbnail must be less than 1MB"
    );
  }

}

/* ================= CREATE ================= */

export const createVideoSchema = z.object({

  title: z
    .string()
    .min(5,"Title must be at least 5 characters")
    .max(200,"Title too long"),

  description: z
    .string()
    .min(10,"Description too short")
    .max(5000,"Description too long"),

  videoUrl: z
    .string()
    .url("Invalid video URL"),

  publishedAt: z
    .string()
    .refine(
      val => !isNaN(Date.parse(val)),
      "Invalid date"
    ),

  isActive: z
    .boolean()
    .optional()

});

/* ================= UPDATE ================= */

export const updateVideoSchema = z.object({

  title: z
    .string()
    .min(5)
    .max(200)
    .optional(),

  description: z
    .string()
    .min(10)
    .max(5000)
    .optional(),

  videoUrl: z
    .string()
    .url()
    .optional(),

  publishedAt: z
    .string()
    .optional(),

  isActive: z
    .boolean()
    .optional()

}).refine(

  data => Object.keys(data).length > 0,

  {
    message:"At least one field required"
  }

);

/* ================= QUERY ================= */

export const videoQuerySchema = z.object({

  page: z
    .string()
    .optional(),

  limit: z
    .string()
    .optional(),

  search: z
    .string()
    .optional(),

  year: z
    .string()
    .optional(),

  active: z
    .string()
    .optional()

});