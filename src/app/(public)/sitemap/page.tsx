import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { sitemapSections } from "@/content/sitemap";

export const metadata: Metadata = {
  title: "Sitemap | AGIHF",
  description:
    "Browse all sections of the Assam Government IIT-G Healthcare Foundation (AGIHF) website, including departments, research, careers, news, and institutional pages.",
  alternates: {
    canonical: "/sitemap",
  },
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--nav-blue)">
            Navigation
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Sitemap
          </h1>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-gray-600 max-w-2xl">
            Browse all sections of the Assam Government IIT-G Healthcare
            Foundation website.
          </p>
        </div>

        {/* SECTIONS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitemapSections.map((section) => {
            const Icon = section.icon;
            const hasLinks = Boolean(section.links?.length);

            return (
              <div
                key={section.title}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-(--nav-blue)">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>

                  {section.href ? (
                    <Link
                      href={section.href}
                      className="text-lg font-semibold text-gray-900 hover:text-(--nav-blue) transition"
                    >
                      {section.title}
                    </Link>
                  ) : (
                    <h2 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h2>
                  )}
                </div>

                {hasLinks ? (
                  <ul className="space-y-2">
                    {section.links!.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-(--nav-blue) transition"
                        >
                          <ChevronRight
                            className="size-3.5 text-gray-400"
                            aria-hidden="true"
                          />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : section.href ? (
                  <Link
                    href={section.href}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-(--nav-blue) transition"
                  >
                    Visit page
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
