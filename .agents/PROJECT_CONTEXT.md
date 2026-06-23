# AAHII Project Context

## Overview

AAHII is a public-facing institutional website with an internal admin/CMS panel. The app presents institute information, departments, research, infrastructure, news, gallery/events, videos, tenders, vacancies, and vendor registration.

Purpose inferred from the codebase: AAHII appears to represent the Assam Advanced Health Innovation Institute / AGIHF web presence, combining public communication pages with operational CMS workflows. Needs Verification.

## Tech Stack

- Framework: Next.js App Router (`next` 16.1.6)
- Runtime: React 19, TypeScript
- Styling: Tailwind CSS v4 via `@import "tailwindcss"`
- Database: PostgreSQL through Prisma ORM
- Authentication: JWT in an HTTP-only `admin_token` cookie
- Password hashing: `bcryptjs`
- Upload/media integration: Cloudinary
- UI libraries: `lucide-react`, `framer-motion`, `swiper`, `react-hot-toast`
- Validation: Zod
- HTTP client: Axios instance at `src/lib/axios.ts`

## Main Modules

- Public site: `src/app/(public)`
- Admin panel: `src/app/admin`
- API routes: `src/app/api`
- Feature services and admin components: `src/lib/features`
- Shared layout components: `src/components/layout`
- Home/public components: `src/components/home`, `src/components/news`, `src/components/footer`, etc.
- Static/content data: `src/content`
- Prisma schema and seed: `prisma/schema.prisma`, `prisma/seed.ts`
- Deployment config: `.github/workflows`, `ecosystem.config.js`

## Current Development Status

- Public pages and admin CMS modules are present.
- CI workflow exists for Prisma validation, Prisma client generation, and Next.js build.
- GitHub Actions production deployment over SSH exists.
- Prisma migration history has known gaps and must be handled carefully.
- Current working tree has unrelated modified production files at time of memory creation:
  - `src/app/(public)/careers/vacancies/page.tsx`
  - `src/components/layout/BrandingBar.tsx`
  - `src/components/layout/MainNav.tsx`
- Temporary local artifacts also exist:
  - `.tmp-cdp-check.mjs`
  - `.tmp-login-dropdown.png`

## Rules For Future AI Sessions

- Do not change production code unless explicitly requested.
- Read `.agents/` before architecture, database, deployment, or admin work.
- Read `prisma/migration-docs/` before any Prisma schema or migration work.
- Treat migration changes as high-risk until the baseline issue is repaired.
