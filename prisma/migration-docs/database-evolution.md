# Database Evolution

Last audited: 2026-06-19

## Purpose

This document explains how the AAHII database schema evolved, including missing migration history and manual production changes. It is intended for engineers and AI-assisted agents before making schema changes.

## Current Prisma Model Groups

### Admin

Models:

- `Admin`

Enums:

- `AdminRole`

Origin:

- Recoverable from historical migrations `20260318073354_init` and `20260318113924_init`.

Operational notes:

- Used for CMS authentication.
- `email` is unique.
- Passwords are stored in the admin auth flow; migration work must not expose seed credentials.

### Vendors

Models:

- `Vendor`
- `VendorCategory`
- `VendorAddress`
- `VendorTaxDetails`
- `VendorBusinessDetails`
- `VendorApplicant`
- `VendorDocument`
- `VendorAdminReview`

Enums:

- `VendorStatus`
- `Category`
- `EstablishmentType`
- `GstRegistrationType`
- `MsmeType`
- `MsmeClass`
- `DocumentType`

Origin:

- Recoverable from historical migrations `20260318073354_init` and `20260318113924_init`.

Operational notes:

- Uses multiple cascading relations from `Vendor`.
- Do not alter enum values casually; public registration and admin review depend on them.

### News

Models:

- `News`

Enums:

- `NewsType`

Origin:

- Initial `News` table is recoverable from `20260318113924_init`.
- `News.slug` is recoverable from `20260318120554_add_news_slug`.
- The database records a missing migration named `20260326064602`.

Current issue:

- Later migration `20260619090000_upgrade_news_cms` assumes `News` exists.
- Shadow database replay fails because the current local chain does not create `News`.

Operational notes:

- Do not run migrations that alter `News` until the baseline problem is repaired.
- Do not create a guessed replacement for `20260326064602`.

### Events

Models:

- `Event`
- `EventImage`

Origin:

- Present in schema snapshots around `2951aec` and `ddb9b95`.
- No SQL migration creating these tables was found in repository history.

Operational notes:

- Event images cascade through `Event`.
- Public gallery and admin event CMS depend on this schema.

### Videos

Models:

- `Video`

Origin:

- Present in schema snapshots around `2951aec` and `ddb9b95`.
- No SQL migration creating this table was found in repository history.

Operational notes:

- Current schema supports uploaded video, external video URL, thumbnail, and Cloudinary public IDs.

### Tenders

Models:

- `Tender`
- `TenderDocument`

Enums:

- `TenderStatus`
- `TenderDocumentKind`

Origin:

- Present in schema snapshots around `827def6` and `f89ad8e`.
- No SQL migration creating these tables/enums was found in repository history.

Operational notes:

- `Tender.publicationDate` is mapped to database column `bidSubmission` in current schema.
- Tender documents cascade from `Tender`.

### Announcements

Models:

- `Announcement`

Origin:

- Local migration `20260618000000_add_announcements`.
- Also manually created in database.

Operational notes:

- Public top announcement bar depends on active announcements.
- If table exists before migration execution, the migration must be marked applied or reconciled.

### Vacancies

Models:

- `Vacancy`

Enums:

- `VacancyStatus`

Origin:

- Local migration `20260618010000_add_vacancies`.
- Also manually created in database.

Operational notes:

- Public page exposes `OPEN` and `CLOSED`; `DRAFT` is admin-only.
- PDF advertisement fields depend on Cloudinary raw uploads.

## Known Missing SQL

The following schema areas lack replayable migration SQL in the current repository:

- Exact migration `20260326064602`
- Event/EventImage creation
- Video creation
- Tender/TenderDocument creation

Historical SQL that can be recovered:

- Vendor/Admin baseline
- Initial News table
- News slug addition

## Future Migration Rules

1. Every Prisma schema change must have a committed migration folder.
2. Every manual production SQL change must be recorded in `production-notes.md`.
3. Never delete migration folders after they have been applied anywhere.
4. Never create a migration that assumes an untracked table exists.
5. Before adding `ALTER TABLE` migrations, verify shadow replay from baseline.
6. If a migration is manually marked applied, document environment, date, operator, and reason.

## Proposed Long-Term Directory Structure

```text
prisma/
├── migrations/
├── migration-archive/
└── migration-docs/
    ├── migration-history.md
    ├── database-evolution.md
    ├── production-notes.md
    └── rollback-strategies.md
```

### `migrations/`

Committed Prisma migrations that must replay in order from a known baseline.

### `migration-archive/`

For historical recovered SQL that is not part of the active Prisma migration chain. Archive files should be clearly marked as reference-only.

### `migration-docs/`

Human-readable migration history, production notes, and rollback/deployment guidance for engineers and future AI agents.
