import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

/* ================= ENV ================= */

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){

  throw new Error(
    "JWT_SECRET environment variable missing"
  );

}

/* ================= TYPES ================= */

export interface JwtPayload{

  adminId:string;

  role:string;

  iat?:number;

  exp?:number;

}

/* ================= SIGN ================= */

export function signToken(
  payload:JwtPayload
){

  return jwt.sign(

    payload,

    JWT_SECRET as string,

    {

      expiresIn:"1d",

      issuer:"aahii-admin",

      algorithm:"HS256"

    }

  );

}

/* ================= VERIFY ================= */

export function verifyToken(
  token:string
):JwtPayload{

  try{

    const decoded =
    jwt.verify(

      token,

      JWT_SECRET as string,

      {

        issuer:"aahii-admin"

      }

    ) as DefaultJwtPayload & JwtPayload;

    return {

      adminId:decoded.adminId,

      role:decoded.role,

      iat:decoded.iat,

      exp:decoded.exp

    };

  }
  catch{

    throw new Error(
      "Invalid or expired token"
    );

  }

}