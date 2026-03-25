import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

import { signToken } from "@/lib/jwt";

import {

 loginSchema,
 changePasswordSchema

} from "../validations/auth.validations";

/* ================= LOGIN ================= */

export async function loginAdmin(
 data:unknown
){

 const parsed =
 loginSchema.safeParse(data);

 if(!parsed.success){

  return {

   success:false,

   status:400,

   message:"Validation failed",

   errors:
   parsed.error.flatten()

  };

 }

 const { email,password } =
 parsed.data;

 const admin =
 await prisma.admin.findUnique({

  where:{ email }

 });

 if(!admin){

  return {

   success:false,

   status:401,

   message:"Invalid credentials"

  };

 }

 const match =
 await bcrypt.compare(

  password,
  admin.password

 );

 if(!match){

  return {

   success:false,

   status:401,

   message:"Invalid credentials"

  };

 }

 const token =
 signToken({

  adminId:admin.id,

  role:admin.role

 });

 return {

  success:true,

  status:200,

  token,

  admin:{

   id:admin.id,

   name:admin.name,

   email:admin.email,

   role:admin.role

  }

 };

}

/* ================= GET CURRENT ADMIN ================= */

export async function getCurrentAdmin(
 adminId:string
){

 const admin =
 await prisma.admin.findUnique({

  where:{ id:adminId },

  select:{

   id:true,
   name:true,
   email:true,
   role:true,
   createdAt:true

  }

 });

 if(!admin){

  return {

   success:false,

   status:404,

   message:"Admin not found"

  };

 }

 return {

  success:true,

  data:admin

 };

}

/* ================= CHANGE PASSWORD ================= */

export async function changePassword(

 adminId:string,

 data:unknown

){

 const parsed =
 changePasswordSchema.safeParse(data);

 if(!parsed.success){

  return {

   success:false,

   status:400,

   errors:
   parsed.error.flatten()

  };

 }

 const admin =
 await prisma.admin.findUnique({

  where:{ id:adminId }

 });

 if(!admin){

  return {

   success:false,

   status:404,

   message:"Admin not found"

  };

 }

 const match =
 await bcrypt.compare(

  parsed.data.currentPassword,

  admin.password

 );

 if(!match){

  return {

   success:false,

   status:401,

   message:"Current password wrong"

  };

 }

 const hashed =
 await bcrypt.hash(

  parsed.data.newPassword,

  10

 );

 await prisma.admin.update({

  where:{ id:adminId },

  data:{ password:hashed }

 });

 return {

  success:true,

  status:200,

  message:"Password updated"

 };

}

/* ================= CREATE ADMIN (OPTIONAL) */

export async function createAdmin(

 name:string,

 email:string,

 password:string,

 role:any="ADMIN"

){

 const exists =
 await prisma.admin.findUnique({

  where:{ email }

 });

 if(exists){

  return {

   success:false,

   status:400,

   message:"Email exists"

  };

 }

 const hashed =
 await bcrypt.hash(

  password,
  10

 );

 const admin =
 await prisma.admin.create({

  data:{

   name,
   email,

   password:hashed,

   role

  }

 });

 return {

  success:true,

  data:admin

 };

}