"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const RING_SIZE = 48;     // was 56
const BUTTON_SIZE = 36;  // was 44
const STROKE = 3;        // slightly thinner for elegance
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;


export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percent =
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, percent)));
      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      style={{ width: RING_SIZE, height: RING_SIZE }}
    >
      {/* Progress Ring */}
      <svg
        width={RING_SIZE}
        height={RING_SIZE}
        className="absolute inset-0 -rotate-90"
      >
        {/* Track */}
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          stroke="rgb(226 232 240)" // slate-200
          strokeWidth={STROKE}
          fill="none"
        />

        {/* Progress */}
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          stroke="rgb(100 116 139)" // slate-500
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={
            CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE
          }
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-150"
        />
      </svg>

      {/* Button */}
      <button
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        aria-label="Scroll to top"
        className="
          absolute inset-0 m-auto
          flex items-center justify-center
          rounded-full
          bg-white text-slate-600
          shadow-md ring-1 ring-slate-200
          transition-all
          hover:bg-slate-50 hover:text-blue-600 hover:ring-blue-200
          hover:scale-110
        "
        style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
