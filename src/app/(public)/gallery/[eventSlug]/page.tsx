"use client";

import Image from "next/image";
import { eventsData } from "@/content/events";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import {
  GalleryEvent,
  normalizeGalleryEvent,
  normalizeGalleryEvents,
} from "../gallery-normalize";

const legacyGalleryEvents = normalizeGalleryEvents(eventsData);

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.eventSlug?.toString().toLowerCase();

  const [event, setEvent] = useState<GalleryEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchEvent = async () => {
      const legacyEvent =
        legacyGalleryEvents.find((item) => item.slug.toLowerCase() === slug) ??
        null;

      try {
        const res = await fetch(`/api/events/${slug}`);
        const json = await res.json();
        const apiEvent = json?.success ? normalizeGalleryEvent(json.data) : null;

        setEvent(apiEvent ?? legacyEvent);
      } catch {
        setEvent(legacyEvent);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  const images = event?.images ?? [];

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  // Keyboard support
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, next, prev]);

  // Swipe support
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

  if (loading) return <p className="p-6">Loading...</p>;
  if (!event) return <p className="p-6">Event not found</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {event.title}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {images.length} photos
        </p>
      </div>

      {/* Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => {
              setIndex(i);
              setZoom(1);
              setOpen(true);
            }}
            className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-100"
          >
            <Image
              src={img.fileUrl}
              alt={`${event.title} ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition"
            />
          </button>
        ))}
      </section>

      {/* Lightbox */}
      {open && images[index] && (
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
            {index + 1} / {images.length}
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
              src={images[index].fileUrl}
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
