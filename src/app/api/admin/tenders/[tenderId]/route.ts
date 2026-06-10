import { NextRequest, NextResponse } from "next/server";
import {
  deleteTender,
  getTenderById,
  updateTender,
} from "@/lib/features/tenders/services/tenders.service";
import {
  ForbiddenError,
  requireAdmin,
  UnauthorizedError,
} from "@/lib/adminAuth";

type RouteParams = {
  params: Promise<{
    tenderId: string;
  }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin();

    const { tenderId } = await params;
    const result = await getTenderById(tenderId);

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

    console.error("GET TENDER ROUTE:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch tender" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin();

    const { tenderId } = await params;
    const formData = await req.formData();
    const result = await updateTender(tenderId, formData);

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

    console.error("UPDATE TENDER ROUTE:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update tender" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin();

    const { tenderId } = await params;
    const result = await deleteTender(tenderId);

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

    console.error("DELETE TENDER ROUTE:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete tender" },
      { status: 500 },
    );
  }
}
