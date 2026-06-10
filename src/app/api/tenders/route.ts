import { NextRequest, NextResponse } from "next/server";
import { getAllTenders } from "@/lib/features/tenders/services/tenders.service";

export async function GET(req: NextRequest) {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 50;

    const data = await getAllTenders({
      page,
      limit,
      admin: false,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET PUBLIC TENDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tenders",
      },
      { status: 500 },
    );
  }
}
