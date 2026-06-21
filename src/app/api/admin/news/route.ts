import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import {
  createNews,
  getAdminNews,
  type NewsStatus
} from "@/lib/features/news/services/news.service";

import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError
} from "@/lib/adminAuth";

function revalidateCmsPages() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/events");
}

type AdminNewsStatusFilter = NewsStatus | "ALL";

const adminNewsStatuses = new Set<AdminNewsStatusFilter>([
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
  "ALL",
]);

function parseAdminStatus(value: string | null): AdminNewsStatusFilter | undefined | null {
  if (!value) return undefined;
  return adminNewsStatuses.has(value as AdminNewsStatusFilter)
    ? (value as AdminNewsStatusFilter)
    : null;
}

/* ================= CREATE ================= */

export async function POST(req:NextRequest){

  try{

    await requireAdmin();

    const formData=
    await req.formData();

    const result=
    await createNews(formData);

    if(result.success){
      revalidateCmsPages();
    }

    return NextResponse.json(
      result,
      { status:result.status }
    );

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      console.warn("ADMIN NEWS CREATE AUTH FAILED:", error.message);

      return NextResponse.json(
        { success:false,message:error.message },
        { status:401 }
      );

    }

    if(error instanceof ForbiddenError){

      console.warn("ADMIN NEWS CREATE FORBIDDEN:", error.message);

      return NextResponse.json(
        { success:false,message:error.message },
        { status:403 }
      );

    }

    return NextResponse.json(
      { success:false,message:"Failed" },
      { status:500 }
    );

  }

}

/* ================= ADMIN LIST ================= */

export async function GET(req:NextRequest){

  try{

    await requireAdmin();

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
    const search = req.nextUrl.searchParams.get("search") || undefined;
    const category = req.nextUrl.searchParams.get("category") || undefined;
    const status = parseAdminStatus(req.nextUrl.searchParams.get("status"));

    if(status === null){
      return NextResponse.json(
        { success:false,message:"Invalid status filter" },
        { status:400 }
      );
    }

    const data = await getAdminNews({
      page,
      limit,
      search,
      category,
      status,
    });

    return NextResponse.json(data);

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      console.warn("ADMIN NEWS LIST AUTH FAILED:", error.message);

      return NextResponse.json(
        { success:false,message:error.message },
        { status:401 }
      );

    }

    if(error instanceof ForbiddenError){

      console.warn("ADMIN NEWS LIST FORBIDDEN:", error.message);

      return NextResponse.json(
        { success:false,message:error.message },
        { status:403 }
      );

    }

    return NextResponse.json(
      { success:false,message:"Failed" },
      { status:500 }
    );

  }

}
