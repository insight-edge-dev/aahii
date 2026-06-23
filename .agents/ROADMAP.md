# Roadmap

## Current Phase

Current phase inferred from repository state: production hardening and launch stabilization.

Evidence:

- CI workflow is present.
- Production deployment workflow is present.
- JWT validation/auth code was recently fixed.
- Prisma migration docs document production risks.
- Admin CMS modules are implemented for core content workflows.

Needs Verification with the product/team owner.

## Upcoming Milestones

- Verify production PM2 process naming and deployment directory.
- Resolve or formally re-baseline Prisma migration history.
- Confirm admin login routing and remove ambiguity only after review.
- Complete active UI refinements for navigation/branding and vacancies.
- Add or document video CMS workflow if admin video API is intended to be user-facing.
- Strengthen test coverage around auth, CMS APIs, and public content APIs. Needs Verification.

## Launch Checklist

- `npm run lint` passes.
- `npm run build` passes.
- CI passes on PRs to `dev`/`main`.
- Production deploy succeeds from `main`.
- PM2 process reloads the intended app.
- Required env vars are present on VPS.
- Admin login works in production with secure cookie behavior.
- Public pages load correctly on mobile and desktop.
- Vendor registration upload flow works with Cloudinary.
- Tenders/documents, vacancies, news, announcements, gallery/events, and videos render current data.
- Database backup exists before any schema repair.
- Prisma baseline/replay strategy is documented before future migrations.

## Out Of Scope Without Approval

- Prisma schema changes
- Production migrations
- Auth redesign
- Deployment strategy changes
- Public navigation redesign
- Admin shell redesign
