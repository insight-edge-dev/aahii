"use client";

import { useEffect, useState } from "react";

const announcements = [
  {
    href: "/announcement/1",
    text: "Call for Data Contribution – Last Date Feb 20, 2025",
  },
  {
    href: "/workshop",
    text: "Register Now: Workshop on Data Interpretation",
  },
  {
    href: "/pdf/icmr-notice.pdf",
    text: "Download Official Notification (PDF)",
  },
];

export default function TopAnnouncementBar() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Welcome → Announcements
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Mobile announcement rotation
  useEffect(() => {
    if (showWelcome) return;

    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [showWelcome]);

  return (
    <div className="bg-(--nav-blue) text-white text-sm overflow-x-hidden">
      <div className="w-full mx-auto h-8 flex items-center px-3 md:px-4">
        {showWelcome ? (
          <div className="w-full text-center fade-in-out font-medium">
            Welcome to AAHII
          </div>
        ) : (
          <>
            {/* ---------------- Desktop ---------------- */}
            <div className="hidden md:flex items-center gap-3 w-full">
              <span className="font-semibold whitespace-nowrap">
                Announcements :
              </span>

              <div className="overflow-hidden flex-1">
                <div
                  className="marquee marquee-hover-pause"
                  style={{ animationDuration: "22s" }}
                >
                  {announcements.map((item, index) => (
                    <span key={index} className="flex items-center">
                      <a
                        href={item.href}
                        className="px-6 underline hover:text-yellow-300"
                      >
                        {item.text}
                      </a>
                      <span className="px-2">|</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ---------------- Mobile ---------------- */}
            <div className="flex md:hidden items-center gap-2 w-full">
              <span className="bg-white/20 text-[8px] md:text-xs px-1 py-1 rounded font-semibold">
                Announcements
              </span>

              <a
                href={announcements[mobileIndex].href}
                className="truncate underline text-[10px] md:text-xs flex-1"
              >
                {announcements[mobileIndex].text}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
