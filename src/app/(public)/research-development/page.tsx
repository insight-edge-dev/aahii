"use client";

import {
  CpuIcon,
  Microscope,
  RocketIcon,
  SquareActivity,
  UsersIcon,
} from "lucide-react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ImageCarousel from "@/components/ImageCarousel";



const acc1 = [
  { src: "/about/accordian/1.jpeg", alt: "Foundation ceremony" },
  { src: "/about/accordian/2.jpeg", alt: "Leadership address" },
  { src: "/about/accordian/3.jpeg", alt: "Inauguration event" },
  { src: "/about/accordian/4.jpeg", alt: "Lamp lighting ceremony" },
];

const acc2 = [
  { src: "/about/accordian/5.jpeg", alt: "Foundation ceremony" },
  { src: "/about/accordian/6.jpeg", alt: "Leadership address" },
  { src: "/about/accordian/7.jpeg", alt: "Inauguration event" },
];


const fadeUp: Variants = {
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

export default function ResearchDevelopmentPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* ===== HERO ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-12 gap-12 items-start mb-20"
        >
          {/* Left */}
          <div className="lg:col-span-7">
            <h1 className="font-extrabold text-4xl md:text-6xl font-bold leading-tight text-[#1f2937]">
              RESEARCH & <br />
              <span className="text-blue-500">DEVELOPMENT</span>
            </h1>

            <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
              The Assam Government IIT Guwahati Healthcare Foundation (AGIHF) is
              committed to advancing cutting-edge research and development aimed
              at transforming healthcare delivery through innovation,
              indigenization, and translational science. Anchored by the Assam
              Advanced Healthcare Innovation Institute (AAHII), serves as a
              unique platform where clinicians, scientists, engineers, and
              industry partners collaborate to address pressing healthcare
              challenges.
            </p>
          </div>

          {/* Right Quote */}
          <div className="lg:col-span-5">
            <div className="border-l-4 border-blue-700 pl-6 text-sm text-gray-500 italic leading-relaxed">
              “Anchored by AGIHF, AAHII serves as a unique platform where
              clinicians, scientists, engineers, and industry partners
              collaborate.”
            </div>
          </div>
        </motion.div>

        {/* ===== VISION CARD ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-xl mb-24"
        >
          <div className="bg-gradient-to-r from-blue-600 via-blue-800 to-emerald-500 p-12 md:p-16 text-white">
            <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold bg-white/20 rounded-full">
              OUR VISION
            </span>

            <h2 className="text-3xl md:text-4xl  font-bold mb-6">
              Bridging Lab to Life
            </h2>

            <p className="max-w-2xl text-white/90 leading-relaxed">
              AAHII’s research ecosystem is designed to bridge the gap between
              laboratory discoveries and real-world clinical applications. Our
              focus lies in developing affordable, scalable, and impactful
              healthcare technologies tailored to regional, national, and global
              needs—particularly for low-resource and underserved settings.
            </p>
          </div>

          {/* Decorative icon */}
          <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 opacity-20">
            <Microscope className="w-50 h-50" />
          </div>
        </motion.div>

        {/* ===== TRANSLATIONAL & COLLABORATIVE ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-12 gap-16"
        >
          {/* Left text */}
          <div className="lg:col-span-5">
            <h3 className=" text-3xl font-bold mb-6 text-gray-900">
              Translational & <br />
              <span className="text-blue-700">Collaborative</span>
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              AAHII emphasizes bench-to-bedside translation, ensuring that
              research outcomes lead to tangible clinical and societal impact.
              We actively collaborate with IIT Guwahati, AIIMS Guwahati, state
              medical colleges, national research institutions, startups, and
              industry partners to accelerate innovation.
            </p>
          </div>

          {/* Right cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: <SquareActivity />,
                title: "Clinical Validation",
                desc: "Pilot studies & trials",
                bg: "bg-pink-100",
              },
              {
                icon: <CpuIcon />,
                title: "Indigenous Tech",
                desc: "Make in India initiatives",
                bg: "bg-orange-100",
              },
              {
                icon: <RocketIcon />,
                title: "Startups",
                desc: "Incubation & support",
                bg: "bg-green-100",
              },
              {
                icon: <UsersIcon />,
                title: "Capacity Building",
                desc: "Training for researchers",
                bg: "bg-indigo-100",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`group p-6 rounded-2xl border border-gray-200 
  ${card.bg} text-gray-800
  shadow-sm transition-all duration-300
  hover:bg-blue-600 hover:border-blue-600 hover:shadow-md
  ${i % 2 === 1 ? "lg:translate-y-6" : ""}`} >
                {card.icon && <div className="mb-4">{card.icon}</div>}
                <h4 className="font-semibold text-gray-900 group-hover:text-white transition-colors hover:text-white mb-1">
                  {card.title}
                </h4>
                <p className="text-sm text-gray-500 group-hover:text-white transition-colors">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        {/* ===== COMMITMENT TO IMPACT ===== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-32 pt-24 border-t border-gray-200 text-center"
        >
          <h2 className=" text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Commitment to Impact
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed italic">
            “Through its Research and Development initiatives, AAHII aims to
            position Assam as a hub of healthcare innovation—contributing to
            improved patient outcomes, reduced healthcare costs, and global
            advancement in health sciences and technology.”
          </p>
        </motion.section>
        {/* ===== ANNOUNCEMENTS ===== */}
        {/* ===== ANNOUNCEMENTS ===== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-24 bg-gray-50 py-16 rounded-3xl"
        >
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-blue-800">
                  Announcements{" "}
                  <span className="text-sm font-medium text-gray-500">
                    (Ongoing)
                  </span>
                </h3>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  AAHII is proud to announce the acceptance of new project
                  proposals under the R&D sector, with work initiated under
                  stewardship of Faculty of IIT Guwahati.
                  <span className="text-blue-600 ml-1 font-medium">
                    Stay tuned for more updates.
                  </span>
                </p>
              </div>

              <span className="inline-flex items-center text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full">
                NEW CALLS
              </span>
            </div>

            {/* Accordion Logic */}
            {(() => {
              

              const items = [
                {
                  title:
                    "Low-Field MRI R&D Unit for Point-of-Care Diagnostics",
                  content: `Led by Dr. Erwin Fuhrer and Dr. Debabrata Sikdar at IIT
          Guwahati, this project aims to establish India’s first
          indigenous low-field MRI (LF-MRI) R&D unit for point-of-care
          diagnostics, focusing on rural and underserved areas. By
          leveraging permanent magnets and AI, the team is developing a
          portable, cost-effective MRI solution to enable early stroke
          diagnosis. The initiative supports the “Make in India” and
          Medical Device Policy 2022 goals, with a strong emphasis on
          clinical validation and local capacity building.`,
          image:<ImageCarousel images={acc1} />,
                },
                {
                  title:
                    "Atharv: India’s First Globally Certifiable Surgical Robot Platform",
                  content: `Steered by Prof. Pradip K. Das and Mr. Shashank Sharma,
          Project Atharv aims to develop India’s first cost-effective,
          FDA-compliant surgical robotic platform. Led by IIT Guwahati
          in collaboration with Roboss Pte Ltd, the project envisions a
          teleoperated system with haptic feedback, AI-driven motion
          planning, and AR/VR training modules, ultimately aiming to
          democratize access to robotic surgery and enhance India's
          global standing in medical technology.`,
          image:<ImageCarousel images={acc2} />,
                },
                {
                  title:
                    "Development of Plant-Based Drugs for Rheumatoid Arthritis",
                  content: `Steered by Prof. Lingaraj Sahoo and Dr. Swapnil Sinha,
          this project aims to develop a scientifically validated,
          plant-based therapeutic for Rheumatoid Arthritis, leveraging
          the rich medicinal biodiversity of Northeast India. Through a
          structured translational research model, the initiative
          focuses on delivering a safe, affordable, and accessible
          treatment, aligning with the vision of Atmanirbhar Bharat and
          positioning India as a global leader in plant-based
          immunomodulatory therapies.`,
                },
              ];

              return (
                <div className="space-y-4">
                  {items.map((item, index) => {
                    const isOpen = activeIndex === index;

                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-white
                transition hover:bg-blue-50 hover:border-blue-500"
                      >
                        {/* Header */}
                        <button
                          onClick={() =>
                            setActiveIndex(isOpen ? null : index)
                          }
                          className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-900 hover:text-blue-700"
                        >
                          {item.title}

                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-400"
                          >
                            ⌄
                          </motion.span>
                        </button>

                        {/* Content */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                                {item.content}
                                {item.image && <div className="mt-4">{item.image}</div>}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </motion.section>
      </div>
    </section>
  );
}
