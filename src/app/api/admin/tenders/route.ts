import { NextRequest, NextResponse } from "next/server";
import {
  createTender,
  getAllTenders,
} from "@/lib/features/tenders/services/tenders.service";
import {
  ForbiddenError,
  requireAdmin,
  UnauthorizedError,
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const result = await createTender(formData);

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

    console.error("CREATE TENDER ROUTE:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create tender" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 20;

    const data = await getAllTenders({
      page,
      limit,
      admin: true,
    });

    return NextResponse.json(data);
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

    console.error("GET ADMIN TENDERS ROUTE:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch tenders" },
      { status: 500 },
    );
  }
}
