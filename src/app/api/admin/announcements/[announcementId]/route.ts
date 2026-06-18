import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import {
  deleteAnnouncement,
  getAnnouncementById,
  updateAnnouncement,
} from "@/lib/features/announcements/services/announcements.service";
import {
  ForbiddenError,
  requireAdmin,
  UnauthorizedError,
} from "@/lib/adminAuth";

type RouteParams = {
  params: Promise<{
    announcementId: string;
  }>;
};

function revalidateCmsPages() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/events");
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams,
) {
  try {
    await requireAdmin();

    const { announcementId } = await params;
    const result = await getAnnouncementById(announcementId);

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
      { success: false, message: "Failed to load announcement" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: RouteParams,
) {
  try {
    await requireAdmin();

    const { announcementId } = await params;
    const payload = await req.json();
    const result = await updateAnnouncement(announcementId, payload);

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
      { success: false, message: "Failed to update announcement" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams,
) {
  try {
    await requireAdmin();

    const { announcementId } = await params;
    const result = await deleteAnnouncement(announcementId);

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
      { success: false, message: "Failed to delete announcement" },
      { status: 500 },
    );
  }
}
