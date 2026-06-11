import { z } from "zod";

/* ===================================================== */
/* ================= BASE SCHEMA ======================= */
/* ===================================================== */

export const newsBaseSchema = z.object({

  source:
    z.string()
    .trim()
    .max(120)
    .optional(),

  title:
    z.string()
    .trim()
    .min(5,"Title too short")
    .max(300),

  excerpt:
    z.string()
    .trim()
    .min(10,"Excerpt too short")
    .max(1000),

  content:
    z.string()
    .trim()
    .optional(),

  link:
    z.string()
    .trim()
    .url("Invalid URL")
    .optional(),

  publishedAt:
    z.string()
    .min(1,"Publish date required"),

  featured:
    z.boolean().optional(),

  type:
    z.enum(["PRESS","INTERNAL"]),

  isActive:
    z.boolean().optional()

});

/* ===================================================== */
/* ================= CREATE ============================ */
/* ===================================================== */

export const createNewsSchema =
newsBaseSchema.superRefine((data,ctx)=>{

  /* PRESS requires link */

  if(
    data.type==="PRESS" &&
    !data.source
  ){

    ctx.addIssue({

      code:"custom",

      path:["source"],

      message:"PRESS news must include a source"

    });

  }

  if(
    data.type==="PRESS" &&
    !data.link
  ){

    ctx.addIssue({

      code:"custom",

      path:["link"],

      message:"PRESS news must include a link"

    });

  }

  /* INTERNAL requires content */

  if(
    data.type==="INTERNAL" &&
    !data.content
  ){

    ctx.addIssue({

      code:"custom",

      path:["content"],

      message:"INTERNAL news must include content"

    });

  }

});

/* ===================================================== */
/* ================= UPDATE ============================ */
/* ===================================================== */

export const updateNewsSchema =
newsBaseSchema
.partial()
.superRefine((data,ctx)=>{

  /* Only validate if fields exist */

  if(
    data.type==="PRESS" &&
    !data.source
  ){

    ctx.addIssue({

      code:"custom",

      path:["source"],

      message:"PRESS news should contain source"

    });

  }

  if(
    data.type==="PRESS" &&
    data.content &&
    !data.link
  ){

    ctx.addIssue({

      code:"custom",

      path:["link"],

      message:"PRESS news should contain link"

    });

  }

  if(
    data.type==="INTERNAL" &&
    data.link &&
    !data.content
  ){

    ctx.addIssue({

      code:"custom",

      path:["content"],

      message:"INTERNAL news should contain content"

    });

  }

});

/* ===================================================== */
/* ================= TYPES ============================= */
/* ===================================================== */

export type CreateNewsInput =
z.infer<typeof createNewsSchema>;

export type UpdateNewsInput =
z.infer<typeof updateNewsSchema>;
