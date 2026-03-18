import { NextResponse } from "next/server";
import { getVendors } from "@/lib/features/vendor-registration/services/vendor.service";
import { VendorStatus, AdminRole } from "@prisma/client";
import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError,
} from "@/lib/adminAuth";

export async function GET(req: Request) {
  try {
    await requireAdmin([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]);

    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get("status");

    let status: VendorStatus | undefined;

    if (statusParam) {
      if (!Object.values(VendorStatus).includes(statusParam as VendorStatus)) {
        return NextResponse.json(
          { success: false, message: "Invalid status filter" },
          { status: 400 }
        );
      }
      status = statusParam as VendorStatus;
    }

    const vendors = await getVendors(status);

    return NextResponse.json(
      {
        success: true,
        count: vendors.length,
        data: vendors,
      },
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

    console.error("Fetch Vendors Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
