# Database

## Prisma Overview

AAHII uses Prisma with a PostgreSQL datasource:

- Schema: `prisma/schema.prisma`
- Client: `@prisma/client`
- Connection env var: `DATABASE_URL`
- Seed script: `prisma/seed.ts`

The seed script upserts a `SUPER_ADMIN` account using:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Model Groups

### Admin

- `Admin`
- Enum: `AdminRole` (`SUPER_ADMIN`, `ADMIN`)
- `email` is unique.
- Passwords are hashed with `bcryptjs`.

### Vendors

- `Vendor`
- `VendorCategory`
- `VendorAddress`
- `VendorTaxDetails`
- `VendorBusinessDetails`
- `VendorApplicant`
- `VendorDocument`
- `VendorAdminReview`

Related enums:

- `VendorStatus`
- `Category`
- `EstablishmentType`
- `GstRegistrationType`
- `MsmeType`
- `MsmeClass`
- `DocumentType`

Important constraints:

- `Vendor.email` is unique.
- Vendor child tables cascade on vendor delete.
- `VendorCategory` is unique by `[vendorId, category]`.
- `VendorDocument` is unique by `[vendorId, documentType]`.

### News

- `News`
- Enums: `NewsType`, `NewsStatus`
- `slug` is unique.
- Indexed by status, featured, publishedAt, and category.
- Supports CMS fields for content, metadata, featured image, social captions, status, type, and active state.

### Announcements

- `Announcement`
- `slug` is unique.
- Indexed by publishedAt, priority, and active state.

### Events / Gallery

- `Event`
- `EventImage`
- Event images cascade from `Event`.
- `Event.slug` is unique.

### Videos

- `Video`
- Supports uploaded video URL/public ID, external URL, thumbnail/public ID, published date, and active state.

### Tenders

- `Tender`
- `TenderDocument`
- Enums: `TenderStatus`, `TenderDocumentKind`
- `Tender.ref` is unique.
- Tender documents cascade from `Tender`.
- `Tender.publicationDate` maps to database column `bidSubmission`.

### Vacancies

- `Vacancy`
- Enum: `VacancyStatus` (`DRAFT`, `OPEN`, `CLOSED`)
- `slug` is unique.
- Supports advertisement upload URL/public ID.

## Migration Notes

Prisma migration history is currently high-risk.

Known issue from `prisma/migration-docs`:

- Production/database history records missing migration `20260326064602`.
- Current local migration chain does not recreate all legacy tables before later migrations alter them.
- Shadow database replay can fail with `P3006`, `P1014`, and missing `News` table errors.
- Event, Video, and Tender creation SQL is not present in the current migration chain.

Current local migration folders:

- `20260618000000_add_announcements`
- `20260618010000_add_vacancies`
- `20260619090000_upgrade_news_cms`

Rules:

- Do not change `prisma/schema.prisma` without reading `prisma/migration-docs/production-notes.md`, `migration-history.md`, and `database-evolution.md`.
- Do not run `prisma migrate reset` against shared or production databases.
- Do not invent a replacement migration for `20260326064602`.
- Prefer a reviewed re-baseline strategy if exact historical migration artifacts cannot be recovered.
