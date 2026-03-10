"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail?: string; // optional now
  videoUrl: string;
  date: string;
}

export default function VideoCard({
  title,
  description,
  thumbnail,
  videoUrl,
  date,
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      {/* VIDEO AREA */}
      <div className="relative w-full h-[220px] bg-black">

        {!isPlaying ? (
          <>
            {/* Thumbnail (optional) */}
            {thumbnail && (
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover"
              />
            )}

            {/* Play Overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                <Play className="text-blue-600" />
              </div>
            </button>
          </>
        ) : (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs text-gray-500 mb-2">{date}</p>

        <h3 className="text-lg font-semibold text-[#0f2a6d] mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}