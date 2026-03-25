import { NextRequest, NextResponse } from "next/server";

import {
  updateVideo,
  deleteVideo,
  getVideoById
} from "@/lib/features/videos/services/videos.service";

import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError
} from "@/lib/adminAuth";

/* IMPORTANT FOR COOKIES + CLOUDINARY */
export const runtime = "nodejs";

/* ================= TYPES ================= */

type RouteParams = {
  params: Promise<{
    videoId:string;
  }>;
};

/* ================= GET ================= */

export async function GET(
  req: NextRequest,
  { params }: RouteParams
){

  try{

    await requireAdmin();

    const { videoId } =
    await params;

    if(!videoId){

      return NextResponse.json({

        success:false,
        message:"Video id required"

      },{ status:400 });

    }

    const result =
    await getVideoById(videoId);

    if(!result.success || !result.data){

      return NextResponse.json({

        success:false,
        message:result.message ?? "Video not found"

      },{ status:result.status ?? 404 });

    }

    const video = result.data;

    return NextResponse.json({

      success:true,

      data:{
        id:video.id,
        title:video.title,
        description:video.description,
        videoUrl:video.videoUrl,
        externalUrl:video.externalUrl,
        thumbnail:video.thumbnail,
        publishedAt:video.publishedAt,
        isActive:video.isActive,
        createdAt:video.createdAt,
        updatedAt:video.updatedAt
      }

    });

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      return NextResponse.json({

        success:false,
        message:error.message

      },{ status:401 });

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json({

        success:false,
        message:error.message

      },{ status:403 });

    }

    console.error("ADMIN VIDEO GET ERROR:",error);

    return NextResponse.json({

      success:false,
      message:"Failed to fetch video"

    },{ status:500 });

  }

}

/* ================= UPDATE ================= */

export async function PUT(
  req: NextRequest,
  { params }: RouteParams
){

  try{

    await requireAdmin();

    const { videoId } =
    await params;

    if(!videoId){

      return NextResponse.json({

        success:false,
        message:"Video id required"

      },{ status:400 });

    }

    const formData =
    await req.formData();

    const result =
    await updateVideo(
      videoId,
      formData
    );

    return NextResponse.json({

      success:result.success,

      message:result.message ?? null,

      data: result.data
        ? {
            id:result.data.id,
            title:result.data.title,
            description:result.data.description,
            videoUrl:result.data.videoUrl,
            externalUrl:result.data.externalUrl,
            thumbnail:result.data.thumbnail,
            publishedAt:result.data.publishedAt,
            isActive:result.data.isActive,
            updatedAt:result.data.updatedAt
          }
        : null,

      errors:result.errors ?? null

    },{ status:result.status });

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      return NextResponse.json({

        success:false,
        message:error.message

      },{ status:401 });

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json({

        success:false,
        message:error.message

      },{ status:403 });

    }

    console.error("ADMIN VIDEO UPDATE ERROR:",error);

    return NextResponse.json({

      success:false,
      message:"Failed to update video"

    },{ status:500 });

  }

}

/* ================= DELETE ================= */

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
){

  try{

    await requireAdmin();

    const { videoId } =
    await params;

    if(!videoId){

      return NextResponse.json({

        success:false,
        message:"Video id required"

      },{ status:400 });

    }

    const result =
    await deleteVideo(videoId);

    return NextResponse.json({

      success:result.success,

      message:result.message ?? null

    },{ status:result.status });

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      return NextResponse.json({

        success:false,
        message:error.message

      },{ status:401 });

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json({

        success:false,
        message:error.message

      },{ status:403 });

    }

    console.error("ADMIN VIDEO DELETE ERROR:",error);

    return NextResponse.json({

      success:false,
      message:"Failed to delete video"

    },{ status:500 });

  }

}