CREATE TABLE "Announcement" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "link" TEXT,
  "priority" BOOLEAN NOT NULL DEFAULT false,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "publishedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Announcement_slug_key" ON "Announcement"("slug");
CREATE INDEX "Announcement_publishedAt_idx" ON "Announcement"("publishedAt");
CREATE INDEX "Announcement_priority_idx" ON "Announcement"("priority");
CREATE INDEX "Announcement_isActive_idx" ON "Announcement"("isActive");
