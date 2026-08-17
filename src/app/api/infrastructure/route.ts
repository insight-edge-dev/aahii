import { NextResponse } from "next/server";

import { getPublicInfrastructureImages } from "@/lib/features/infrastructure/services/infrastructure.service";

export async function GET() {
  try {
    const data = await getPublicInfrastructureImages();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET /api/infrastructure:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load infrastructure updates" },
      { status: 500 },
    );
  }
}
