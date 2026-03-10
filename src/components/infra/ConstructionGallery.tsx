"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";

/* ================= TYPES ================= */
type TabType = "onSite" | "concept";

/* ================= TABS ================= */
const TABS: { id: TabType; label: string }[] = [
  { id: "onSite", label: "On-site Development" },
  { id: "concept", label: "Concept Plan" },
];

/* ================= IMAGES ================= */
const IMAGE_MAP: Record<TabType, string[]> = {
  onSite: [
    "/construction/1.jpg",
    "/construction/2.jpg",
    "/construction/3.jpg",
    "/construction/4.jpg",
    "/construction/5.jpg",
    "/construction/6.jpg",
    "/construction/7.jpg",
    "/construction/8.jpg",
  ],

  // ❗ Concept planning intentionally EMPTY
  concept: [
        "/concept/1.png",
        "/concept/2.png",
        "/concept/3.png",
        "/concept/4.png",
        "/concept/5.jpg",
        "/concept/6.png",
  ],
};

export default function ConstructionGallery() {
  const [activeTab, setActiveTab] = useState<TabType>("onSite");
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const allImages = IMAGE_MAP[activeTab];
  const previewImages = allImages.slice(0, 5);

  /* ================= KEYBOARD ================= */
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % allImages.length
        );
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + allImages.length) % allImages.length
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, allImages.length]);

  return (
    <>
      {/* ================= SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-blue-600 mb-2">
              Milestones & Updates
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Construction Progress
            </h2>

            <p className="max-w-xl text-gray-600 text-sm sm:text-base">
              From concept planning to on-site execution — tracked transparently.
            </p>
          </div>

          {/* Expand / Collapse */}
          {allImages.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition"
            >
              <span className="hidden sm:inline">
                {expanded ? "Collapse Gallery" : "View Gallery"}
              </span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* ================= TABS ================= */}
        <div className="flex gap-6 border-b mb-8 text-sm font-medium">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setExpanded(false);
                setActiveIndex(null);
              }}
              className={`pb-3 transition ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        {allImages.length === 0 ? (
          /* ===== EMPTY STATE ===== */
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-gray-50">
            <p className="text-sm uppercase tracking-widest text-blue-600 mb-3">
              Concept Planning
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Designs Coming Soon
            </h3>

            <p className="max-w-md text-gray-500 text-sm">
              Architectural concepts and planning visuals will be shared here
              once finalized.
            </p>
          </div>
        ) : !expanded ? (
          /* ===== BENTO PREVIEW ===== */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveIndex(0)}
              className="relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden aspect-[16/11] bg-gray-100 cursor-pointer"
            >
              <Image
                src={previewImages[0]}
                alt=""
                fill
                priority
                className="object-cover"
              />
            </div>

            {previewImages.slice(1).map((src, i) => (
              <div
                key={src}
                onClick={() => setActiveIndex(i + 1)}
                className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer"
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          /* ===== EXPANDED GRID ===== */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allImages.map((src, i) => (
              <div
                key={src}
                onClick={() => setActiveIndex(i)}
                className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] cursor-pointer"
              >
                <Image
                  src={src}
                  alt=""
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
          <button
            className="absolute top-5 right-5 text-white"
            onClick={() => setActiveIndex(null)}
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative w-full max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[activeIndex]}
              alt="Fullscreen preview"
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
