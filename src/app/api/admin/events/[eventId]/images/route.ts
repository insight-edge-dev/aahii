import { NextRequest, NextResponse } from "next/server";

import {
  addEventImages,
  deleteEventImages,
} from "@/lib/features/events/services/events.service";

import { requireAdmin } from "@/lib/adminAuth";

type Params = {
  params: Promise<{
    eventId: string;
  }>;
};

/* ================= ADD IMAGES ================= */

export async function POST(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();

    const { eventId } = await params;

    const formData = await req.formData();

    const result = await addEventImages(eventId, formData);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error("ADD EVENT IMAGES ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? `Failed to process event images: ${error.message}`
            : "Failed to process event images",
      },
      { status: 500 },
    );
  }
}

/* ================= DELETE IMAGES ================= */

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();

    const result = await deleteEventImages(body.imageIds);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error("DELETE EVENT IMAGES ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? `Failed to delete event images: ${error.message}`
            : "Failed to delete event images",
      },
      { status: 500 },
    );
  }
}
