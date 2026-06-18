import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        source: true,
        type: true,
        publishedAt: true,
        featured: true,
      },
      take: 10,
    });

    return NextResponse.json({
      items: news.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.source || item.type,
        publishedAt: item.publishedAt.toISOString().slice(0, 10),
        priority: item.featured,
      })),
    });
  } catch (error) {
    console.error("GET /api/news/latest:", error);

    return NextResponse.json(
      {
        items: [],
        message: "Failed to load latest announcements",
      },
      { status: 500 }
    );
  }
}
