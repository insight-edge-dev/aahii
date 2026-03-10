"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";

interface GallerySectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  images: string[];
}

export default function GallerySection({
  title,
  subtitle,
  description,
  images,
}: GallerySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const previewImages = images.slice(0, 5);

  /* ================= KEYBOARD SUPPORT ================= */
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % images.length
        );
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, images.length]);

  return (
    <>
      {/* ================= SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        {/* ================= HEADER ================= */}
        <div className="mb-10">
          {/* Title row */}
          <div className="flex items-center justify-between gap-4">
            <div>
              {subtitle && (
                <p className="text-xs tracking-widest uppercase text-blue-600 mb-1">
                  {subtitle}
                </p>
              )}

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {title}
              </h2>
            </div>

            {images.length > 0 && (
              <button
                onClick={() => setExpanded(!expanded)}
                aria-label={expanded ? "Collapse gallery" : "Expand gallery"}
                className="flex items-center justify-center shrink-0 text-blue-700 hover:text-blue-800 transition"
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="max-w-xl text-gray-600 text-sm sm:text-base mt-3">
              {description}
            </p>
          )}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Visuals Coming Soon
            </h3>
            <p className="text-gray-500 text-sm max-w-md">
              This section will be updated once official visuals are finalized.
            </p>
          </div>
        ) : !expanded ? (
          /* ================= PREVIEW GRID ================= */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Big image */}
            <div
              onClick={() => setActiveIndex(0)}
              className="relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden aspect-[16/11] bg-gray-100 cursor-pointer"
            >
              <Image
                src={previewImages[0]}
                alt={title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Small images */}
            {previewImages.slice(1).map((src, i) => (
              <div
                key={src}
                onClick={() => setActiveIndex(i + 1)}
                className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer"
              >
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          /* ================= EXPANDED GRID ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div
                key={src}
                onClick={() => setActiveIndex(i)}
                className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] cursor-pointer"
              >
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-cover transition hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= MODAL ================= */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center px-4"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close button */}
          <button
            aria-label="Close preview"
            className="absolute top-5 right-5 text-white"
            onClick={() => setActiveIndex(null)}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} preview`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}