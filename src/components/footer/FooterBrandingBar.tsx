import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const SOCIALS = [
  {
    label: "Twitter / X",
    href: "https://x.com/AssamIitg78651",
    Icon: Twitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/assam-government-iitg-healthcare-foundation/",
    Icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/agihf.web?igsh=MWQ1ZXpqNzEzbmxjcQ==/",
    Icon: Youtube,
  },
];

export default function FooterBrandingBar() {
  return (
    <section className="bg-(--nav-blue)">
      <div className="max-w-7xl mx-auto bg-[#e9eff8] border-t border-[#1d2f57]/20">
        <div className="px-6 sm:px-10 py-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="relative h-22 w-22 rounded-full shrink-0">
                <Image
                  src="/logos/aahii-logo.png"
                  alt="AAHII Logo"
                  fill
                  priority
                  className="object-contain scale-110 transition-transform duration-300 hover:scale-115"
                />
              </div>

              <div className="leading-tight">
                <div className="flex items-center gap-1">
                  <span className="text-2xl sm:text-[28px] font-bold text-[#1d2f57]">
                    AAHII
                  </span>
                  <span className="w-2 h-2 bg-orange-500 rounded-full translate-y-0.5" />
                </div>

                <p className="text-xs sm:text-[13px] font-semibold text-[#1d2f57] tracking-wide">
                  Assam Advanced Healthcare Innovation Institute
                </p>

                <p className="text-[11px] text-orange-600">
                
                </p>
              </div>
            </div>

            {/* RIGHT: SOCIAL ICONS */}
            <div className="flex flex-wrap items-center gap-3 justify-start md:justify-end">
              {SOCIALS.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    group relative flex h-9 w-9 items-center justify-center rounded-full
                    bg-white text-[#1d2f57]
                    border border-[#1d2f57]/20
                    transition-all duration-300 ease-out
                    hover:bg-(--nav-blue) hover:text-white hover:scale-110
                    focus:outline-none focus:ring-2 focus:ring-[#1d2f57]
                    focus:ring-offset-2 focus:ring-offset-[#e9eff8]
                  "
                >
                  {/* Brand glow */}
                  <span
                    className="
                      absolute inset-0 rounded-full
                      bg-[#1d2f57]/40 blur-md opacity-0
                      transition-opacity duration-300
                      group-hover:opacity-30
                    "
                  />

                  <Icon size={18} className="relative z-10" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
