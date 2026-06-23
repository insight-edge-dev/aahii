# Admin Panel

## Admin Authentication Flow

Admin auth is JWT-cookie based.

Flow:

1. Admin submits credentials to `/api/admin/auth/login`.
2. `loginAdmin` validates credentials through `src/lib/features/auth/services/auth.service.ts`.
3. JWT is signed with `JWT_SECRET` using `src/lib/jwt.ts`.
4. Response sets `admin_token` as an HTTP-only cookie.
5. Admin layout and admin APIs call `requireAdmin` from `src/lib/adminAuth.ts`.
6. Logout posts to `/api/admin/auth/logout`, which clears `admin_token`.
7. Current admin info is read from `/api/admin/auth/me`.

Token details:

- Issuer: `aahii-admin`
- Algorithm: `HS256`
- Expiry: `1d`
- Payload includes `adminId` and `role`.

Development bypass:

- If `NODE_ENV=development` and `ADMIN_DEV_BYPASS=true`, `requireAdmin` returns a synthetic `SUPER_ADMIN`.

## Admin Routes

Admin pages exist under `src/app/admin`:

- `/admin`
- `/admin/vendors`
- `/admin/vendors/[id]`
- `/admin/tenders`
- `/admin/news`
- `/admin/news/new`
- `/admin/news/[newsId]`
- `/admin/announcements`
- `/admin/announcements/new`
- `/admin/announcements/[announcementId]`
- `/admin/vacancies`
- `/admin/vacancies/new`
- `/admin/vacancies/[vacancyId]`
- `/admin/events`
- `/admin/events/[id]`
- `/admin/logout`

Login route behavior is split:

- Public login page exists at `src/app/login/page.tsx`.
- Admin layout checks whether the current path includes `/login`, but this detection uses `x-invoke-path`; verify behavior before changing auth routing.
- Legacy/alternate API route `/api/admin/login` also exists. Needs Verification.

## CMS Modules

Admin sidebar modules:

- Dashboard
- Vendors
- Tenders
- News
- Announcements
- Vacancies
- Events

Additional admin API support exists for videos, although no admin sidebar page was found for videos.

## Content Management Workflow

Typical workflow:

1. Admin logs in.
2. Admin navigates to a CMS module.
3. Client components call `/api/admin/*` using the shared Axios client.
4. API routes enforce `requireAdmin([ADMIN, SUPER_ADMIN])` where needed.
5. Services validate input and mutate Prisma models.
6. Upload-backed modules use Cloudinary public IDs for cleanup/update.

## Admin UI Shell

- Sidebar: `src/lib/features/admin/components/Sidebar.tsx`
- Header: `src/lib/features/admin/components/Header.tsx`
- Layout: `src/app/admin/layout.tsx`
- Toasts: `react-hot-toast`
- Icons: `lucide-react`
- Motion: `framer-motion`

Do not redesign the admin shell without approval.
