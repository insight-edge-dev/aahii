import { NextRequest, NextResponse } from "next/server";

import {
  createVideo,
  getVideos
} from "@/lib/features/videos/services/videos.service";

import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError
} from "@/lib/adminAuth";

/* IMPORTANT FOR COOKIES + CLOUDINARY */
export const runtime = "nodejs";

/* ================= CREATE ================= */

export async function POST(
  req: NextRequest
){

  try{

    await requireAdmin();

    const formData =
    await req.formData();

    const result =
    await createVideo(formData);

    return NextResponse.json({

      success: result.success,

      message: result.message ?? null,

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
            createdAt:result.data.createdAt
          }
        : null,

      errors: result.errors ?? null

    },{ status: result.status });

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

    console.error("ADMIN CREATE VIDEO ERROR:",error);

    return NextResponse.json({

      success:false,
      message:"Video creation failed"

    },{ status:500 });

  }

}

/* ================= ADMIN LIST ================= */

export async function GET(
  req: NextRequest
){

  try{

    await requireAdmin();

    const { searchParams } =
    new URL(req.url);

    /* SAFE PARSING */

    const pageRaw =
    Number(searchParams.get("page"));

    const limitRaw =
    Number(searchParams.get("limit"));

    const page =
    Number.isNaN(pageRaw)
      ? 1
      : Math.max(1,pageRaw);

    const limit =
    Number.isNaN(limitRaw)
      ? 20
      : Math.min(50,Math.max(1,limitRaw));

    const result =
    await getVideos(
      page,
      limit
    );

    return NextResponse.json({

      success:true,

      data:result.data,

      pagination:{

        page:result.pagination.page,

        limit:result.pagination.limit,

        total:result.pagination.total,

        pages:result.pagination.pages

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

    console.error("ADMIN GET VIDEOS ERROR:",error);

    return NextResponse.json({

      success:false,
      message:"Failed to fetch videos"

    },{ status:500 });

  }

}