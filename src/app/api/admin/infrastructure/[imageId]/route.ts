import { AdminRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import {
  ForbiddenError,
  requireAdmin,
  UnauthorizedError,
} from "@/lib/adminAuth";
import {
  deleteInfrastructureImage,
  getInfrastructureImageById,
  updateInfrastructureImage,
} from "@/lib/features/infrastructure/services/infrastructure.service";

type RouteParams = {
  params: Promise<{ imageId: string }>;
};

function authError(error: unknown) {
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

  return null;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]);
    const { imageId } = await params;
    const data = await getInfrastructureImageById(imageId);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Infrastructure image not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const response = authError(error);
    if (response) return response;

    console.error("GET ADMIN INFRASTRUCTURE IMAGE:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load infrastructure image" },
      { status: 500 },
    );
  }
}
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]);
    const { imageId } = await params;
    const result = await updateInfrastructureImage(
      imageId,
      await req.formData(),
    );

    if (result.success) {
      revalidatePath("/infrastructure");
    }

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    const response = authError(error);
    if (response) return response;

    console.error("PUT ADMIN INFRASTRUCTURE IMAGE:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update infrastructure image" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]);
    const { imageId } = await params;
    const result = await deleteInfrastructureImage(imageId);

    if (result.success) {
      revalidatePath("/infrastructure");
    }

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    const response = authError(error);
    if (response) return response;

    console.error("DELETE ADMIN INFRASTRUCTURE IMAGE:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete infrastructure image" },
      { status: 500 },
    );
  }
}
