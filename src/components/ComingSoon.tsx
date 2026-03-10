"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ComingSoonProps {
  title: string;
  highlight: string;
  description?: string;
}

export default function ComingSoon({
  title,
  highlight,
  description = "We’re building the future of healthcare professional development. Be the first to know when we launch our elite fellowship matching and career portal.",
}: ComingSoonProps) {
  return (
  <motion.section
  initial = {{ opacity: 0, y: 50 }
}
whileInView = {{ opacity: 1, y: 0 }}
viewport = {{ once: true, amount: 0.2 }}
transition = {{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
className = "max-w-7xl mx-auto px-4 py-24"
  >

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

    {/* ================= RIGHT ILLUSTRATION (mobile first) ================= */}
    <div className="relative flex justify-center order-1 lg:order-2">
      <div className="absolute inset-0 bg-blue-400 rounded-[48%] blur-2xl opacity-20" />

      <Image
        src="/images/coming-soon.png"
        alt="Medical careers illustration"
        width={420}
        height={420}
        priority
        className="relative z-10 w-[220px] sm:w-[260px] lg:w-[380px]"
      />
    </div>

    {/* ================= LEFT CONTENT ================= */}
    <div className="order-2 lg:order-1 text-center lg:text-left">
      <span className="inline-block mb-4 text-[11px] tracking-widest uppercase bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
        Coming Soon
      </span>

      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
        {title} <br />
        <span className="text-yellow-500">{highlight}</span>
      </h1>

      <p className="max-w-md mx-auto lg:mx-0 text-gray-600 text-base mb-8">
        {description}
      </p>

      {/* Email */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button className="rounded-lg bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition">
          Subscribe
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        No spam, just exclusive early access.
      </p>
    </div>
  </div>

{/* ================= FOOTER ================= */ }
<div className="mt-24 text-center text-xs text-gray-400">
  © {new Date().getFullYear()} AAHII. All rights reserved.
</div>
</motion.section >

  );
}
