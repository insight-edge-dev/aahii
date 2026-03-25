import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

import {
  createVideoSchema,
  updateVideoSchema,
  validateThumbnail
} from "../validations/videos.validation";

import { randomUUID } from "crypto";

/* ================= CONSTANTS ================= */

const VIDEO_FOLDER = "aahii/videos";

type UploadResult={
  secure_url:string;
  public_id:string;
};

const isFileLike=(value:unknown):value is Blob =>
  value instanceof Blob &&
  typeof (value as Blob).arrayBuffer==="function";

/* ================= UPLOAD ================= */

async function uploadThumbnail(
  file:File,
  videoId:string
):Promise<UploadResult>{

  validateThumbnail(file);

  const buffer=
  Buffer.from(await file.arrayBuffer());

  return new Promise((resolve,reject)=>{

    cloudinary.uploader.upload_stream(

      {
        folder:`${VIDEO_FOLDER}/${videoId}`,
        resource_type:"image"
      },

      (error,result)=>{

        if(error || !result){
          return reject(error);
        }

        resolve(result as UploadResult);

      }

    ).end(buffer);

  });

}

/* ===================================================== */
/* ================= CREATE VIDEO ====================== */
/* ===================================================== */

export async function createVideo(
  formData:FormData
){

  const videoId=randomUUID();

  let uploadedPublicId:string | null=null;

  try{

    const raw=formData.get("videoData");

    if(!raw || typeof raw!=="string"){

      return {
        success:false,
        status:400,
        message:"Invalid payload"
      };

    }

    let parsedJson;

    try{
      parsedJson=JSON.parse(raw);
    }
    catch{

      return {
        success:false,
        status:400,
        message:"Invalid JSON"
      };

    }

    const parsed=
    createVideoSchema.safeParse(parsedJson);

    if(!parsed.success){

      return {
        success:false,
        status:400,
        message:"Validation failed",
        errors:parsed.error.flatten()
      };

    }

    const data=parsed.data;

    /* ================= THUMBNAIL ================= */

    let thumbnail=null;
    let publicId=null;

    const file=formData.get("thumbnail");

    if(isFileLike(file)){

      const upload=
      await uploadThumbnail(
        file as File,
        videoId
      );

      thumbnail=upload.secure_url;
      publicId=upload.public_id;

      uploadedPublicId=publicId;

    }

    /* ================= CREATE ================= */

    const video=
    await prisma.video.create({

      data:{

        id:videoId,

        title:data.title,

        description:data.description,

        videoUrl:data.videoUrl,

        thumbnail,

        thumbnailPublicId:publicId,

        publishedAt:
          new Date(data.publishedAt),

        isActive:
          data.isActive ?? true

      }

    });

    return {

      success:true,

      status:201,

      data:video

    };

  }
  catch(error){

    /* rollback upload */

    if(uploadedPublicId){

      await cloudinary.uploader.destroy(
        uploadedPublicId,
        { invalidate:true }
      );

    }

    console.error("CREATE VIDEO ERROR:",error);

    return {

      success:false,

      status:500,

      message:"Failed to create video"

    };

  }

}

/* ===================================================== */
/* ================= UPDATE VIDEO ====================== */
/* ===================================================== */

