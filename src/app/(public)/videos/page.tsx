"use client";

import { motion } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import { videos } from "@/content/videos";

export default function VideosPage() {
  return (
    <section className="bg-[#f7f9fc] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-5xl font-bold text-[#3c73fe] mb-4">
            Videos Gallery
          </h1>
          <p className="text-gray-600 text-lg">
            Explore events, innovations, research demonstrations and institutional highlights.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              thumbnail={video.thumbnail}
              videoUrl={video.videoUrl}
              date={video.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
