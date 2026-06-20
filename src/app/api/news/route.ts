import { NextRequest, NextResponse } from "next/server";

import { getPublicNews } from "@/lib/features/news/services/news.service";

export async function GET(req:NextRequest){

  try{

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 9;
    const search = req.nextUrl.searchParams.get("search") || undefined;
    const category = req.nextUrl.searchParams.get("category") || undefined;

    const data = await getPublicNews({
      page,
      limit,
      search,
      category,
    });

    return NextResponse.json(data);

  }
  catch(error){
    console.error("GET /api/news:", error);

    return NextResponse.json(
      { success: false, message:"Failed to load news" },
      { status:500 }
    );

  }

}
