import { NextResponse } from "next/server";
import { registerVendor } from "@/lib/features/vendor-registration/services/vendor.service";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const result = await registerVendor(formData);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          errors: result.errors ?? undefined,
        },
        { status: result.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        vendorId: result.vendorId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
