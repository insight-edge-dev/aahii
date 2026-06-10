import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{
    documentId: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const { documentId } = await params;

    const document = await prisma.tenderDocument.findFirst({
      where: {
        id: documentId,
        tender: {
          isActive: true,
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        {
          success: false,
          message: "Document not found",
        },
        { status: 404 },
      );
    }

    const url = cloudinary.utils.private_download_url(document.publicId, "", {
      attachment: true,
      resource_type: "raw",
      type: "upload",
    });

    const response = await fetch(url);

    if (!response.ok || !response.body) {
      return NextResponse.json(
        {
          success: false,
          message: "Document is not available for download",
        },
        { status: response.status || 502 },
      );
    }

    const filename =
      document.originalName?.trim() ||
      `${document.title.replace(/[^a-z0-9-_. ]/gi, "").trim()}.pdf`;

    return new Response(response.body, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("TENDER DOCUMENT DOWNLOAD:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to open document",
      },
      { status: 500 },
    );
  }
}
