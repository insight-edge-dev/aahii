import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main(){

 const hashedPassword =
 await bcrypt.hash(
  "pkmkbpkmkb",
  10
 );

 await prisma.admin.upsert({

  where:{
   email:"admin@aahii.com"
  },

  update:{        // ✅ FIX

   password:hashedPassword,
   role:AdminRole.SUPER_ADMIN

  },

  create:{

   name:"Super Admin",

   email:"admin@aahii.com",

   password:hashedPassword,

   role:AdminRole.SUPER_ADMIN

  }

 });

 console.log("Super Admin seeded");

}

main()
.catch(console.error)
.finally(async()=>{

 await prisma.$disconnect();

});