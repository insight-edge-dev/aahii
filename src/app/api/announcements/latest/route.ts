import { NextResponse } from "next/server";

import { getLatestAnnouncements } from "@/lib/features/announcements/services/announcements.service";

export async function GET() {
  try {
    const announcements = await getLatestAnnouncements(20);

    return NextResponse.json({
      items: announcements.map((announcement) => ({
        ...announcement,
        publishedAt: announcement.publishedAt.toISOString().slice(0, 10),
      })),
    });
  } catch (error) {
    console.error("GET /api/announcements/latest:", error);

    return NextResponse.json(
      {
        items: [],
        message: "Failed to load announcements",
      },
      { status: 500 },
    );
  }
}
