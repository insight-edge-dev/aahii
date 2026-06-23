# Known Issues

## High-Risk Technical Debt

### Prisma Migration History Gap

The repository has a known Prisma migration-history problem. See `prisma/migration-docs/`.

Symptoms:

- `P3006`
- `P1014`
- Shadow database failure due to missing `News` table during migration replay

Root cause:

- Database records migration `20260326064602`, but that exact migration is missing locally.
- Current local migrations do not provide a complete replayable baseline.

Rule: do not modify Prisma schema or generate/apply migrations until the migration baseline strategy is reviewed.

### Deployment / PM2 Naming Mismatch

GitHub Actions reloads PM2 process `aahii`, while `ecosystem.config.js` names the app `agihf`.

Also:

- GitHub Actions deploy path: `/var/www/aahii`
- Ecosystem deploy path: `/var/www/AAHII`

Needs Verification.

### Admin Login Route Ambiguity

There is a public login page at `src/app/login/page.tsx`, auth API routes under `/api/admin/auth/*`, and a legacy-looking `/api/admin/login` route.

Needs Verification before deleting or consolidating anything.

## Current Local Working Tree Notes

At memory creation, these unrelated production files were already modified:

- `src/app/(public)/careers/vacancies/page.tsx`
- `src/components/layout/BrandingBar.tsx`
- `src/components/layout/MainNav.tsx`

Untracked temporary files:

- `.tmp-cdp-check.mjs`
- `.tmp-login-dropdown.png`

Do not revert or overwrite these without user approval.

## Pending UI Fixes

- Navigation/branding/login dropdown may be actively under refinement. Needs Verification.
- Vacancy page may be actively under refinement. Needs Verification.

## Deployment Notes

- Deploy workflow does not run migrations.
- Production deployment success is part of the current milestone, but PM2 process name and exact VPS directory should be verified against the server.
