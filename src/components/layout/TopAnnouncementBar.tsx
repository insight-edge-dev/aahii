"use client";

import { useEffect, useState } from "react";

type AnnouncementItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  link?: string | null;
  priority?: boolean;
  publishedAt: string;
};

export default function TopAnnouncementBar() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnnouncements() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch("/api/announcements/latest", {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load announcements");
        }

        const data = await response.json() as { items?: AnnouncementItem[] };
        setAnnouncements(Array.isArray(data.items) ? data.items : []);
        setMobileIndex(0);
      } catch (caughtError) {
        if (
          caughtError instanceof DOMException &&
          caughtError.name === "AbortError"
        ) {
          return;
        }

        setError(true);
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    }

    loadAnnouncements();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (showWelcome || announcements.length === 0) return;

    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [announcements.length, showWelcome]);

  const stateText = loading
    ? "Loading announcements..."
    : error
      ? "Announcements are temporarily unavailable"
      : "No announcements available";

  return (
    <div className="bg-(--nav-blue) text-white text-sm overflow-x-hidden">
      <div className="w-full mx-auto h-8 flex items-center px-3 md:px-4">
        {showWelcome ? (
          <div className="w-full text-center fade-in-out font-medium">
            Welcome to AAHII
          </div>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-3 w-full">
              <span className="font-semibold whitespace-nowrap">
                Announcements :
              </span>

              <div className="overflow-hidden flex-1">
                {announcements.length > 0 ? (
                  <div
                    className="marquee marquee-hover-pause"
                    style={{ animationDuration: "22s" }}
                  >
                    {announcements.map((item) => (
                      <span key={item.id} className="flex items-center">
                        <a
                          href={item.link || "#"}
                          className="px-6 underline hover:text-yellow-300"
                        >
                          {item.priority ? "NEW: " : ""}
                          {item.title}
                        </a>
                        <span className="px-2">|</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-white/80">{stateText}</span>
                )}
              </div>
            </div>

            <div className="flex md:hidden items-center gap-2 w-full">
              <span className="bg-white/20 text-[8px] md:text-xs px-1 py-1 rounded font-semibold">
                Announcements
              </span>

              {announcements.length > 0 ? (
                <a
                  href={announcements[mobileIndex]?.link || "#"}
                  className="truncate underline text-[10px] md:text-xs flex-1"
                >
                  {announcements[mobileIndex]?.priority ? "NEW: " : ""}
                  {announcements[mobileIndex]?.title}
                </a>
              ) : (
                <span className="truncate text-[10px] md:text-xs flex-1">
                  {stateText}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
