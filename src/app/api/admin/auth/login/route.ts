import { NextRequest, NextResponse } from "next/server";

import {
  loginAdmin
} from "@/lib/features/auth/services/auth.service";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest
){

  try{

    const body =
    await req.json();

    const result =
    await loginAdmin(body);

    /* HANDLE FAILURE */

    if(!result.success){

      return NextResponse.json(

        {
          success:false,
          message:result.message ?? "Login failed",
          errors:result.errors ?? null
        },

        { status:result.status }

      );

    }

    /* NOW TS KNOWS SUCCESS = TRUE */

    if(!result.token){

      return NextResponse.json(

        {
          success:false,
          message:"Token generation failed"
        },

        { status:500 }

      );

    }

    const response =
    NextResponse.json({

      success:true,

      data:result  // ✅ FIXED

    });

    response.cookies.set(

      "admin_token",

      result.token,   // ✅ now safe

      {

        httpOnly:true,

        secure:
        process.env.NODE_ENV === "production",

        sameSite:"lax",

        path:"/",

        maxAge:60*60*24

      }

    );

    return response;

  }
  catch(error){

    console.error(
      "ADMIN LOGIN:",
      error
    );

    return NextResponse.json(

      {
        success:false,
        message:"Login failed"
      },

      { status:500 }

    );

  }

}