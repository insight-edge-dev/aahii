"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function EmployeeEngagementPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = [
    "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137607/birthday_celebration_3_wtkj6t.png",
    "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137619/birthday_celebration_2_gigevi.png",
    "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137630/Women-in-Beige-Monochrome-Photo-Collage-Instagram-Post1_ei3gs3.png",
    "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137635/Women-in-Beige-Monochrome-Photo-Collage-Instagram-Post-1_akf96l.png",
    "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137644/Bhogali_bihu_1_nkdhj3.jpg",
    "https://res.cloudinary.com/ddi8hisku/image/upload/v1773137646/Bhogali_bihu_3_itmavb.jpg",
    "https://res.cloudinary.com/ddi8hisku/image/upload/v1773138152/eeee-scaled_dta9al.jpg",
    "https://res.cloudinary.com/ddi8hisku/image/upload/v1773138166/3www_bjybxv.jpg",
  ];

  // 🔥 Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      }

      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % images.length : null
        );
      }

      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null
            ? (prev - 1 + images.length) % images.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#3c73fe] mb-6">
        Employee Engagement
      </h1>

      <p className="text-gray-600 max-w-4xl mb-10">
        At AAHII, employee engagement activities foster collaboration,
        celebration, and team spirit.
      </p>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-[250px] rounded-xl overflow-hidden shadow-md cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={img}
              alt={`Employee Engagement ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full h-[70vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]}
                alt="Preview"
                fill
                className="object-contain rounded-lg"
              />

              {/* Close */}
             

              {/* Left Arrow */}
              <button
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + images.length) % images.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex + 1) % images.length
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronRight size={20} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}