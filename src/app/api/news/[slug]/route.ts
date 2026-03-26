import { NextRequest, NextResponse } from "next/server";

import {
  getNewsBySlug
} from "@/lib/features/news/services/news.service";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const news = await getNewsBySlug(slug);

  if (!news) {
    return NextResponse.json(
      { message: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(news);
}