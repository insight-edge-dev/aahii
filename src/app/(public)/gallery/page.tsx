"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { eventsData } from "@/content/events";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  // 🔍 Filter (debounced)
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) =>
      event.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  return (
    <motion.main
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1], // Apple-style easing
  }}
  className="max-w-7xl mx-auto px-4 py-14"
>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#3c73fe]">
            Event Gallery
          </h1>
          <p className="mt-2 text-slate-600 max-w-xl">
            A visual archive of academic excellence and institutional milestones.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3 top-2.5 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Gallery */}
      <section className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedEvents.map((event) => (
          <article
            key={event.id}
            className="group bg-white rounded-2xl border border-slate-100
              shadow-sm hover:shadow-lg transition"
          >
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-slate-900 leading-snug line-clamp-2">
                {event.title}
              </h3>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  📷 {event.images.length} Photos
                </span>

                <Link
                  href={`/gallery/${event.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Empty State */}
      {paginatedEvents.length === 0 && (
        <div className="mt-16 text-center text-slate-500">
          <p className="text-lg font-medium">No events found</p>
          <p className="text-sm mt-1">Try a different keyword</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-slate-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </motion.main>
  );
}
