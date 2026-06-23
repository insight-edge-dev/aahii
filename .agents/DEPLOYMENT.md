# Deployment

## Production Deployment

Production deploys are configured in `.github/workflows/deploy.yml`.

Trigger:

- Push to `main`

GitHub Actions deploy job:

1. Connects to the VPS through `appleboy/ssh-action@v1.2.0`.
2. Changes directory to `/var/www/aahii`.
3. Runs `git fetch origin main`.
4. Runs `git pull --ff-only origin main`.
5. Runs `npm ci`.
6. Runs `npx prisma generate`.
7. Runs `npm run build`.
8. Runs `pm2 reload aahii --update-env`.

Important: production deployment explicitly does not run Prisma migrations.

## CI Flow

CI is configured in `.github/workflows/ci.yml`.

Triggers:

- Pull requests into `dev` or `main`
- Pushes to `dev`

CI steps:

1. Checkout
2. Setup Node 22
3. `npm ci`
4. `npx prisma validate`
5. `npx prisma generate`
6. `npm run build`

CI uses a dummy `DATABASE_URL` because Prisma validation/generation require the env var but do not connect to the database.

## PM2 Setup

The active GitHub Actions deployment reloads PM2 process `aahii`.

`ecosystem.config.js` also exists, but it names the PM2 app `agihf` and contains older deploy settings:

- path: `/var/www/AAHII`
- repo: `https://github.com/insight-edge-dev/aahii.git`
- post-deploy: `npm install && npm run build && pm2 startOrRestart ecosystem.config.js`

This mismatch between `aahii` and `agihf`, and between `/var/www/aahii` and `/var/www/AAHII`, should be manually verified before relying on `ecosystem.config.js`.

## Required Environment Variables

App/runtime:

- `DATABASE_URL`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_SITE_URL` for news metadata fallback control

Admin seed:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Development-only:

- `ADMIN_DEV_BYPASS=true` can bypass admin auth in development.

GitHub Actions deployment secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`

## Deployment Notes

- Migrations are intentionally excluded from deploy.
- Database schema work needs a separate reviewed runbook due to the Prisma migration history gap.
- Production deployment success is recorded in the initial changelog milestone, but exact production URL and PM2 state need manual verification.
