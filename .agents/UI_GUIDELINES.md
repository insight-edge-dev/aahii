# UI Guidelines

## Existing Design Patterns

AAHII uses Tailwind utility classes with a government/institutional visual style:

- White backgrounds and slate text
- Blue as primary navigation/accent color
- Clean cards, tables, and content sections
- Institutional imagery from `public/`
- Lucide icons in admin/navigation contexts
- Framer Motion for selective transitions
- Swiper/carousel behavior for image-heavy sections

Global defaults:

- `body` uses `bg-white text-slate-900 antialiased`.
- CSS variable `--nav-blue` is `#2B6CF5`.
- Root font is Google Inter.

## Responsive Guidelines

- Preserve mobile-first behavior.
- Verify navigation, dropdowns, marquee sections, footer logos, and admin tables on small screens.
- Existing CSS includes mobile adjustments for press/footer marquees.
- Avoid layout shifts in public hero, navbar, footer, and CMS tables.

## Existing UI Conventions

- Public pages use shared layout components:
  - `Navbar`
  - `Breadcrumb`
  - `PopupBanner`
  - `ScrollToTop`
  - `Footer`
- Public content often uses local static assets from `public/`.
- Admin pages use a sticky left sidebar and top header.
- Admin module links use gradient blue active states and Lucide icons.
- Forms and tables live in feature-specific admin component folders.

## Components Not To Redesign Without Approval

- `src/components/layout/Navbar.tsx`
- `src/components/layout/MainNav.tsx`
- `src/components/layout/BrandingBar.tsx`
- `src/components/footer/Footer.tsx`
- `src/lib/features/admin/components/Sidebar.tsx`
- `src/lib/features/admin/components/Header.tsx`
- Public home hero/gallery sections
- Vendor registration workflow UI
- Admin CMS tables/forms

## Accessibility / UX Notes

- Keep public pages readable and institutionally restrained.
- Maintain keyboard-accessible buttons and links.
- Respect reduced-motion behavior already present for marquee animations.
- Do not replace inspectable institutional imagery with abstract decorative graphics.

## Pending UI Areas

- Current working tree indicates active edits in navbar/branding and vacancies page. Treat those as user work and do not overwrite without explicit instruction.
- Mobile dropdown/login behavior may have been under recent test based on temporary screenshot artifacts. Needs Verification.
