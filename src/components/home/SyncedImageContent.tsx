"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sliderData } from "@/content/homeslider";
import { motion, type Variants  } from "framer-motion";

const INTERVAL_MS = 4000;

export default function SyncedImageContent() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === sliderData.length - 1 ? 0 : prev + 1
      );
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);
const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true,  amount: 0.2 }}
      variants={sectionReveal}
      className="w-full bg-white py-6 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0f2a6d] mb-6">
            Healthcare Reimagined for the Future
          </h2>

          <p className="text-[15px] leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Where research, collaboration, and innovation converge to shape the
            next generation of healthcare delivery for India and the world.
          </p>

          <a
            href="https://agihf.org/niramaya/"
            className="inline-block mt-8 text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition"
          >
            Explore Our Vision →
          </a>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* LEFT: IMAGE */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg bg-gray-100">
              {sliderData.map((item, index) => (
                <Image
                  key={item.image}
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  className={`absolute inset-0 object-cover transition-opacity duration-500 ease-in-out ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: CONTENT (FIXED HEIGHT, NO LAYOUT SHIFT) */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-[420px] sm:h-[460px] lg:h-[480px] overflow-hidden">
              {sliderData.map((item, index) => (
                <div
                  key={item.title}
                  aria-hidden={index !== activeIndex}
                  className={`absolute inset-0 flex transition-all duration-500 ease-in-out ${
                    index === activeIndex
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  {/* CARD */}
                  <div className="relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-[0_20px_50px_rgba(15,42,109,0.12)] px-6 py-10 sm:px-8 sm:py-10">
                    {/* LEFT ACCENT */}
                    <span className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-blue-600/80" />

                    {/* LABEL */}
                    <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4">
                      {item.label}
                    </p>

                    {/* TITLE */}
                    <h3 className="text-xl md:text-2xl font-bold text-[#0f2a6d] mb-4 leading-snug">
                      {item.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-slate-600 leading-relaxed mb-6 max-w-xl">
                      {item.description}
                    </p>

                    {/* AUTHOR */}
                    {item.author && (
                      <div className="mt-6 pt-4 border-t border-slate-200">
                        <p className="font-semibold text-slate-800">
                          {item.author}
                        </p>
                        <p className="text-sm text-slate-500 italic">
                          {item.designation}
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    {item.cta && (
                      <Link
                        href={item.cta.href}
                        className="inline-flex items-center mt-6 rounded-lg border border-blue-600 px-6 py-3 text-blue-600 font-semibold transition hover:bg-blue-600 hover:text-white"
                      >
                        {item.cta.text}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
