-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "VendorStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('trader', 'manufacturer', 'authorised_dealer', 'service_provider');

-- CreateEnum
CREATE TYPE "EstablishmentType" AS ENUM ('proprietorship', 'partnership', 'private_ltd', 'public_ltd', 'trust', 'llp', 'society', 'other');

-- CreateEnum
CREATE TYPE "GstRegistrationType" AS ENUM ('registered', 'composite', 'unregistered', 'exempt');

-- CreateEnum
CREATE TYPE "MsmeType" AS ENUM ('micro', 'small', 'medium');

-- CreateEnum
CREATE TYPE "MsmeClass" AS ENUM ('trading', 'service', 'manufacturing');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PAN_CARD', 'CANCELLED_CHEQUE', 'DECLARATION_FORM', 'GST_CERTIFICATE', 'MSME_CERTIFICATE', 'AUTHORIZATION_CERTIFICATE', 'TRADE_LICENSE', 'ITR_YEAR_1', 'ITR_YEAR_2', 'PF_REGISTRATION', 'ESIC_REGISTRATION', 'CLRA_REGISTRATION');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "entityName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "status" "VendorStatus" NOT NULL DEFAULT 'PENDING',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorCategory" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "VendorCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorAddress" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "registeredAddress" TEXT NOT NULL,
    "registeredPin" TEXT NOT NULL,
    "registeredContact" TEXT NOT NULL,
    "sameAsRegistered" BOOLEAN NOT NULL DEFAULT false,
    "communicationAddress" TEXT NOT NULL,
    "communicationPin" TEXT NOT NULL,
    "communicationContact" TEXT NOT NULL,

    CONSTRAINT "VendorAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorTaxDetails" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "cinNumber" TEXT,
    "gstApplicable" BOOLEAN NOT NULL,
    "gstRegistrationType" "GstRegistrationType",
    "gstNumber" TEXT,
    "msmeApplicable" BOOLEAN NOT NULL,
    "msmeNumber" TEXT,
    "msmeType" "MsmeType",
    "msmeClass" "MsmeClass",

    CONSTRAINT "VendorTaxDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorBusinessDetails" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "establishmentType" "EstablishmentType" NOT NULL,
    "keyProducts" TEXT[],
    "specificProducts" TEXT[],
    "hasRelationWithAGIHF" BOOLEAN NOT NULL,
    "relationDetails" TEXT,

    CONSTRAINT "VendorBusinessDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorApplicant" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "applicantName" TEXT NOT NULL,
    "authorisedPerson" TEXT NOT NULL,

    CONSTRAINT "VendorApplicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorDocument" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorAdminReview" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,

    CONSTRAINT "VendorAdminReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");

-- CreateIndex
CREATE INDEX "Vendor_status_idx" ON "Vendor"("status");

-- CreateIndex
CREATE INDEX "Vendor_isDeleted_idx" ON "Vendor"("isDeleted");

-- CreateIndex
CREATE INDEX "VendorCategory_vendorId_idx" ON "VendorCategory"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorCategory_vendorId_category_key" ON "VendorCategory"("vendorId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "VendorAddress_vendorId_key" ON "VendorAddress"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorTaxDetails_vendorId_key" ON "VendorTaxDetails"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorBusinessDetails_vendorId_key" ON "VendorBusinessDetails"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorApplicant_vendorId_key" ON "VendorApplicant"("vendorId");

-- CreateIndex
CREATE INDEX "VendorDocument_vendorId_idx" ON "VendorDocument"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorDocument_vendorId_documentType_key" ON "VendorDocument"("vendorId", "documentType");

-- CreateIndex
CREATE UNIQUE INDEX "VendorAdminReview_vendorId_key" ON "VendorAdminReview"("vendorId");

-- AddForeignKey
ALTER TABLE "VendorCategory" ADD CONSTRAINT "VendorCategory_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorAddress" ADD CONSTRAINT "VendorAddress_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorTaxDetails" ADD CONSTRAINT "VendorTaxDetails_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorBusinessDetails" ADD CONSTRAINT "VendorBusinessDetails_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorApplicant" ADD CONSTRAINT "VendorApplicant_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorDocument" ADD CONSTRAINT "VendorDocument_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorAdminReview" ADD CONSTRAINT "VendorAdminReview_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
