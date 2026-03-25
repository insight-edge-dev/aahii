import { NextRequest, NextResponse } from "next/server";

import {
  getVideos
} from "@/lib/features/videos/services/videos.service";

/* IMPORTANT */
export const runtime = "nodejs";

/* ================= PUBLIC LIST ================= */

export async function GET(
  req: NextRequest
){

  try{

    const { searchParams } =
    new URL(req.url);

    /* SAFE PAGINATION */

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
      ? 10
      : Math.min(
          20,
          Math.max(1,limitRaw)
        );

    const result =
    await getVideos(
      page,
      limit,
      undefined,   // search
      true         // only active (IMPORTANT)
    );

    return NextResponse.json({

      success:true,

      data: result.data.map(video=>({

        id:video.id,

        title:video.title,

        description:video.description,

        videoUrl:video.videoUrl,

        externalUrl:video.externalUrl,

        thumbnail:video.thumbnail,

        publishedAt:video.publishedAt

      })),

      pagination:{

        page:result.pagination.page,

        limit:result.pagination.limit,

        total:result.pagination.total,

        pages:result.pagination.pages

      }

    });

  }
  catch(error){

    console.error(
      "PUBLIC GET VIDEOS ERROR:",
      error
    );

    return NextResponse.json({

      success:false,

      message:"Failed to fetch videos"

    },{ status:500 });

  }

}