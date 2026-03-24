import { NextRequest, NextResponse } from "next/server";

import { getVideos }
from "@/lib/features/videos/services/videos.service";

export async function GET(
  req:NextRequest
){

  try{

    const { searchParams }=
    new URL(req.url);

    const page=
    Number(searchParams.get("page") ?? 1);

    const limit=
    Number(searchParams.get("limit") ?? 10);

    const result=
    await getVideos(
      page,
      limit
    );

    return NextResponse.json(result);

  }
  catch{

    return NextResponse.json(

      {
        success:false,
        message:"Failed"
      },

      { status:500 }

    );

  }

}