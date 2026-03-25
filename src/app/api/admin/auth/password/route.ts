import { NextRequest, NextResponse } from "next/server";

import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError
} from "@/lib/adminAuth";

import {
  changePassword
} from "@/lib/features/auth/services/auth.service";

export const runtime="nodejs";

export async function PATCH(
  req:NextRequest
){

  try{

    const admin =
    await requireAdmin();

    const body =
    await req.json();

    const result =
    await changePassword(

      admin.adminId,

      body

    );

    return NextResponse.json(

      {

        success:result.success,

        message:
        result.message ?? null,

        errors:
        result.errors ?? null

      },

      { status:result.status }

    );

  }
  catch(error){

    if(error instanceof UnauthorizedError){

      return NextResponse.json(

        {
          success:false,
          message:"Unauthorized"
        },

        { status:401 }

      );

    }

    if(error instanceof ForbiddenError){

      return NextResponse.json(

        {
          success:false,
          message:"Forbidden"
        },

        { status:403 }

      );

    }

    console.error(
      "PASSWORD ERROR:",
      error
    );

    return NextResponse.json(

      {
        success:false,
        message:"Password update failed"
      },

      { status:500 }

    );

  }

}