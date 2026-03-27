"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PopupBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // 👇 ALWAYS SHOW ON LOAD
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(false);
    router.push("/vendor-registration");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md md:max-w-2xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-3 -right-3 bg-white text-black rounded-full px-3 py-1 shadow-md z-10"
            >
              ✕
            </button>

            {/* Clickable Image */}
            <div
              onClick={handleClick}
              className="cursor-pointer overflow-hidden rounded-xl hover:scale-[1.02] transition"
            >
              <Image
                src="/vendor-banner.jpeg"
                alt="Vendor Registration"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}