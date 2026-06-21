# Production Migration Notes

Last audited: 2026-06-19

## Current Production Risk

Prisma migration history is not replayable from the current repository.

Known symptoms:

- `P3006`
- `P1014`
- Shadow database error: underlying table for model `News` does not exist.

Cause:

- The database records migration `20260326064602`.
- That migration is missing locally.
- Current local migration chain does not create legacy tables such as `News` before later migrations alter them.

## Manual Database Changes Known So Far

| Object | Manual change | Risk |
| --- | --- | --- |
| `Announcement` table | Created manually before or alongside `20260618000000_add_announcements` | Running the migration against an existing table can fail unless marked applied. |
| `VacancyStatus` enum | Created manually before or alongside `20260618010000_add_vacancies` | Running `CREATE TYPE` against an existing enum can fail unless marked applied. |
| `Vacancy` table | Created manually before or alongside `20260618010000_add_vacancies` | Running the migration against an existing table can fail unless marked applied. |

## Repair Strategy Comparison

### A. Recreate missing migration `20260326064602`

Assessment: not recommended.

Why:

- The exact SQL was not found in Git history.
- A guessed migration will not match the original checksum.
- It may fail or drift if production schema differs from the guessed SQL.

Use only if:

- The exact original migration folder is recovered from another machine, backup, deployment artifact, or Prisma migration table checksum source.

### B. Create a new baseline migration

Assessment: useful as part of re-baselining, but not enough by itself.

Why:

- A baseline can make shadow DB replay possible.
- Existing databases must not execute baseline `CREATE TABLE` SQL over existing objects.

Operational requirement:

- Existing environments need baseline marked applied, not executed.

### C. Re-baseline Prisma migration history

Assessment: recommended.

Why safest:

- Acknowledges that the current chain is broken.
- Avoids pretending that guessed historical SQL is authoritative.
- Creates a known replayable starting point for future migrations.
- Can avoid destructive SQL in production by marking baseline applied.

Risks:

- Requires careful environment coordination.
- Requires a reviewed baseline that accurately reflects production.
- Incorrect baseline creates future drift.

Impact on local DB:

- Existing local DB can be preserved if baseline/recent migrations are marked applied correctly.
- Fresh local DBs can be created from the new baseline after the repair is complete.

Impact on production DB:

- No table drops or resets required.
- Baseline should be recorded as applied for existing objects.
- Manual tables/enums must be reconciled in `_prisma_migrations`.

Impact on future migrations:

- Future migrations become replayable from baseline.
- Shadow database validation should work again.
- AI-assisted development can rely on docs plus a stable baseline.

### D. Alternative safer approach

Assessment: recover exact artifacts first, if possible.

Before re-baselining, check:

- Other developer machines
- CI/CD artifacts
- Deployment bundles
- Database backups
- Previous branches not fetched locally
- Remote Git providers with deleted branch refs

If exact `20260326064602` is recovered, prefer restoring it over re-baselining.

If not recovered, proceed with re-baselining.

## Recommended Production Repair Runbook

Do not execute this until reviewed by the team.

1. Freeze schema-changing work.
2. Back up production database.
3. Export current production schema for review using approved DBA tooling.
4. Compare production schema to `prisma/schema.prisma`.
5. Resolve any intentional differences in a written checklist.
6. Create a baseline migration in a dedicated repair branch.
7. Validate baseline on an empty disposable database.
8. Mark baseline as applied in existing databases.
9. Mark manually-created announcement/vacancy migrations as applied where objects already exist.
10. Generate future migrations only after shadow replay succeeds.

## Explicitly Forbidden During Repair

- Do not run `prisma migrate reset` against shared or production databases.
- Do not run `prisma db pull` as a hidden source of truth without documenting review.
- Do not delete applied migrations.
- Do not create a fake `20260326064602` unless exact original SQL is recovered.
- Do not deploy an `ALTER TABLE "News"` migration until the baseline issue is fixed.

## Notes For Future AI Agents

Before changing `prisma/schema.prisma`:

1. Read this file.
2. Read `migration-history.md`.
3. Read `database-evolution.md`.
4. Check `git status`.
5. Check current migration folders.
6. Ask before generating or applying migrations if migration history is still broken.

Never infer that a table exists in a shadow database just because it exists in production.
