import { z } from "zod";

/* ================= CONSTANTS ================= */

export const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB

export const MAX_IMAGES = 50;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

/* ================= IMAGE VALIDATION ================= */

export function validateImageFile(file:File){

  if(!ALLOWED_IMAGE_TYPES.includes(file.type)){

    throw new Error(
      "Invalid image type. Allowed: JPG, PNG, WEBP"
    );

  }

  if(file.size > MAX_IMAGE_SIZE){

    throw new Error(
      "Image exceeds 1MB limit"
    );

  }

}

/* ================= DATE VALIDATOR ================= */

const dateSchema = z
.string()
.refine(

  (val)=>!isNaN(Date.parse(val)),

  "Invalid date format"

);

/* ================= CREATE EVENT ================= */

export const createEventSchema = z.object({

  title:z
  .string()
  .trim()
  .min(5,"Title must be at least 5 chars")
  .max(200,"Title too long"),

  description:z
  .string()
  .trim()
  .max(5000,"Description too long")
  .optional()
  .or(z.literal("")),

  eventDate:dateSchema

});

/* ================= UPDATE EVENT ================= */

export const updateEventSchema = z.object({

  title:z
  .string()
  .trim()
  .min(5)
  .max(200)
  .optional(),

  description:z
  .string()
  .trim()
  .max(5000)
  .optional()
  .or(z.literal("")),

  eventDate:dateSchema.optional()

});

/* ================= QUERY ================= */

export const eventQuerySchema = z.object({

  page:z
  .string()
  .optional()
  .transform(val=>val ? parseInt(val) : 1)
  .refine(val=>!isNaN(val),"Invalid page"),

  limit:z
  .string()
  .optional()
  .transform(val=>val ? parseInt(val) : 10)
  .refine(val=>val<=100,"Limit too high"),

  search:z
  .string()
  .trim()
  .max(200)
  .optional(),

  year:z
  .string()
  .optional()
  .refine(

    val=>{

      if(!val) return true;

      const year=parseInt(val);

      return year>=2000 && year<=2100;

    },

    "Invalid year"

  )

});