import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import {
  createEvent,
  getAdminEvents
} from "@/lib/features/events/services/events.service";

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

/* ================= CREATE EVENT ================= */

export async function POST(req:NextRequest){

  try{

    await requireAdmin();

    const formData=await req.formData();

    const result=await createEvent(formData);

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

      return NextResponse.json(
        { success:false,message:error.message },
        { status:401 }
      );

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json(
        { success:false,message:error.message },
        { status:403 }
      );

    }

    console.error("CREATE EVENT ROUTE ERROR",error);

    return NextResponse.json(
      {
        success:false,
        message:
          error instanceof Error
          ? `Failed to process event upload: ${error.message}`
          : "Failed to process event upload"
      },
      { status:500 }
    );

  }

}

/* ================= ADMIN LIST ================= */

export async function GET(){

  try{

    await requireAdmin();

    const events=await getAdminEvents();

    return NextResponse.json({

      success:true,
      data:events

    });

  }
  catch{

    return NextResponse.json(
      { success:false,message:"Failed" },
      { status:500 }
    );

  }

}
