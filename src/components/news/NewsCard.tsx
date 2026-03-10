"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { PressItem } from "@/content/press";

interface Props {
  article: PressItem;
}

export default function NewsCard({ article }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 15 });
  const springY = useSpring(y, { stiffness: 120, damping: 15 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    x.set((e.clientX - rect.left - centerX) / 25);
    y.set((e.clientY - rect.top - centerY) / 25);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.article
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="
        group relative w-full
        max-w-sm
        rounded-xl md:rounded-2xl
        bg-white overflow-hidden
        border border-neutral-200
        shadow-sm md:shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
        transition-all duration-500
      "
    >
      {/* Gradient Border Effect */}
      <div
        className="
          absolute inset-0 rounded-xl md:rounded-2xl
          pointer-events-none opacity-0
          group-hover:opacity-100
          transition duration-500
        "
      >
        <div
          className="
            absolute inset-0 rounded-xl md:rounded-2xl
            border border-transparent
            bg-gradient-to-r
            from-blue-500/20 via-indigo-500/20 to-blue-500/20
          "
        />
      </div>

      <a href={article.link} target="_blank" rel="noopener noreferrer">
        {/* IMAGE */}
        <div className="relative h-28 sm:h-32 md:h-56 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70" />
        </div>

        {/* CONTENT */}
        <div className="p-3 sm:p-4 md:p-5 space-y-2 md:space-y-4 relative">
          {/* Source + Date */}
          <div className="flex justify-between items-center text-[10px] md:text-xs">
            <span
              className="
                px-2 py-[2px] md:px-3 md:py-1
                rounded-full bg-blue-50 text-blue-700
                font-semibold uppercase tracking-wide
                truncate max-w-[60%]
              "
            >
              {article.source}
            </span>

            <span
              className="
                px-1.5 py-[2px] md:px-2 md:py-1
                rounded-md bg-neutral-100
                text-neutral-600 font-medium
                whitespace-nowrap
              "
            >
              {article.publishedAt}
            </span>
          </div>

          {/* TITLE */}
          <h3
            className="
              text-[13px] sm:text-[14px] md:text-[17px]
              leading-snug font-semibold
              text-neutral-900
              group-hover:text-blue-700
              transition-colors
              line-clamp-2
            "
          >
            {article.title}
          </h3>

          {/* EXCERPT */}
          <p
            className="
              hidden sm:block
              text-xs md:text-sm
              text-neutral-600
              line-clamp-2 md:line-clamp-3
            "
          >
            {article.excerpt}
          </p>

          {/* CTA */}
          <div
            className="
              inline-flex items-center gap-1 md:gap-2
              text-[11px] md:text-sm
              font-semibold text-blue-700
              transition-all duration-300
            "
          >
            Read
            <ArrowUpRight size={14} className="md:w-4 md:h-4" />
          </div>

          {/* Bottom Accent Line ✅ FIXED */}
          <div
            className="
              absolute bottom-0 left-0 h-[2px] w-0
              bg-blue-600
              group-hover:w-full
              transition-all duration-500
            "
          />
        </div>
      </a>
    </motion.article>
  );
}