import {
  AdminRole,
  InfrastructureCategory,
  PrismaClient,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const infrastructureImages = [
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `10000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
    category: InfrastructureCategory.ON_SITE_DEVELOPMENT,
    imageUrl: `/construction/${index + 1}.jpg`,
    altText: `On-site development update ${index + 1}`,
    sortOrder: index,
    isFeatured: index === 0,
  })),
  ...[
    "/concept/1.png",
    "/concept/2.png",
    "/concept/3.png",
    "/concept/4.png",
    "/concept/5.jpg",
    "/concept/6.png",
  ].map((imageUrl, index) => ({
    id: `20000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
    category: InfrastructureCategory.CONCEPT_PLAN,
    imageUrl,
    altText: `Concept plan ${index + 1}`,
    sortOrder: index,
    isFeatured: index === 0,
  })),
];

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

  await prisma.infrastructureImage.createMany({
    data: infrastructureImages,
    skipDuplicates: true,
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