export async function updateVideo(
  videoId:string,
  formData:FormData
){

  let newPublicId:string | null=null;

  try{

    const existing=
    await prisma.video.findUnique({
      where:{ id:videoId }
    });

    if(!existing){

      return {
        success:false,
        status:404,
        message:"Video not found"
      };

    }

    const raw=formData.get("videoData");

    if(!raw || typeof raw!=="string"){

      return {
        success:false,
        status:400,
        message:"Invalid payload"
      };

    }

    let parsedJson;

    try{
      parsedJson=JSON.parse(raw);
    }
    catch{

      return {
        success:false,
        status:400,
        message:"Invalid JSON"
      };

    }

    const parsed=
    updateVideoSchema.safeParse(parsedJson);

    if(!parsed.success){

      return {

        success:false,

        status:400,

        message:"Validation failed",

        errors:parsed.error.flatten()

      };

    }

    const data=parsed.data;

    /* ================= THUMBNAIL ================= */

    let thumbnail=existing.thumbnail;
    let publicId=existing.thumbnailPublicId;

    const file=formData.get("thumbnail");

    if(isFileLike(file)){

      const upload=
      await uploadThumbnail(
        file as File,
        videoId
      );

      thumbnail=upload.secure_url;

      publicId=upload.public_id;

      newPublicId=publicId;

    }

    /* ================= UPDATE ================= */

    const updated=
    await prisma.video.update({

      where:{ id:videoId },

      data:{

        title:
          data.title ?? existing.title,

        description:
          data.description ?? existing.description,

        videoUrl:
          data.videoUrl ?? existing.videoUrl,

        thumbnail,

        thumbnailPublicId:publicId,

        publishedAt:
          data.publishedAt
          ? new Date(data.publishedAt)
          : existing.publishedAt,

        isActive:
          data.isActive ?? existing.isActive

      }

    });

    /* delete old thumbnail */

    if(
      newPublicId &&
      existing.thumbnailPublicId
    ){

      await cloudinary.uploader.destroy(

        existing.thumbnailPublicId,

        { invalidate:true }

      );

    }

    return {

      success:true,

      status:200,

      data:updated

    };

  }
  catch(error){

    /* rollback new upload */

    if(newPublicId){

      await cloudinary.uploader.destroy(
        newPublicId,
        { invalidate:true }
      );

    }

    console.error("UPDATE VIDEO ERROR:",error);

    return {

      success:false,

      status:500,

      message:"Failed to update video"

    };

  }

}

/* ===================================================== */
/* ================= DELETE VIDEO ====================== */
/* ===================================================== */

export async function deleteVideo(
  videoId:string
){

  try{

    const existing=
    await prisma.video.findUnique({
      where:{ id:videoId }
    });

    if(!existing){

      return {

        success:false,

        status:404,

        message:"Video not found"

      };

    }

    await prisma.video.delete({

      where:{ id:videoId }

    });

    if(existing.thumbnailPublicId){

      await cloudinary.uploader.destroy(

        existing.thumbnailPublicId,

        { invalidate:true }

      );

    }

    return {

      success:true,

      status:200,

      message:"Video deleted"

    };

  }
  catch(error){

    console.error("DELETE VIDEO ERROR:",error);

    return {

      success:false,

      status:500,

      message:"Failed to delete video"

    };

  }

}

/* ===================================================== */
/* ================= GET ALL =========================== */
/* ===================================================== */

export async function getVideos(
  page:number=1,
  limit:number=10,
  search?:string
){

  const skip=(page-1)*limit;

  const where:any={

    isActive:true

  };

  if(search){

    where.OR=[

      {
        title:{
          contains:search,
          mode:"insensitive"
        }
      },

      {
        description:{
          contains:search,
          mode:"insensitive"
        }
      }

    ];

  }

  const [videos,total]=
  await Promise.all([

    prisma.video.findMany({

      where,

      orderBy:{
        publishedAt:"desc"
      },

      skip,

      take:limit

    }),

    prisma.video.count({
      where
    })

  ]);

  return {

    success:true,

    data:videos,

    pagination:{

      page,

      limit,

      total,

      pages:
        Math.ceil(total/limit)

    }

  };

}

/* ===================================================== */
/* ================= GET BY ID ========================= */
/* ===================================================== */

export async function getVideoById(
  id:string
){

  const video=
  await prisma.video.findUnique({

    where:{ id }

  });

  if(!video){

    return {

      success:false,

      status:404,

      message:"Video not found"

    };

  }

  return {

    success:true,

    status:200,

    data:video

  };

}