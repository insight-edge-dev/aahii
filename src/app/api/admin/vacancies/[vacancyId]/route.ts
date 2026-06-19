import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import {
  deleteVacancy,
  getVacancyById,
  updateVacancy,
} from "@/lib/features/vacancies/services/vacancies.service";
import {
  ForbiddenError,
  requireAdmin,
  UnauthorizedError,
} from "@/lib/adminAuth";

type RouteParams = {
  params: Promise<{
    vacancyId: string;
  }>;
};

function revalidateVacancies() {
  revalidatePath("/careers/vacancies");
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams,
) {
  try {
    await requireAdmin();

    const { vacancyId } = await params;
    const result = await getVacancyById(vacancyId);

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
      { success: false, message: "Failed to load vacancy" },
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

    const { vacancyId } = await params;
    const formData = await req.formData();
    const result = await updateVacancy(vacancyId, formData);

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
      { success: false, message: "Failed to update vacancy" },
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

    const { vacancyId } = await params;
    const result = await deleteVacancy(vacancyId);

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
      { success: false, message: "Failed to delete vacancy" },
      { status: 500 },
    );
  }
}
