import { NextResponse } from "next/server";

import { getPublicVacancies } from "@/lib/features/vacancies/services/vacancies.service";

export async function GET() {
  try {
    const data = await getPublicVacancies();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET /api/vacancies:", error);

    return NextResponse.json(
      {
        success: false,
        data: {
          open: [],
          closed: [],
        },
        message: "Failed to load vacancies",
      },
      { status: 500 },
    );
  }
}
