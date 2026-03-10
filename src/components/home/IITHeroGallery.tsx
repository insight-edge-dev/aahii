"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  "/iit/hero1.jpg",
  "/iit/hero2.jpg",
  "/iit/hero3.jpg",
  "/iit/hero4.jpg",
  "/iit/hero5.jpg",
  "/iit/hero6.jpg",
   "/iit/hero7.jpg",
  "/iit/hero8.jpg",
];

export default function IITHeroGallery() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const next = () =>
    setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // 🔁 AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* ================= HERO ================= */}
      <div className="relative w-full h-[220px] sm:h-[420px] md:h-[520px] rounded-xl overflow-hidden">
        <Image
          src={images[active]}
          alt="IIT Guwahati Campus"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text */}
        <h1
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  text-white/80 text-3xl sm:text-5xl md:text-6xl
  font-extrabold tracking-wide"
>
  IIT GUWAHATI
</h1>


        {/* Arrows (desktop only) */}
        <button
          onClick={prev}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full bg-white/80 items-center justify-center
          hover:bg-white transition"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full bg-white/80 items-center justify-center
          hover:bg-white transition"
        >
          ›
        </button>
      </div>

      {/* ================= THUMBNAILS ================= */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative flex-shrink-0 w-28 h-16 sm:w-36 sm:h-20
              rounded-lg overflow-hidden border-2
              ${active === i ? "border-blue-600" : "border-transparent"}`}
          >
            <Image
              src={img}
              alt="IIT Guwahati thumbnail"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* ================= EXTRA 3 IMAGES ================= */}
    </section>
  );
}
