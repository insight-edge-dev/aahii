import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import {
  createNewsSchema,
  updateNewsSchema
} from "../validations/news.validation";

import { NewsType } from "@prisma/client";
import { randomUUID } from "crypto";

const MAX_IMAGE_SIZE = 500 * 1024;

const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

const NEWS_FOLDER = "aahii/news";

const MAX_FEATURED = 6;

type ServiceResponse<T = unknown> = {
  success:boolean;
  status:number;
  message?:string;
  data?:T;
  errors?:unknown;
};

type UploadResult={
  secure_url:string;
  public_id:string;
};

const isFileLike=(value:unknown):value is Blob=>
  value instanceof Blob &&
  typeof (value as Blob).arrayBuffer==="function";

/* ================= RESPONSE HELPERS ================= */

function ok<T>(data:T,status=200):ServiceResponse<T>{
  return { success:true,status,data };
}

function fail(
  message:string,
  status:number=400,
  errors?:unknown
):ServiceResponse{

  return {
    success:false,
    status,
    message,
    errors
  };

}

/* ================= SLUG ================= */

function slugify(title:string){

  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g,"")
    .replace(/\s+/g,"-")
    .replace(/-+/g,"-")
    .trim();

}

async function generateSlug(title:string){

  const base=slugify(title);

  let slug=base;

  let count=1;

  while(true){

    const exists=
    await prisma.news.findFirst({
      where:{ slug }
    });

    if(!exists) return slug;

    slug=`${base}-${count++}`;

  }

}

/* ================= IMAGE ================= */

async function uploadImage(
  file:File,
  newsId:string
):Promise<UploadResult>{

  if(
    !file.type.startsWith("image/") &&
    !ALLOWED_MIME.includes(file.type)
  ){
    throw new Error("Invalid image format");
  }

  if(file.size>MAX_IMAGE_SIZE){
    throw new Error("Image must be under 500KB");
  }

  const buffer=
  Buffer.from(await file.arrayBuffer());

  return new Promise((resolve,reject)=>{

    cloudinary.uploader.upload_stream(

      {
        folder:`${NEWS_FOLDER}/${newsId}`
      },

      (error,result)=>{

        if(error||!result){
          reject(
            new Error("Image upload failed")
          );
          return;
        }

        resolve(result as UploadResult);

      }

    ).end(buffer);

  });

}

/* ===================================================== */
/* ================= CREATE ============================ */
/* ===================================================== */

export async function createNews(
  formData:FormData
):Promise<ServiceResponse>{

  const newsId=randomUUID();

  let uploadedPublicId:string | null=null;

  try{

    const raw=formData.get("newsData");

    if(!raw||typeof raw!=="string"){
      return fail("Invalid request payload");
    }

    let parsedJson;

    try{
      parsedJson=JSON.parse(raw);
    }
    catch{
      return fail("Invalid JSON format");
    }

    const validation=
    createNewsSchema.safeParse(parsedJson);

    if(!validation.success){

      return fail(
        "Validation failed",
        400,
        validation.error.flatten()
      );

    }

    const data=validation.data;

    /* FEATURED LIMIT */

    if(data.featured){

      const count=
      await prisma.news.count({
        where:{ featured:true }
      });

      if(count>=MAX_FEATURED){

        return fail(
          `Maximum ${MAX_FEATURED} featured news allowed`
        );

      }

    }

    const slug=
    await generateSlug(data.title);

    let coverImage:string | null=null;
    let publicId:string | null=null;

    const file=formData.get("coverImage");

    if(isFileLike(file)){

      const upload=
      await uploadImage(
        file as File,
        newsId
      );

      coverImage=upload.secure_url;
      publicId=upload.public_id;

      uploadedPublicId=publicId;

    }

    const news=
    await prisma.news.create({

      data:{

        id:newsId,

        slug,

        source:data.source,

        title:data.title,

        excerpt:data.excerpt,

        content:
          data.type===NewsType.INTERNAL
          ? data.content??null
          : null,

        link:
          data.type===NewsType.PRESS
          ? data.link??null
          : null,

        coverImage,

        publicId,

        publishedAt:
          new Date(data.publishedAt),

        featured:data.featured??false,

        type:data.type,

        isActive:data.isActive??true

      }

    });

    return ok(news,201);

  }
  catch(error){

    if(uploadedPublicId){

      await cloudinary.uploader.destroy(
        uploadedPublicId
      );

    }

    console.error("CREATE NEWS:",error);

    return fail(
      "Failed to create news",
      500
    );

  }

}

