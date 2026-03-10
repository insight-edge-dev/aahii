"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { eventsData } from "@/content/events";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.eventSlug?.toString().toLowerCase();

  const event = eventsData.find(
    (e) => e.slug.toLowerCase() === slug
  );

  if (!event) notFound();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const touchStartX = useRef<number | null>(null);

  const prev = () =>
    setIndex((i) => (i === 0 ? event.images.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === event.images.length - 1 ? 0 : i + 1));

  // ⌨️ Keyboard support
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // 👉 Swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff =
      touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) next();
    if (diff < -50) prev();

    touchStartX.current = null;
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {event.title}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {event.images.length} photos
        </p>
      </div>

      {/* Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {event.images.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              setZoom(1);
              setOpen(true);
            }}
            className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
          >
            <Image
              src={img}
              alt={`${event.title} ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition"
            />
          </button>
        ))}
      </section>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={32} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-5 text-white text-sm">
            {index + 1} / {event.images.length}
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            <button
              onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
              className="text-white"
            >
              <ZoomOut />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
              className="text-white"
            >
              <ZoomIn />
            </button>
          </div>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-5 text-white"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image */}
          <div className="relative w-[90vw] h-[80vh] overflow-hidden">
            <Image
              src={event.images[index]}
              alt={`${event.title} image ${index + 1}`}
              fill
              className="object-contain transition-transform"
              style={{ transform: `scale(${zoom})` }}
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-5 text-white"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </main>
  );
}
