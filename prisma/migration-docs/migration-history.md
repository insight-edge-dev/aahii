# Prisma Migration History

Last audited: 2026-06-19

## Current Repository Migration Folders

| Migration | Status | Purpose | Notes |
| --- | --- | --- | --- |
| `20260618000000_add_announcements` | Present locally | Creates `Announcement` table and indexes | The table was also created manually in the database before the repository migration history was repaired. Do not assume this migration can run safely against an existing production table without checking `_prisma_migrations`. |
| `20260618010000_add_vacancies` | Present locally | Creates `VacancyStatus` enum and `Vacancy` table | The enum/table were also created manually in the database. Marking may be required instead of execution in environments where they already exist. |
| `20260619090000_upgrade_news_cms` | Present locally, uncommitted at audit time | Adds newsroom CMS fields to `News` | This migration assumes `News` already exists. It fails in a shadow database if the baseline migration that creates `News` is missing. |

## Database Migration History Gap

Known database migration history includes:

| Migration | Present locally | Meaning |
| --- | --- | --- |
| `20260326064602` | No | Missing migration recorded in the database. Exact SQL was not found in local Git history. |

This is the root cause of the current Prisma failure:

- `P3006`
- `P1014`
- `The underlying table for model News does not exist`

The shadow database cannot replay the schema because the local migration chain no longer creates the legacy tables before later migrations alter them.

## Historical Migrations Found In Git

These migrations were found in Git history but are not present in the current working tree.

| Historical migration | First observed around | Created objects |
| --- | --- | --- |
| `20260318073354_init` | `bef032b`, `74d2658` | `Admin`, `Vendor`, `VendorCategory`, `VendorAddress`, `VendorTaxDetails`, `VendorBusinessDetails`, `VendorApplicant`, `VendorDocument`, `VendorAdminReview`, and vendor/admin enums |
| `20260318113924_init` | `5706592`, `7660a33` | Same vendor/admin baseline plus `NewsType` enum and initial `News` table |
| `20260318120554_add_news_slug` | `5706592`, `7660a33` | Adds required `News.slug` and unique index |

These historical migrations were deleted around the Event/Gallery/Video work:

- `2951aec`
- `ddb9b95`

## Model Origin Map

| Model / enum group | Evidence found | Original migration found? | Notes |
| --- | --- | --- | --- |
| `Admin`, `AdminRole` | Present in `20260318073354_init` and `20260318113924_init` | Yes | Recoverable from Git history. |
| Vendor models and enums | Present in `20260318073354_init` and `20260318113924_init` | Yes | Recoverable from Git history. |
| `News`, `NewsType` | Present in `20260318113924_init`; slug added in `20260318120554_add_news_slug` | Partially | Initial table and slug migration are recoverable, but database records `20260326064602`, not these exact local names. |
| `Event`, `EventImage` | Present in schema snapshots around `2951aec` / `ddb9b95` | No | No SQL migration containing `CREATE TABLE "Event"` was found in all-ref Git search. |
| `Video` | Present in schema snapshots around `2951aec` / `ddb9b95` | No | No SQL migration containing `CREATE TABLE "Video"` was found in all-ref Git search. |
| `Tender`, `TenderDocument`, `TenderStatus`, `TenderDocumentKind` | Present in schema snapshots around `827def6` / `f89ad8e` | No | No SQL migration containing `CREATE TABLE "Tender"` was found in all-ref Git search. |
| `Announcement` | Present in current migration `20260618000000_add_announcements` | Yes | Also manually created in database. |
| `Vacancy`, `VacancyStatus` | Present in current migration `20260618010000_add_vacancies` | Yes | Also manually created in database. |

## Missing Migration Reconstruction Assessment

`20260326064602` cannot be exactly reconstructed from this repository alone.

Evidence checked:

- Current `prisma/migrations`
- Git history for `prisma/migrations`
- Git history for `prisma/schema.prisma`
- All-ref grep for `20260326064602`
- All-ref grep for `CREATE TABLE "Event"`
- All-ref grep for `CREATE TABLE "Video"`
- All-ref grep for `CREATE TABLE "Tender"`

Result:

- No tracked migration folder or SQL content for `20260326064602` was found.
- Some older migrations can be recovered, but their names/checksums do not match the database-recorded migration.
- Event, Video, and Tender creation SQL cannot be recovered from Git history.

## Recommended Repair Strategy

Recommended path: re-baseline Prisma migration history.

Do not create a fake `20260326064602` migration unless its exact SQL and checksum can be recovered from the environment that originally created it.

High-level safe repair:

1. Freeze schema-changing work.
2. Confirm production schema matches intended `prisma/schema.prisma`.
3. Create a reviewed baseline migration from the intended schema in a controlled branch.
4. Mark the baseline as applied in existing databases where objects already exist.
5. Mark manually-applied migrations as applied where appropriate.
6. Keep future migrations incremental and replayable from the baseline.

See `production-notes.md` for deployment cautions.
