import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import {
  createVacancy,
  getAdminVacancies,
} from "@/lib/features/vacancies/services/vacancies.service";
import {
  ForbiddenError,
  requireAdmin,
  UnauthorizedError,
} from "@/lib/adminAuth";

function revalidateVacancies() {
  revalidatePath("/careers/vacancies");
}

export async function GET() {
  try {
    await requireAdmin();

    const result = await getAdminVacancies();

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
      { success: false, message: "Failed to load vacancies" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const result = await createVacancy(formData);

    if (result.success) {
      revalidateVacancies();
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
      { success: false, message: "Failed to create vacancy" },
      { status: 500 },
    );
  }
}
