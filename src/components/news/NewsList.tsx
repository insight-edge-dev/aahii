"use client";

import Image from "next/image";
import { PressItem } from "@/content/press";
import { ArrowUpRight } from "lucide-react";

interface Props {
  articles: PressItem[];
}

export default function NewsList({ articles }: Props) {
  return (
    <div className="flex flex-col divide-y divide-neutral-200">
      {articles.map((article) => (
        <a
          key={article.id}
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            grid grid-cols-[60px_1fr]
            grid-rows-3
            gap-x-3 gap-y-[2px]
            py-2.5
            transition-colors
            hover:bg-neutral-50
          "
        >
          {/* ================= IMAGE ================= */}
          <div className="relative row-span-3 h-[60px] w-[60px] overflow-hidden rounded-md">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="60px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* ================= SOURCE + DATE ================= */}
          <div className="flex items-center justify-between text-[10px] leading-none">
            <span
              className="
                px-1.5 py-[1px]
                rounded-full
                bg-blue-50 text-blue-700
                font-semibold uppercase tracking-wide
                truncate max-w-[65%]
              "
            >
              {article.source}
            </span>

            <span
              className="
                px-1.5 py-[1px]
                rounded
                bg-neutral-100
                text-neutral-500
                font-medium
                whitespace-nowrap
              "
            >
              {article.publishedAt}
            </span>
          </div>

          {/* ================= HEADLINE ================= */}
          <h3
            className="
              text-[14px]
              font-semibold
              leading-[1.2]
              text-neutral-900
              line-clamp-2
              group-hover:text-blue-700
              transition-colors
            "
          >
            {article.title}
          </h3>

          {/* ================= DESCRIPTION + READ ================= */}
          <div className="flex items-center gap-2">
            <p className="text-[12px] text-neutral-600 line-clamp-1">
              {article.excerpt}
            </p>

            <span
              className="
                inline-flex items-center gap-1
                text-[12px]
                font-semibold
                text-blue-700
                whitespace-nowrap
                transition-all
                group-hover:gap-1.5
              "
            >
              Read
              <ArrowUpRight size={12} />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}