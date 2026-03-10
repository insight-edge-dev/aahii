"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";


type LabCard = {
  title: string;
  desc: string;
  img: string;
  href: string;
  bg?: string;
};

const labs: LabCard[] = [
  {
    title: "Invasive to Non-Invasive Diagnostics",
    desc:
      "Addresses the fast-growing diagnostics market with scalable, low-risk platforms that reduce procedure costs while enabling earlier, higher-volume detection.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/invasive_1_auf8hk.png",
    href: "/departments",
  },
  {
    title: "Personalized Medicine",
    desc:
      "Unlocks premium, outcomes-based care models through genomics-driven therapies tailored to individual patient profiles.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/inavsive_3_jvf4ds.png",
    href: "/departments",
    bg: "bg-[#f0f9f4]",
  },
  {
    title: "Multi-Scale Robotics",
    desc:
      "Targets high-value surgical and interventional markets with precision robotics that improve efficiency, outcomes, and clinician productivity.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127204/robot_1_vvlx9p.png",
    href: "/departments",
    bg: "bg-[#eef5ff]",
  },
  {
    title: "Nano-Therapeutics",
    desc:
      "Enables next-generation oncology and chronic-disease treatments through high-margin, targeted delivery platforms with strong IP potential.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/medicine-doctor-touching-electronic-medical-record-tablet-dna-digital-healthcare-network-connection-hologram-modern-virtual-icon-scaled_jdtoro.jpg",
    href: "/departments",
    bg: "bg-[#dcd9ff]",
  },
  {
    title: "Integrated Medicine",
    desc:
      "Creates differentiated, preventive and chronic-care models by validating traditional systems within modern, scalable healthcare frameworks.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/team-industrial-scientists-engineers-developers-innovating-new-vaccine-doctor-pointing-tablet-explaining-virus-evolution-coworker-scaled_kzhxph.jpg",
    href: "/departments",
    bg: "bg-[#c8f2d5]",
  },
  {
    title: "Machine Learning & Big Data in ICU",
    desc:
      "Drives cost reduction and outcome improvement in critical care through predictive analytics and real-time decision support.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/healthcare-professional-intensive-care-unit-scaled_gqfdug.jpg",
    href: "/departments",
    bg: "bg-[#f3f0ff]",
  },
];
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // premium cubic-bezier
    },
  },
};

export default function LabResearchSection() {
  return (
  <motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={containerVariants}
  className="w-full px-[6%] py-20 mt-10 bg-[#faf6ee]"
>

        {/* ================= HEADING ================= */}
<div className="max-w-5xl mx-auto text-center mb-16">
  <h2 className="text-[24px] sm:text-[36px] font-extrabold tracking-wide text-[#0f2a6d] mb-4 ">
    Research & Innovation Possibilities at AAHII
  </h2>

  <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#2f2f2f]">
    Interdisciplinary translational R&amp;D centre for innovation in frontier
    areas of health sciences and cutting-edge health technologies.
  </p>
</div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {labs.map((lab, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
  whileHover={{
    y: -8,
    transition: { duration: 0.3 },
  }}
            className={`
              ${lab.bg ?? "bg-white"}
              rounded-[22px]
              p-[22px]
              flex flex-col
              shadow-[0_14px_36px_rgba(15,42,109,0.08)]
              transition-all duration-300
              hover:-translate-y-[6px]
              hover:shadow-[0_22px_52px_rgba(15,42,109,0.14)]
            `}
          >
            {/* Image */}
            <div className="rounded-[16px] overflow-hidden mb-4">
              <Image
                src={lab.img}
                alt={lab.title}
                width={600}
                height={400}
                className="w-full h-[170px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Title */}
            <h3 className="text-[18px] font-semibold text-[#0b2c63] mb-[10px] leading-[1.35]">
              {lab.title}
            </h3>

            {/* Description */}
            <p className="text-[14.5px] leading-[1.6] text-[#444] mb-[18px]">
              {lab.desc}
            </p>

            {/* Button */}
            <Link
              href={lab.href}
              className="mt-auto inline-block self-start
                px-[18px] py-[10px]
                rounded-[6px]
                bg-[#0b2c63] text-white
                text-[14px] font-semibold
                transition-all duration-300
                hover:bg-[#123a86] hover:-translate-y-[2px]"
            >
              Read More
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
