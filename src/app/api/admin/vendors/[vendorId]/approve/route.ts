import { NextResponse } from "next/server";
import { approveVendor } from "@/lib/features/vendor-registration/services/vendor.service";
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

    await approveVendor(vendorId);

    return NextResponse.json(
      { success: true, message: "Vendor approved successfully" },
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

    console.error("Approve Vendor Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
