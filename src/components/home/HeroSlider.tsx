"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/hero/hero1.webp",
  "/hero/hero2.jpg",
  "/hero/hero3.png",
  "/hero/hero4.png",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden h-[55vh] sm:h-[65vh] lg:h-[75vh]">
      {/* SLIDES */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        >
          <Image
            src={img}
            alt={`Hero slide ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center sm:object-[center_top]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/35 sm:bg-black/25" />
        </div>
      ))}

      {/* LOWER-THIRD TEXT */}
      <div className="absolute inset-0 z-20 flex justify-center">
        <div
          className="
            w-full text-center
            px-4 sm:px-8 lg:px-10
            pt-[38vh] sm:pt-[42vh] lg:pt-[48vh]
          "
        >
          <h1
            className="
              text-white font-bold leading-snug
              text-xl sm:text-4xl lg:text-5xl
              max-w-4xl mx-auto
            "
          >
            Advancing Healthcare Through
            <br />
            Research & Innovation
          </h1>
        </div>
      </div>

      {/* DOTS (more gap + clickable) */}
      <div
        className="hidden 
          absolute bottom-6 sm:bottom-8 lg:bottom-10
          left-1/2 -translate-x-1/2
          z-30 md:flex gap-3
        "
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${i === current ? "bg-blue-600 scale-110" : "bg-white/60 hover:bg-white"}
            `}
          />
        ))}
      </div>
    </section>
  );
}
