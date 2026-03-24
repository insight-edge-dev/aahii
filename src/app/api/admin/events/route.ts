import { NextRequest, NextResponse } from "next/server";

import {
  createEvent,
  getAdminEvents
} from "@/lib/features/events/services/events.service";

import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError
} from "@/lib/adminAuth";

/* ================= CREATE EVENT ================= */

export async function POST(req:NextRequest){

  try{

    await requireAdmin();

    const formData=await req.formData();

    const result=await createEvent(formData);

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

    console.error("CREATE EVENT ERROR",error);

    return NextResponse.json(
      { success:false,message:"Failed" },
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
  catch(error){

    return NextResponse.json(
      { success:false,message:"Failed" },
      { status:500 }
    );

  }

}