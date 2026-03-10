"use client";

import Image from "next/image";
import { pressData } from "@/content/press";
import { pressLogos } from "@/content/pressLogos";
import NewsCard from "../news/NewsCard";
import NewsGrid from "../news/NewsGrid";
import NewsList from "../news/NewsList";

export default function PressAndMedia() {
  /* ================= Latest 4 News ================= */
  const latestNews = [...pressData]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 4);

  return (
    <section className="bg-white py-20">
      {/* ✅ SINGLE container (IMPORTANT) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* ================= Header ================= */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0f2a6d] mb-4">
            Featured in Leading Publications
          </h2>

          <p className="text-gray-600">
            Coverage highlighting our vision, research impact, and national
            relevance in the healthcare sector.
          </p>
        </div>

        {/* ================= Logos Marquee ================= */}
        <div className="relative overflow-hidden py-5 border-y border-gray-100 mb-24">
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="press-marquee flex items-center gap-12 md:gap-20">
            {[...pressLogos, ...pressLogos].map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center
                  min-w-[96px] sm:min-w-[130px] md:min-w-[160px] lg:min-w-[180px]
                  opacity-70 hover:opacity-100 transition-opacity
                "
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={140}
                  height={48}
                  className="
                    object-contain
                    w-[64px] sm:w-[90px] md:w-[120px] lg:w-[140px]
                    h-auto grayscale hover:grayscale-0 transition
                  "
                />
              </a>
            ))}
          </div>
        </div>

        {/* ================= Latest News ================= */}
        <div className="relative">
          {/* Heading */}
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[#0f2a6d] mb-10">
            Latest News
          </h3>

          {/* News Grid */}
          {/* Mobile */}
          <div className="md:hidden">
            <NewsList articles={latestNews} />
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <NewsGrid articles={latestNews}  />
          </div>
        </div>
      </div>
    </section>
  );
}
