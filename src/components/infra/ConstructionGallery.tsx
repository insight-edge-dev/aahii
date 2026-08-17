"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, ImageOff, X } from "lucide-react";

type TabType = "onSite" | "concept";
type InfrastructureCategory = "ON_SITE_DEVELOPMENT" | "CONCEPT_PLAN";

type InfrastructureImage = {
  id: string;
  category: InfrastructureCategory;
  imageUrl: string;
  caption: string | null;
  altText: string | null;
  sortOrder: number;
  isFeatured: boolean;
};

type GalleryData = Record<TabType, InfrastructureImage[]>;

const TABS: { id: TabType; label: string }[] = [
  { id: "onSite", label: "On-site Development" },
  { id: "concept", label: "Concept Plan" },
];

const EMPTY_GALLERY: GalleryData = { onSite: [], concept: [] };

function isInfrastructureImage(value: unknown): value is InfrastructureImage {
  if (!value || typeof value !== "object") return false;
  const image = value as Partial<InfrastructureImage>;

  return (
    typeof image.id === "string" &&
    (image.category === "ON_SITE_DEVELOPMENT" ||
      image.category === "CONCEPT_PLAN") &&
    typeof image.imageUrl === "string" &&
    image.imageUrl.length > 0 &&
    typeof image.sortOrder === "number" &&
    typeof image.isFeatured === "boolean"
  );
}

function GalleryImage({
  image,
  className,
  priority = false,
  sizes,
}: {
  image: InfrastructureImage;
  className: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
        <ImageOff aria-hidden="true" className="h-7 w-7" />
        <span className="sr-only">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      alt={image.altText || image.caption || "Construction progress update"}
      className={className}
      fill
      onError={() => setFailed(true)}
      priority={priority}
      sizes={sizes}
      src={image.imageUrl}
    />
  );
}

export default function ConstructionGallery() {
  const [activeTab, setActiveTab] = useState<TabType>("onSite");
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gallery, setGallery] = useState<GalleryData>(EMPTY_GALLERY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadInfrastructure() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch("/api/infrastructure", {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load infrastructure updates");
        }

        const payload = (await response.json()) as {
          success?: boolean;
          data?: Record<InfrastructureCategory, unknown>;
        };
        const onSite = payload.data?.ON_SITE_DEVELOPMENT;
        const concept = payload.data?.CONCEPT_PLAN;

        if (
          payload.success !== true ||
          !Array.isArray(onSite) ||
          !Array.isArray(concept) ||
          !onSite.every(isInfrastructureImage) ||
          !concept.every(isInfrastructureImage)
        ) {
          throw new Error("Invalid infrastructure response");
        }

        setGallery({ onSite, concept });
      } catch {
        if (controller.signal.aborted) return;

        setGallery(EMPTY_GALLERY);
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadInfrastructure();
    return () => controller.abort();
  }, []);

  const allImages = useMemo(
    () =>
      [...gallery[activeTab]].sort((first, second) => {
        if (first.isFeatured !== second.isFeatured) {
          return first.isFeatured ? -1 : 1;
        }
        return first.sortOrder - second.sortOrder;
      }),
    [activeTab, gallery],
  );
  const previewImages = allImages.slice(0, 5);

  useEffect(() => {
    if (activeIndex === null || allImages.length === 0) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);

      if (event.key === "ArrowRight") {
        setActiveIndex((previous) =>
          previous === null ? 0 : (previous + 1) % allImages.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((previous) =>
          previous === null
            ? 0
            : (previous - 1 + allImages.length) % allImages.length,
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, allImages.length]);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-20">
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

          {!loading && !error && allImages.length > 0 && (
            <button
              aria-expanded={expanded}
              className="flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition"
              onClick={() => setExpanded(!expanded)}
              type="button"
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

        <div className="flex gap-6 border-b mb-8 text-sm font-medium">
          {TABS.map((tab) => (
            <button
              className={`pb-3 transition ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setExpanded(false);
                setActiveIndex(null);
              }}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div
            aria-label="Loading construction updates"
            className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-4"
          >
            <div className="aspect-[16/11] rounded-xl bg-gray-100 md:col-span-2 md:row-span-2" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="aspect-[4/3] rounded-xl bg-gray-100"
                key={index}
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border bg-gray-50 px-6 py-12 text-center text-sm text-gray-600">
            Construction updates are temporarily unavailable.
          </div>
        ) : allImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-gray-50">
            <p className="text-sm uppercase tracking-widest text-blue-600 mb-3">
              {activeTab === "concept" ? "Concept Planning" : "On-site Development"}
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Updates Coming Soon
            </h3>
            <p className="max-w-md text-gray-500 text-sm">
              New construction visuals will be shared here once they are available.
            </p>
          </div>
        ) : !expanded ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              aria-label={`Open ${previewImages[0].altText || "featured construction image"}`}
              className="relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden aspect-[16/11] bg-gray-100 cursor-pointer"
              onClick={() => setActiveIndex(0)}
              type="button"
            >
              <GalleryImage
                className="object-cover"
                image={previewImages[0]}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </button>

            {previewImages.slice(1).map((image, index) => (
              <button
                aria-label={`Open ${image.altText || "construction image"}`}
                className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer"
                key={image.id}
                onClick={() => setActiveIndex(index + 1)}
                type="button"
              >
                <GalleryImage
                  className="object-cover"
                  image={image}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allImages.map((image, index) => (
              <button
                aria-label={`Open ${image.altText || "construction image"}`}
                className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] cursor-pointer"
                key={image.id}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <GalleryImage
                  className="object-cover transition hover:scale-105"
                  image={image}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {activeIndex !== null && allImages[activeIndex] ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center px-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
        >
          <button
            aria-label="Close preview"
            className="absolute top-5 right-5 text-white"
            onClick={() => setActiveIndex(null)}
            type="button"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative w-full max-w-6xl aspect-video"
            onClick={(event) => event.stopPropagation()}
          >
            <GalleryImage
              className="object-contain"
              image={allImages[activeIndex]}
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
