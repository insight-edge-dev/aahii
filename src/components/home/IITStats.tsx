"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

type StatItem = {
  label: string;
  number: string;
  desc: string;
  bg: string;
  accentFrom: string;
  accentTo: string;
  icon: string;
};

const stats: StatItem[] = [
  {
    label: "Established in",
    number: "1994",
    desc: "Indian Institute of Technology Guwahati, the sixth member of the IIT fraternity, was established in 1994.",
    bg: "bg-[#fff3e8]",
    accentFrom: "from-[#fb923c]",
    accentTo: "to-[#fdba74]",
    icon: "/icons/established.png",
  },
  {
    label: "Active researchers",
    number: "1000+",
    desc: "Active researchers working in almost all frontier areas of science and technology.",
    bg: "bg-[#eef6ff]",
    accentFrom: "from-[#2563eb]",
    accentTo: "to-[#93c5fd]",
    icon: "/icons/researchers.png",
  },
  {
    label: "in NIRF",
    number: "#7",
    desc: "IIT Guwahati has been ranked as India’s #7 university in the National Institutional Ranking Framework.",
    bg: "bg-[#f3f0ff]",
    accentFrom: "from-[#7c3aed]",
    accentTo: "to-[#c4b5fd]",
    icon: "/icons/nirf.png",
  },
  {
    label: "in QS World",
    number: "#32",
    desc: "IIT Guwahati ranked 32 globally in the ‘Research Citations per Faculty’ category in QS World Rankings 2024.",
    bg: "bg-[#ecfdf3]",
    accentFrom: "from-[#16a34a]",
    accentTo: "to-[#86efac]",
    icon: "/icons/qsworld.png",
  },
];
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -120,
    rotate: -4,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

export default function IITStats() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
      {/* ================= HEADER ================= */}
      <div className="mb-14 max-w-3xl mx-auto text-center">
        <h3 className="text-2xl sm:text-4xl font-bold text-[#0f2a6d] mb-2">
          Indian Institute of Technology Guwahati
        </h3>

        <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a6d] mb-4">
          Excellence that speaks through impact
        </h2>

        <p className="text-[15px] leading-relaxed text-[#2f2f2f]">
          The strategic commitment of IIT Guwahati provides the road map for the
          journey towards excellence.
        </p>
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="flex flex-wrap gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
          whileHover={{
        scale: 1.03,
          transition: { duration: 0.2 },
  }}
            className={`
              relative ${item.bg}
              rounded-[18px]
              px-6 py-7
              flex flex-col
              flex-[1_1_100%]
              md:flex-[1_1_calc(50%-24px)]
              xl:flex-[1_1_calc(25%-24px)]
              shadow-[0_10px_26px_rgba(15,42,109,0.08)]
              transition-all duration-300
              hover:-translate-y-[6px]
              hover:shadow-[0_22px_52px_rgba(15,42,109,0.14)]
            `}
          >
            {/* Accent strip */}
            <span
              className={`
                absolute left-0 top-[18px] bottom-[18px] w-1 rounded
                bg-gradient-to-b ${item.accentFrom} ${item.accentTo}
              `}
            />

            {/* Icon */}
            <div
  className="absolute right-5 top-5
             w-[54px] h-[54px]
             flex items-center justify-center
             rounded-full
             shadow-[0_6px_16px_rgba(0,0,0,0.15)]"
>
  <Image
    src={item.icon}
    alt={item.label}
    width={54}
    height={54}
    className="rounded-full"
  />
</div>


            {/* Badge */}
            <div
              className="inline-block bg-[#e9f1ff] text-[#1f3b8b]
              text-[14px] font-semibold px-3 py-[4px] rounded-full mb-4"
            >
              {item.label}
            </div>

            {/* Number */}
            <div className="text-[58px] font-extrabold leading-none tracking-[-0.6px] text-(--nav-blue) mb-3">
              {item.number}
            </div>

            {/* Description */}
            <p className="text-[15px] leading-[1.6] text-[#2f2f2f]">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
