CREATE TYPE "VacancyStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED');

CREATE TABLE "Vacancy" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "employmentType" TEXT NOT NULL,
  "department" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "applyEmail" TEXT NOT NULL,
  "advertisementUrl" TEXT,
  "advertisementPublicId" TEXT,
  "status" "VacancyStatus" NOT NULL DEFAULT 'DRAFT',
  "postedAt" TIMESTAMP(3) NOT NULL,
  "applicationDeadline" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Vacancy_slug_key" ON "Vacancy"("slug");
CREATE INDEX "Vacancy_status_idx" ON "Vacancy"("status");
CREATE INDEX "Vacancy_postedAt_idx" ON "Vacancy"("postedAt");
CREATE INDEX "Vacancy_applicationDeadline_idx" ON "Vacancy"("applicationDeadline");
