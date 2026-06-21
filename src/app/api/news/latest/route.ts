import { NextResponse } from "next/server";

import { pressData } from "@/content/press";
import { getLatestNews } from "@/lib/features/news/services/news.service";

function fallbackSlug(title: string, id: number) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `press-${id}`;
}

export async function GET() {
  try {
    const news = await getLatestNews(10);

    if (news.length === 0) {
      return NextResponse.json({
        items: pressData.slice(0, 10).map((item) => ({
          id: String(item.id),
          title: item.title,
          slug: fallbackSlug(item.title, item.id),
          category: item.source,
          publishedAt: item.publishedAt,
          priority: item.featured ?? false,
        })),
      });
    }

    return NextResponse.json({
      items: news.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category || item.source || item.type,
        publishedAt: item.publishedAt.toISOString().slice(0, 10),
        priority: item.featured,
      })),
    });
  } catch (error) {
    console.error("GET /api/news/latest:", error);

    return NextResponse.json(
      {
        items: [],
        message: "Failed to load latest news",
      },
      { status: 500 },
    );
  }
}
