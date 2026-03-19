import { NextResponse } from "next/server";

import {
  getNewsBySlug
} from "@/lib/features/news/services/news.service";

export async function GET(
  req:Request,
  { params }:{ params:{ slug:string } }
){

  const news=
  await getNewsBySlug(
    params.slug
  );

  if(!news){

    return NextResponse.json(
      { message:"Not found" },
      { status:404 }
    );

  }

  return NextResponse.json(news);

}