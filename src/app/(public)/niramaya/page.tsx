"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
    Eye,
    Landmark,
    ShieldCheck,
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
        image: "https://agihf.org/wp-content/uploads/2026/01/diagnostics.jpg",
    },
    {
        title: "Precision Therapeutics",
        desc: "Targeted therapies driven by molecular insights and personalized medicine.",
        image: "https://agihf.org/wp-content/uploads/2026/01/22378297_6567456.jpg",
    },
    {
        title: "Medical Devices (AI/ML)",
        desc: "Smart medical devices powered by artificial intelligence and machine learning.",
        image: "https://agihf.org/wp-content/uploads/2026/01/Picture2-1.jpg",
    },
    {
        title: "Robotics & Supply Chain",
        desc: "Automation, robotics, and optimized healthcare supply chain solutions.",
        image: "https://agihf.org/wp-content/uploads/2026/01/ChatGPT-Image-Jan-30-2026-02_53_36-PM.png",
    },
    {
        title: "Nutraceuticals / AYUSH",
        desc: "Evidence-based nutraceuticals and AYUSH innovations.",
        image: "https://agihf.org/wp-content/uploads/2026/01/ayur.png",
    },
    {
        title: "Functional Foods",
        desc: "Health-focused food innovations enhancing nutrition and wellness.",
        image: "https://agihf.org/wp-content/uploads/2026/01/food.jpg",
    },
    {
        title: "Assistive Technologies",
        desc: "Technologies empowering accessibility, rehabilitation, and inclusive healthcare.",
        image: "https://agihf.org/wp-content/uploads/2026/01/Picture7.jpg",
    },
];
export default function NiramayaPage() {
    return (
        <main className="w-full bg-[#f5f7fa] text-gray-900">

            {/* ================= HERO ================= */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden bg-[#e9eef5] py-28 px-6"
            >
                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(to_right,#000_1px,transparent_1px)] bg-[size:60px_60px]" />

                <div className="relative max-w-5xl mx-auto text-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-block mb-8 px-4 py-1 text-2xl tracking-wide bg-blue-100 font-bold text-blue-700 "
                    >
                        Northeast Incubator for Rapid Acceleration of Medical & Allied Innovations
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-6xl md:text-7xl font-bold  text-[#3a6ef0]"
                    >
                        NIRAMAYA
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        Giving wings to healthcare innovations — bridging research,
                        clinical validation, and market translation across Northeast India.
                    </motion.p>
                </div>
            </motion.section>


            {/* ================= BRIDGING ================= */}
            <motion.section
                variants={sectionFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-20 px-6"
            >
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

                    <div>
                        <h2 className="text-4xl font-bold leading-tight mb-6">
                            About {" "}
                            <span className="text-blue-600">NIRAMAYA</span>{" "}
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            AAHII has also taken up initiative to nurture innovation based Start-ups in Health-tech to develop a pipeline of products even when infrastructure is in progress. A Program “NIRAMAYA” has been launched to support the Healthcare based start-ups. AAHII is registered as an Incubator with Start-up India, GoI. The NIRAMAYA program supports health-tech startups to build a robust innovation pipeline aligned with national healthcare priorities.
                        </p>
                    </div>

                    {/* Stagger cards */}
                    <motion.div
                        variants={staggerContainer}
                        className="space-y-6"
                    >
                        {[
                            {
                                icon: <Landmark className="text-blue-600 mb-4" />,
                                title: "Host Institution",
                                desc: "AAHII with IIT-G provides world-class engineering foundation.",
                            },
                            {
                                icon: <ShieldCheck className="text-blue-600 mb-4" />,
                                title: "Implementation Partner",
                                desc: "BioNEST at IIT-G Research park.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={sectionFade}
                                className="bg-white rounded-2xl shadow p-6"
                            >
                                {item.icon}
                                <h3 className="font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </motion.section>

            {/* ================= VISION ================= */}
            <motion.section
                variants={sectionFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-24 px-6"
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="py-28 px-6 bg-[#eef2f6]"
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
                className="py-28 px-6 bg-[#f7f9fc]">
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
            className="object-cover"
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
