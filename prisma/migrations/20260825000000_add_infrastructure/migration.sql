CREATE TYPE "InfrastructureCategory" AS ENUM (
  'ON_SITE_DEVELOPMENT',
  'CONCEPT_PLAN'
);

CREATE TABLE "InfrastructureImage" (
  "id" TEXT NOT NULL,
  "category" "InfrastructureCategory" NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "publicId" TEXT,
  "caption" TEXT,
  "altText" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "InfrastructureImage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "InfrastructureImage_category_sortOrder_idx"
  ON "InfrastructureImage" ("category", "sortOrder");

CREATE INDEX "InfrastructureImage_category_isFeatured_idx"
  ON "InfrastructureImage" ("category", "isFeatured");