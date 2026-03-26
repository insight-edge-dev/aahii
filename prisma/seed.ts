import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  // 🚨 ENV validation
  if (!email || !password) {
    throw new Error("❌ ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
  }

  // 🔐 Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Upsert (safe + idempotent)
  await prisma.admin.upsert({
    where: {
      email,
    },
    update: {
      password: hashedPassword,
      role: AdminRole.SUPER_ADMIN,
    },
    create: {
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: AdminRole.SUPER_ADMIN,
    },
  });

  console.log("✅ Super Admin seeded");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });