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

type RouteParams={

  params:Promise<{
    videoId:string;
  }>

};

/* ================= GET ================= */

export async function GET(
  req:NextRequest,
  { params }:RouteParams
){

  try{

    await requireAdmin();

    const { videoId }=
    await params;

    const result=
    await getVideoById(videoId);

    return NextResponse.json(
      result,
      { status:result.status ?? 200 }
    );

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      return NextResponse.json(
        { success:false, message:error.message },
        { status:401 }
      );

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json(
        { success:false, message:error.message },
        { status:403 }
      );

    }

    return NextResponse.json(
      { success:false, message:"Failed" },
      { status:500 }
    );

  }

}

/* ================= UPDATE ================= */

export async function PUT(
  req:NextRequest,
  { params }:RouteParams
){

  try{

    await requireAdmin();

    const { videoId }=
    await params;

    const formData=
    await req.formData();

    const result=
    await updateVideo(
      videoId,
      formData
    );

    return NextResponse.json(
      result,
      { status:result.status }
    );

  }
  catch(error){

    return NextResponse.json(

      {
        success:false,
        message:"Failed to update"
      },

      { status:500 }

    );

  }

}

/* ================= DELETE ================= */

export async function DELETE(
  req:NextRequest,
  { params }:RouteParams
){

  try{

    await requireAdmin();

    const { videoId }=
    await params;

    const result=
    await deleteVideo(videoId);

    return NextResponse.json(
      result,
      { status:result.status }
    );

  }
  catch{

    return NextResponse.json(

      {
        success:false,
        message:"Failed to delete"
      },

      { status:500 }

    );

  }

}