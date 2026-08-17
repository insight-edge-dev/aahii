import { AdminRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import {
  ForbiddenError,
  requireAdmin,
  UnauthorizedError,
} from "@/lib/adminAuth";
import {
  createInfrastructureImage,
  getAdminInfrastructureImages,
} from "@/lib/features/infrastructure/services/infrastructure.service";

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

export async function GET() {
  try {
    await requireAdmin([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]);
    const data = await getAdminInfrastructureImages();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const response = authError(error);
    if (response) return response;

    console.error("GET ADMIN INFRASTRUCTURE:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load infrastructure images" },
      { status: 500 },
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    await requireAdmin([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]);
    const result = await createInfrastructureImage(await req.formData());

    if (result.success) {
      revalidatePath("/infrastructure");
    }

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    const response = authError(error);
    if (response) return response;

    console.error("POST ADMIN INFRASTRUCTURE:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create infrastructure image" },
      { status: 500 },
    );
  }
}
