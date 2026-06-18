"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  priority?: boolean;
};

type LatestNewsResponse = {
  items: NewsItem[];
};

type LatestNewsTickerProps = {
  items?: NewsItem[];
  fetchLatest?: boolean;
  endpoint?: string;
  intervalMs?: number;
  className?: string;
};

const mockNewsItems: NewsItem[] = [
  {
    id: "mock-1",
    title: "Applications invited for July 2026 Session",
    slug: "applications-july-2026",
    category: "Admission",
    publishedAt: "2026-06-18",
    priority: true,
  },
  {
    id: "mock-2",
    title: "AGIHF announces upcoming healthcare innovation fellowship",
    slug: "healthcare-innovation-fellowship",
    category: "Fellowship",
    publishedAt: "2026-06-14",
  },
  {
    id: "mock-3",
    title: "New research facilities for translational medicine inaugurated",
    slug: "translational-medicine-research-facilities",
    category: "Research",
    publishedAt: "2026-06-10",
    priority: true,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 36 : -36,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -36 : 36,
    opacity: 0,
  }),
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function LatestNewsTicker({
  items = mockNewsItems,
  fetchLatest = false,
  endpoint = "/api/news/latest",
  intervalMs = 5000,
  className = "",
}: LatestNewsTickerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [newsItems, setNewsItems] = useState<NewsItem[]>(items);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(fetchLatest && items.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fetchLatest) {
      setNewsItems(items);
      setActiveIndex(0);
      return;
    }

    const controller = new AbortController();

    async function loadLatestNews() {
      setIsLoading(items.length === 0);
      setError(null);

      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Unable to load latest announcements.");
        }

        const data = (await response.json()) as LatestNewsResponse;
        setNewsItems(Array.isArray(data.items) ? data.items : []);
        setActiveIndex(0);
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === "AbortError") {
          return;
        }

        setError("Latest announcements are temporarily unavailable.");
      } finally {
        setIsLoading(false);
      }
    }

    loadLatestNews();

    return () => controller.abort();
  }, [endpoint, fetchLatest, items]);

  const hasItems = newsItems.length > 0;
  const hasMultipleItems = newsItems.length > 1;

  const activeItem = useMemo(() => {
    if (!hasItems) {
      return null;
    }

    return newsItems[activeIndex % newsItems.length];
  }, [activeIndex, hasItems, newsItems]);

  const goTo = useCallback(
    (nextIndex: number, nextDirection: number) => {
      if (!hasMultipleItems) {
        return;
      }

      setDirection(nextDirection);
      setActiveIndex((nextIndex + newsItems.length) % newsItems.length);
    },
    [hasMultipleItems, newsItems.length]
  );

  const showPrevious = useCallback(() => {
    goTo(activeIndex - 1, -1);
  }, [activeIndex, goTo]);

  const showNext = useCallback(() => {
    goTo(activeIndex + 1, 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || !hasMultipleItems) {
      return;
    }

    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((currentIndex) => (currentIndex + 1) % newsItems.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [hasMultipleItems, intervalMs, isPaused, newsItems.length]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  return (
    <section
      aria-label="Latest news and announcements"
      className={`w-full bg-white px-3 py-3 sm:px-4 ${className}`}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.08)] sm:min-h-14 sm:flex-row">
        <div className="flex shrink-0 items-center justify-center bg-[#C62828] px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-white sm:w-40 sm:py-0">
          Latest News
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3 sm:px-4">
          <div className="min-w-0 flex-1" aria-live="polite" aria-atomic="true">
            {isLoading ? (
              <TickerState message="Loading latest announcements..." />
            ) : error ? (
              <TickerState message={error} tone="error" />
            ) : !activeItem ? (
              <TickerState message="No announcements available." />
            ) : (
              <div className="relative min-h-10 overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeItem.id}
                    animate="center"
                    className="absolute inset-0 flex min-w-0 items-center"
                    custom={direction}
                    exit="exit"
                    initial="enter"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.34, ease: "easeOut" }
                    }
                    variants={slideVariants}
                  >
                    <Link
                      href={`/news/${activeItem.slug}`}
                      className="group flex min-w-0 items-center gap-2 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-[#C62828] focus-visible:ring-offset-2"
                    >
                      {activeItem.priority ? (
                        <span className="shrink-0 rounded-sm bg-[#C62828] px-2 py-0.5 text-[10px] font-bold leading-5 tracking-[0.08em] text-white">
                          NEW
                        </span>
                      ) : null}

                      <span className="min-w-0 truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-[#C62828] sm:text-base">
                        {activeItem.title}
                      </span>

                      <span className="hidden shrink-0 text-xs font-medium text-slate-500 md:inline">
                        {activeItem.category} | {formatDate(activeItem.publishedAt)}
                      </span>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Show previous announcement"
              className="inline-flex size-9 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-700 transition hover:border-[#C62828] hover:text-[#C62828] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C62828] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!hasMultipleItems || isLoading}
              onClick={showPrevious}
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>

            <button
              type="button"
              aria-label="Show next announcement"
              className="inline-flex size-9 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-700 transition hover:border-[#C62828] hover:text-[#C62828] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C62828] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!hasMultipleItems || isLoading}
              onClick={showNext}
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TickerState({
  message,
  tone = "muted",
}: {
  message: string;
  tone?: "muted" | "error";
}) {
  return (
    <p
      className={`truncate text-sm font-medium ${
        tone === "error" ? "text-[#C62828]" : "text-slate-500"
      }`}
    >
      {message}
    </p>
  );
}
