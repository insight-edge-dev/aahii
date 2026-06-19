CREATE TYPE "NewsStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

ALTER TABLE "News"
  ADD COLUMN "category" TEXT,
  ADD COLUMN "featuredImageUrl" TEXT,
  ADD COLUMN "featuredImagePublicId" TEXT,
  ADD COLUMN "status" "NewsStatus" NOT NULL DEFAULT 'PUBLISHED',
  ADD COLUMN "metaTitle" TEXT,
  ADD COLUMN "metaDescription" TEXT,
  ADD COLUMN "facebookCaption" TEXT,
  ADD COLUMN "linkedinCaption" TEXT,
  ADD COLUMN "twitterCaption" TEXT,
  ADD COLUMN "socialCaption" TEXT,
  ADD COLUMN "socialHashtags" TEXT;

UPDATE "News"
SET
  "category" = COALESCE(NULLIF("source", ''), "type"::TEXT),
  "featuredImageUrl" = "coverImage",
  "featuredImagePublicId" = "publicId",
  "status" = CASE
    WHEN "isActive" = true THEN 'PUBLISHED'::"NewsStatus"
    ELSE 'DRAFT'::"NewsStatus"
  END;

CREATE INDEX "News_status_idx" ON "News"("status");
CREATE INDEX "News_featured_idx" ON "News"("featured");
CREATE INDEX "News_publishedAt_idx" ON "News"("publishedAt");
CREATE INDEX "News_category_idx" ON "News"("category");
