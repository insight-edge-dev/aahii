import { NextRequest, NextResponse } from "next/server";

import {
  createNews,
  getAllNews
} from "@/lib/features/news/services/news.service";

import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError
} from "@/lib/adminAuth";

/* ================= CREATE ================= */

export async function POST(req:NextRequest){

  try{

    await requireAdmin();

    const formData=
    await req.formData();

    const result=
    await createNews(formData);

    return NextResponse.json(
      result,
      { status:result.status }
    );

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      return NextResponse.json(
        { message:error.message },
        { status:401 }
      );

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json(
        { message:error.message },
        { status:403 }
      );

    }

    return NextResponse.json(
      { message:"Failed" },
      { status:500 }
    );

  }

}

/* ================= ADMIN LIST ================= */

export async function GET(req:NextRequest){

  try{

    await requireAdmin();

    const page=
    Number(
      req.nextUrl.searchParams.get("page")
    ) || 1;

    const data=
    await getAllNews(page,20);

    return NextResponse.json(data);

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      return NextResponse.json(
        { message:error.message },
        { status:401 }
      );

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json(
        { message:error.message },
        { status:403 }
      );

    }

    return NextResponse.json(
      { message:"Failed" },
      { status:500 }
    );

  }

}