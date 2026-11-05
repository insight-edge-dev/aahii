"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { NiramayaAbout, NiramayaAtGlance, NiramayaHero } from "@/components/niramaya/NiramayaEntrance";
import SelectedStartups from "@/components/niramaya/SelectedStartups";
import {
    Eye,
} from "lucide-react";

/* ================= ANIMATION VARIANTS ================= */

const sectionFade: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const fadeSlideLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const fadeSlideRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const sectors = [
    {
        title: "Diagnostics",
        desc: "Advanced diagnostic tools and platforms for early and accurate detection.",
        image: "/avatars/diagnostics.png",
    },
    {
        title: "Precision Therapeutics",
        desc: "Targeted therapies driven by molecular insights and personalized medicine.",
        image: "/avatars/thera.png",
    },
    {
        title: "Medical Devices (AI/ML)",
        desc: "Smart medical devices powered by artificial intelligence and machine learning.",
        image: "/avatars/digitalhealth.png",
    },
    {
        title: "Robotics & Supply Chain",
        desc: "Automation, robotics, and optimized healthcare supply chain solutions.",
        image: "/avatars/robotics.png",
    },
    {
        title: "Nutraceuticals / AYUSH",
        desc: "Evidence-based nutraceuticals and AYUSH innovations.",
        image: "/images/Integrated-Medicine.jpg",
    },
    {
        title: "Functional Foods",
        desc: "Health-focused food innovations enhancing nutrition and wellness.",
        image: "/avatars/stem.png",
    },
    {
        title: "Assistive Technologies",
        desc: "Technologies empowering accessibility, rehabilitation, and inclusive healthcare.",
        image: "/images/Personalized-Medicine.jpg",
    },
];
export default function NiramayaPage() {
    return (
        <main className="w-full overflow-x-clip bg-[#f5f7fa] text-gray-900">
            <NiramayaHero />
            <NiramayaAtGlance />
            <SelectedStartups />
            <NiramayaAbout />

            {/* ================= VISION ================= */}
            <motion.section
                id="vision"
                variants={sectionFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="scroll-mt-36 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-24 px-6"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="flex gap-2 items-center mb-8">
                        <Eye className="mb-6 text-blue-400 pt-2" size={28} />
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
                    </div>

                    <h2 className="text-4xl md:text-4xl font-bold leading-tight max-w-4xl">
                        To accelerate healthcare technology from concept to market in Northeast India by  {" "}
                        <span className="text-blue-400">providing clinical validation, deep-tech mentorship, and translational support.</span>
                    </h2>
                </div>
            </motion.section>

            {/* ================= FACILITIES ================= */}
            {/* ================= INFRASTRUCTURE & SUPPORT ================= */}
            <motion.section
                id="infrastructure"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="scroll-mt-36 py-28 px-6 bg-[#eef2f6]"
            >
                <div className="max-w-6xl mx-auto">

                    {/* Heading */}
                    <motion.h2
                        variants={sectionFade}
                        className="text-4xl md:text-5xl  font-semibold text-[#0f2a6d] mb-16"
                    >
                        Infrastructure & Support
                    </motion.h2>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-10">

                        {/* CARD 1 */}
                        <motion.div
                            variants={sectionFade}
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                   bg-gradient-to-br from-[#dbe7f5] to-[#eef4fb]"
                        >
                            <h3 className="text-xl font-semibold text-[#0f2a6d] mb-4">
                                AAHII
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Clinical validation and incubation support for healthcare innovations.
                            </p>

                            <ul className="space-y-3 text-sm text-gray-700">
                                {[
                                    "Aggregating Clinical Partners",
                                    "Coordinate with Engineers & Scientists of IIT",
                                    "Linkage with CROs & major labs",
                                    "Support for various stages of trial",
                                    "Product advocacy & investor pitch for product",
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="mt-[6px] w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* CARD 2 */}
                        <motion.div
                            variants={sectionFade}
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                   bg-gradient-to-br from-[#d9f0e8] to-[#eefaf5]"
                        >
                            <h3 className="text-xl font-semibold text-[#0f2a6d] mb-4">
                                IITG BioNEST
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Early-stage prototyping and translational research facilities.
                            </p>

                            <ul className="space-y-3 text-sm text-gray-700">
                                {[
                                    "Lab Support",
                                    "Trial & Testing",
                                    "Regulatory Clearances",
                                    "Management & Handholding",
                                    "Product advocacy & Packing",
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="mt-[6px] w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* CARD 3 */}
                        <motion.div
                            variants={sectionFade}
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                   bg-gradient-to-br from-[#e6e2f3] to-[#f3f1fb]"
                        >
                            <h3 className="text-xl font-semibold text-[#0f2a6d] mb-4">
                                IIT Guwahati
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Advanced engineering, materials, and fabrication infrastructure.
                            </p>

                            <ul className="space-y-3 text-sm text-gray-700">
                                {[
                                    "Nanomaterials",
                                    "CIAF",
                                    "Advanced fabrication",
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="mt-[6px] w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
            <motion.section
                id="innovation"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
                className="scroll-mt-36 py-28 px-6 bg-[#f7f9fc]">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <motion.div
                        variants={fadeSlideLeft}
                        className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl  font-semibold text-[#0f2a6d] mb-4">
                            Our Focus Areas
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Driving innovation across critical healthcare and life science domains
                        </p>
                    </motion.div>

                    {/* List */}
                   <div className="space-y-28 max-w-5xl mx-auto">
  {sectors.map((sector, index) => {
    const isReverse = index % 2 !== 0;

    return (
      <motion.div
        key={index}
        variants={isReverse ? fadeSlideRight : fadeSlideLeft}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
          className={`relative w-full h-[320px] rounded-3xl overflow-hidden shadow-lg ${
            isReverse ? "md:order-2" : ""
          }`}
        >
          <Image
            src={sector.image}
            alt={sector.title}
            fill
            className="bg-white object-contain p-8"
          />
        </motion.div>

        {/* Content */}
        <div className={`${isReverse ? "md:order-1" : ""}`}>
          <h3 className="text-2xl font-semibold text-[#0f2a6d] mb-4">
            {sector.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {sector.desc}
          </p>
        </div>
      </motion.div>
    );
  })}
</div>
                </div>
            </motion.section>
        </main>
    );
}
