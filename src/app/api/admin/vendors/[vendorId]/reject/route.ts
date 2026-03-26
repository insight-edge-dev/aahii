import { NextResponse } from "next/server";
import { rejectVendor } from "@/lib/features/vendor-registration/services/vendor.service";
import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError,
} from "@/lib/adminAuth";
import { AdminRole } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ vendorId: string }> }
) {
  try {
    await requireAdmin([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]);

    const { vendorId } = await params;

    if (!vendorId) {
      return NextResponse.json(
        { success: false, message: "Vendor ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const reason = body?.reason?.trim();

    if (!reason || reason.length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Rejection reason must be at least 5 characters",
        },
        { status: 400 }
      );
    }

    await rejectVendor(vendorId, reason);

    return NextResponse.json(
      { success: true, message: "Vendor rejected successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 }
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 403 }
      );
    }

    console.error("Reject Vendor Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
