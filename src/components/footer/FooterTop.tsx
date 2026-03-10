import Link from "next/link";

/* -------------------- Types -------------------- */
type FooterLink = {
  label: string;
  href: string;
};

type FooterLinksProps = {
  title: string;
  links: FooterLink[];
};

/* -------------------- Data -------------------- */
const IMPORTANT_LINKS: FooterLink[] = [
  { label: "News", href: "/news" },
  { label: "Research & Development", href: "/research-development" },
  { label: "FAQs", href: "/faq" },
  { label: "Vision & Mission", href: "/about-us/vision-mission" },
  { label: "Contact Us", href: "/contact-us" },
];

const QUICK_LINKS: FooterLink[] = [
  { label: "Departments", href: "/departments" },
  { label: "Our Team", href: "/about-us/management-team" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "Vacancies", href: "careers/vacancies" },
  { label: "Gallery", href: "/gallery" },
];

/* -------------------- Component -------------------- */
export default function FooterTop() {
  return (
    <section className="relative bg-(--nav-blue) text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Contact Us
              <span className="absolute left-0 -bottom-1 h-0.5 w-10 bg-white/70"></span>
            </h3>

            <p className="text-sm leading-7 text-white/90">
              Registered Office:<br />
              Room No. 505–508, 5th Floor, <br />
              IIT Guwahati Research Park, Amingaon,<br />
              Guwahati – 781039, Assam, India
            </p>

            <p className="mt-4 text-sm">
              Email:&nbsp;
              <a
                href="mailto:info@agihf.org"
                className="relative inline-block group"
              >
                <span className="transition group-hover:text-white">
                  info@agihf.org
                </span>
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </p>
          </div>

          {/* IMPORTANT LINKS */}
          <FooterLinks title="Important Links" links={IMPORTANT_LINKS} />

          {/* QUICK LINKS */}
          <FooterLinks title="Quick Links" links={QUICK_LINKS} />

          {/* MAP */}
          <div className="group relative h-60 sm:h-72 rounded-xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md shadow-xl">
            {/* Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/40 via-transparent to-black/30 opacity-60 group-hover:opacity-30 transition-opacity" />

            {/* Map */}
            <iframe
              className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=5MMP+FV7, Amingaon, Guwahati, Assam 781039, India&output=embed"
            />

            {/* Label */}
            <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur">
              Our Location
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* -------------------- Reusable Footer Links -------------------- */
function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 relative inline-block">
        {title}
        <span className="absolute left-0 -bottom-1 h-px w-8 bg-white/60"></span>
      </h3>

      <ul className="space-y-3 text-sm">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="group flex items-center gap-2 text-white/80 transition-all hover:text-white"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                »
              </span>
              <span className="relative">
                {label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
