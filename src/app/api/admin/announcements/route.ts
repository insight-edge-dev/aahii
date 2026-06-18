import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import {
  createAnnouncement,
  getAdminAnnouncements,
} from "@/lib/features/announcements/services/announcements.service";
import {
  ForbiddenError,
  requireAdmin,
  UnauthorizedError,
} from "@/lib/adminAuth";

function revalidateCmsPages() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/events");
}

export async function GET() {
  try {
    await requireAdmin();

    const result = await getAdminAnnouncements();

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 },
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to load announcements" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const payload = await req.json();
    const result = await createAnnouncement(payload);

    if (result.success) {
      revalidateCmsPages();
    }

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 },
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create announcement" },
      { status: 500 },
    );
  }
}
