import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        publishedAt: true,
        priority: true,
      },
      take: 10,
    });

    return NextResponse.json({
      items: announcements.map((announcement) => ({
        ...announcement,
        publishedAt: announcement.publishedAt.toISOString().slice(0, 10),
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
