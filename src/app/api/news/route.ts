import { NextRequest, NextResponse } from "next/server";

import {
  getAllNews
} from "@/lib/features/news/services/news.service";

export async function GET(req:NextRequest){

  try{

    const page=
    Number(req.nextUrl.searchParams.get("page"))||1;

    const data=
    await getAllNews(page,10);

    return NextResponse.json(data);

  }
  catch(error){

    return NextResponse.json(
      { message:"Failed" },
      { status:500 }
    );

  }

}