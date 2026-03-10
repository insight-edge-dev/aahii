"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isHomePage = segments.length === 0;

  // Hide breadcrumb on homepage
  if (isHomePage) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-white border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5">
        <ol
          className="
            flex items-center gap-1
            overflow-x-auto whitespace-nowrap
            text-[11px] sm:text-xs
            text-slate-600
          "
        >
          {/* Home */}
          <li className="flex items-center">
            <Link
              href="/"
              aria-label="Home"
              className="
                p-1.5 rounded
                text-blue-700
                hover:bg-blue-50
                transition
              "
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
          </li>

          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const isLast = index === segments.length - 1;

            const label = segment
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <li key={href} className="flex items-center">
                {/* Separator */}
                <span className="mx-1 text-slate-400 select-none">/</span>

                {isLast ? (
                  <span
                    aria-current="page"
                    className="
                      px-2 py-0.5 rounded
                      font-medium
                      text-blue-700
                      bg-blue-50
                    "
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="
                      px-2 py-0.5 rounded
                      font-medium
                      text-blue-700
                      hover:bg-blue-50
                      transition
                    "
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
