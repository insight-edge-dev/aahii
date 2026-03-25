import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(){

  try{

    const response =
    NextResponse.json({

      success:true,

      message:"Logged out successfully"

    });

    response.cookies.set(

      "admin_token",

      "",

      {

        httpOnly:true,

        path:"/",

        maxAge:0

      }

    );

    return response;

  }
  catch(error){

    console.error(
      "LOGOUT ERROR:",
      error
    );

    return NextResponse.json(

      {
        success:false,
        message:"Logout failed"
      },

      { status:500 }

    );

  }

}