/* ===================================================== */
/* ================= UPDATE ============================ */
/* ===================================================== */

export async function updateNews(
  newsId:string,
  formData:FormData
):Promise<ServiceResponse>{

  let newPublicId:string | null=null;

  try{

    const existing=
    await prisma.news.findUnique({
      where:{ id:newsId }
    });

    if(!existing){
      return fail("News not found",404);
    }

    const raw=formData.get("newsData");

    if(!raw||typeof raw!=="string"){
      return fail("Invalid payload");
    }

    let parsedJson;

    try{
      parsedJson=JSON.parse(raw);
    }
    catch{
      return fail("Invalid JSON");
    }

    const validation=
    updateNewsSchema.safeParse(parsedJson);

    if(!validation.success){

      return fail(
        "Validation failed",
        400,
        validation.error.flatten()
      );

    }

    const data=validation.data;

    let coverImage=existing.coverImage;
    let publicId=existing.publicId;

    const file=formData.get("coverImage");

    if(isFileLike(file)){

      const upload=
      await uploadImage(
        file as File,
        newsId
      );

      coverImage=upload.secure_url;
      publicId=upload.public_id;

      newPublicId=publicId;

    }

    let slug=existing.slug;

    if(
      data.title &&
      data.title!==existing.title
    ){

      slug=
      await generateSlug(data.title);

    }

    const updated=
    await prisma.news.update({

      where:{ id:newsId },

      data:{

        slug,

        source:data.source??existing.source,

        title:data.title??existing.title,

        excerpt:data.excerpt??existing.excerpt,

        content:data.content??existing.content,

        link:data.link??existing.link,

        coverImage,

        publicId,

        publishedAt:
          data.publishedAt
          ? new Date(data.publishedAt)
          : existing.publishedAt,

        featured:
          data.featured??existing.featured,

        type:data.type??existing.type,

        isActive:
          data.isActive??existing.isActive

      }

    });

    /* DELETE OLD IMAGE */

    if(newPublicId && existing.publicId){

      await cloudinary.uploader.destroy(
        existing.publicId
      );

    }

    return ok(updated);

  }
  catch(error){

    if(newPublicId){

      await cloudinary.uploader.destroy(
        newPublicId
      );

    }

    console.error("UPDATE NEWS:",error);

    return fail(
      "Failed to update news",
      500
    );

  }

}

/* ===================================================== */
/* ================= DELETE ============================ */
/* ===================================================== */

export async function deleteNews(
  newsId:string
):Promise<ServiceResponse>{

  try{

    const existing=
    await prisma.news.findUnique({
      where:{ id:newsId }
    });

    if(!existing){
      return fail("News not found",404);
    }

    await prisma.news.delete({
      where:{ id:newsId }
    });

    if(existing.publicId){

      await cloudinary.uploader.destroy(
        existing.publicId
      );

    }

    return ok(
      { id:newsId },
      200
    );

  }
  catch(error){

    console.error("DELETE NEWS:",error);

    return fail(
      "Failed to delete news",
      500
    );

  }

}

/* ===================================================== */
/* ================= GET ALL =========================== */
/* ===================================================== */

export async function getAllNews(
  page:number=1,
  limit:number=10
){

  const skip=(page-1)*limit;

  const [news,total]=
  await Promise.all([

    prisma.news.findMany({

      where:{ isActive:true },

      orderBy:{
        publishedAt:"desc"
      },

      skip,

      take:limit

    }),

    prisma.news.count({
      where:{ isActive:true }
    })

  ]);

  return {

    success:true,

    status:200,

    data:{
      news,

      pagination:{
        page,
        limit,
        total,
        pages:
        Math.ceil(total/limit)
      }
    }

  };

}

/* ===================================================== */
/* ================= GET ONE =========================== */
/* ===================================================== */

export async function getNewsById(id:string){

  const news=
  await prisma.news.findUnique({
    where:{ id }
  });

  if(!news){

    return fail("News not found",404);

  }

  return ok(news);

}

/* ===================================================== */
/* ================= GET BY SLUG ======================= */
/* ===================================================== */

export async function getNewsBySlug(slug:string){

  const news=
  await prisma.news.findFirst({

    where:{
      slug,
      isActive:true
    }

  });

  if(!news){

    return fail("News not found",404);

  }

  return ok(news);

}