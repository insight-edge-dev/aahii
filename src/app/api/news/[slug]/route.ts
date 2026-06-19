import { NextRequest, NextResponse } from "next/server";

import {
  getNewsBySlug
} from "@/lib/features/news/services/news.service";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const news = await getNewsBySlug(slug);

    if (!news.success) {
      return NextResponse.json(
        { success: false, message: news.message || "Not found" },
        { status: news.status }
      );
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error("GET /api/news/[slug]:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load news article" },
      { status: 500 }
    );
  }
}
