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

/* ================= CREATE ================= */

export async function POST(
  req:NextRequest
){

  try{

    await requireAdmin();

    const formData=
    await req.formData();

    const result=
    await createVideo(formData);

    return NextResponse.json(
      result,
      { status:result.status }
    );

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      return NextResponse.json(
        {
          success:false,
          message:error.message
        },
        { status:401 }
      );

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json(
        {
          success:false,
          message:error.message
        },
        { status:403 }
      );

    }

    console.error("CREATE VIDEO:",error);

    return NextResponse.json(

      {
        success:false,
        message:"Failed to create video"
      },

      { status:500 }

    );

  }

}

/* ================= ADMIN LIST ================= */

export async function GET(
  req:NextRequest
){

  try{

    await requireAdmin();

    const { searchParams }=
    new URL(req.url);

    const page=
    Number(searchParams.get("page") ?? 1);

    const limit=
    Number(searchParams.get("limit") ?? 20);

    const search=
    searchParams.get("search") ?? undefined;

    const result=
    await getVideos(
      page,
      limit,
      search
    );

    return NextResponse.json(result);

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      return NextResponse.json(
        {
          success:false,
          message:error.message
        },
        { status:401 }
      );

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json(
        {
          success:false,
          message:error.message
        },
        { status:403 }
      );

    }

    console.error("GET ADMIN VIDEOS:",error);

    return NextResponse.json(

      {
        success:false,
        message:"Failed"
      },

      { status:500 }

    );

  }

}