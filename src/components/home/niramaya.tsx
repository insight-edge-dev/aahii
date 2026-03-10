"use client";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

export default function NiramayaContext() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="bg-white py-20 px-4 sm:px-6"
    >

      <div className="max-w-7xl mx-auto">

        {/* ===== HEADER (CENTERED LIKE JASPER) ===== */}
        <motion.div
          variants={fadeUpVariants}
          className="text-center max-w-3xl mx-auto mb-20">

          <span className="inline-block mb-6 px-4 py-1 rounded-full
            bg-sky-100 text-sky-700 text-2xl sm:text-3xl font-semibold tracking-wide">
            NIRAMAYA
          </span>

          <h2 className="text-xl sm:text-2xl leading-tight font-bold text-[#0f2a6d] mb-6">
            Accelerating healthcare innovation
            <br />
            from research to real-world impact.
          </h2>

          <p className="text-[17px] leading-relaxed text-slate-600 max-w-2xl mx-auto">
            NIRAMAYA integrates clinical expertise, research strength,
            and institutional knowledge to build a future-ready
            healthcare innovation ecosystem.
          </p>

          <Link
            href="/niramaya"
            className="inline-block mt-8 text-blue-600 font-semibold
             border-b-2 border-transparent hover:border-blue-600 transition">
            Explore NIRAMAYA →
          </Link>
        </motion.div>

        {/* ===== GRID (JASPER STYLE FLAT BLOCKS) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Clinical */}
          <motion.div
            variants={fadeUpVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-emerald-50 px-8 py-12">

            <h3 className="text-xl font-bold leading-tight mb-4">
              <span className=" rounded-full inline-block bg-emerald-500 text-emerald-950 px-3 py-1 mb-2">
                Clinical
              </span>
              <br />
              Validation
            </h3>
            <p className="text-[15px] leading-relaxed text-slate-700 max-w-xs">
              Enabling early-stage healthcare solutions through real clinical
              environments, validation frameworks, and hospital-grade testing
              infrastructure.
            </p>
          </motion.div>

          {/* Research */}
          <motion.div
            variants={fadeUpVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 px-8 py-12">
            <h3 className="text-xl font-bold leading-tight mb-4">
              <span className="rounded-full inline-block bg-blue-600 text-blue-50 px-3 py-1 mb-2">
                Research
              </span>
              <br />
              Knowledge
            </h3>
            <p className="text-[15px] leading-relaxed text-slate-700 max-w-xs">
              Translational research powered by IIT-grade labs, interdisciplinary
              science, and deep academic expertise in healthcare and life sciences.
            </p>
          </motion.div>

          {/* Innovation */}
          <motion.div
            variants={fadeUpVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-orange-50 px-8 py-12">
            <h3 className="text-xl font-bold leading-tight mb-4">
              <span className="rounded-full inline-block bg-orange-500 text-orange-950 px-3 py-1 mb-2">
                Innovation
              </span>
              <br />
              Ecosystem
            </h3>
            <p className="text-[15px] leading-relaxed text-slate-700 max-w-xs">
              Supporting startups through structured incubation, mentorship,
              regulatory guidance, and product-to-market acceleration.
            </p>
          </motion.div>

          {/* Institutional */}
          <motion.div
            variants={fadeUpVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-pink-50 px-8 py-12">
            <h3 className="text-xl font-bold leading-tight mb-4">
              <span className="rounded-full inline-block bg-pink-500 text-pink-950 px-3 py-1 mb-2">
                Institutional
              </span>
              <br />
              Strength
            </h3>
            <p className="text-[15px] leading-relaxed text-slate-700 max-w-xs">
              Backed by government, academic, and healthcare institutions ensuring
              credibility, scale, and long-term impact.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section >
  );
}
