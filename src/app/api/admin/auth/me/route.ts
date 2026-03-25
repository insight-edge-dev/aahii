import { NextResponse } from "next/server";

import {
  requireAdmin,
  UnauthorizedError,
  ForbiddenError
} from "@/lib/adminAuth";

import {
  getCurrentAdmin
} from "@/lib/features/auth/services/auth.service";

export const runtime="nodejs";

export async function GET(){

  try{

    const admin =
    await requireAdmin();

    const result =
    await getCurrentAdmin(
      admin.adminId
    );

    if(!result.success){

      return NextResponse.json(

        {
          success:false,
          message:result.message
        },

        { status:result.status }

      );

    }

    return NextResponse.json({

      success:true,

      data:result.data

    });

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
      "ME ERROR:",
      error
    );

    return NextResponse.json(

      {
        success:false,
        message:"Failed to fetch admin"
      },

      { status:500 }

    );

  }

}