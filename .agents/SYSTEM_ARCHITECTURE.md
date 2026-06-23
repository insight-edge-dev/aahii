# System Architecture

## Application Shape

AAHII is a Next.js App Router application. Routes are split between public pages, admin pages, and API routes:

- Public route group: `src/app/(public)`
- Admin pages: `src/app/admin`
- API route handlers: `src/app/api`
- Global layout: `src/app/layout.tsx`
- Public layout: `src/app/(public)/layout.tsx`
- Admin layout: `src/app/admin/layout.tsx`

## App Router Structure

The public layout renders:

- `Navbar`
- `Breadcrumb`
- `PopupBanner`
- page content inside `main#main-content`
- `ScrollToTop`
- `Footer`

Public pages include home, about, departments, research, infrastructure, gallery, news, tenders, vacancies, videos, legal pages, contact, FAQ, and vendor registration.

The admin layout renders a protected workspace with:

- `Sidebar`
- `Header`
- `react-hot-toast` toaster
- child admin pages

## API Routes

Public API routes include:

- `GET /api/news`, `/api/news/latest`, `/api/news/[slug]`
- `GET /api/events`, `/api/events/[slug]`
- `GET /api/announcements/latest`
- `GET /api/tenders`, `/api/tenders/documents/[documentId]`
- `GET /api/vacancies`
- `GET /api/videos`
- `POST /api/vendors/register`

Admin API routes include:

- Auth: `/api/admin/auth/login`, `/api/admin/auth/logout`, `/api/admin/auth/me`, `/api/admin/auth/password`
- Legacy/duplicate login route present: `/api/admin/login`
- CMS: `/api/admin/news`, `/api/admin/tenders`, `/api/admin/vacancies`, `/api/admin/announcements`, `/api/admin/events`, `/api/admin/vendors`, `/api/admin/videos`
- Vendor review actions: approve/reject endpoints
- Event image management: `/api/admin/events/[eventId]/images`

## Feature Layer

Business/data access logic is mostly organized under `src/lib/features/*`:

- `auth`
- `vendor-registration`
- `news`
- `tenders`
- `vacancies`
- `announcements`
- `events`
- `videos`
- `admin`

Feature folders commonly contain services, validations, API wrappers, hooks, and UI components.

## Data Flow

Typical public flow:

1. Public page renders through App Router.
2. Page or client component calls public API route or imports static content.
3. API route delegates to a feature service.
4. Service uses Prisma or external services.
5. Response returns JSON or renders page data.

Typical admin flow:

1. Admin user logs in through admin auth API.
2. Server sets `admin_token` HTTP-only cookie.
3. Admin layout checks cookie and calls `requireAdmin`.
4. Admin pages/components call `/api/admin/*` through the shared Axios instance.
5. API routes validate admin access, then call feature services.
6. Services use Prisma and Cloudinary where needed.

## Important Architecture Notes

- Prisma client is centralized in `src/lib/prisma.ts` and cached globally in development.
- JWT helpers are centralized in `src/lib/jwt.ts`.
- Admin authorization is centralized in `src/lib/adminAuth.ts`.
- Cloudinary configuration is centralized in `src/lib/cloudinary.ts`.
- Several API routes set `runtime = "nodejs"` where cookies, Prisma, or uploads require Node runtime.
