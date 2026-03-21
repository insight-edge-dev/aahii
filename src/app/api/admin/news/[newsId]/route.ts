import { NextRequest, NextResponse } from "next/server";

import {
  updateNews,
  deleteNews,
  getNewsById
} from "@/lib/features/news/services/news.service";

import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError
} from "@/lib/adminAuth";

/* ================= TYPES ================= */

type RouteParams = {
  params: Promise<{
    newsId: string;
  }>;
};

/* ================= GET ================= */

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {

    await requireAdmin();

    const { newsId } = await params;

    if (!newsId) {
      return NextResponse.json(
        {
          success: false,
          message: "News ID missing"
        },
        { status: 400 }
      );
    }

    const result =
      await getNewsById(newsId);

    return NextResponse.json(
      result,
      { status: result.status }
    );

  }
  catch (error) {

    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: 401 }
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: 403 }
      );
    }

    console.error("GET NEWS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch news"
      },
      { status: 500 }
    );

  }
}

/* ================= UPDATE ================= */

export async function PUT(
  req: NextRequest,
  { params }: RouteParams
) {

  try {

    await requireAdmin();

    const { newsId } =
      await params;

    if (!newsId) {
      return NextResponse.json(
        {
          success: false,
          message: "News ID missing"
        },
        { status: 400 }
      );
    }

    const formData =
      await req.formData();

    const result =
      await updateNews(
        newsId,
        formData
      );

    return NextResponse.json(
      result,
      { status: result.status }
    );

  }
  catch (error) {

    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: 401 }
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: 403 }
      );
    }

    console.error("UPDATE NEWS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update news"
      },
      { status: 500 }
    );

  }

}

/* ================= DELETE ================= */

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {

  try {

    await requireAdmin();

    const { newsId } =
      await params;

    if (!newsId) {
      return NextResponse.json(
        {
          success: false,
          message: "News ID missing"
        },
        { status: 400 }
      );
    }

    const result =
      await deleteNews(newsId);

    return NextResponse.json(
      result,
      { status: result.status }
    );

  }
  catch (error) {

    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: 401 }
      );
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: 403 }
      );
    }

    console.error("DELETE NEWS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete news"
      },
      { status: 500 }
    );

  }

}