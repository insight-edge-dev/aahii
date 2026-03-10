"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

export default function ProposedPrograms() {
  // 🔥 COMMON CARD BASE WITH HOVER
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
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

  const cardBase =
    "rounded-[18px] p-[16px_16px_18px] shadow-[0_10px_26px_rgba(15,42,109,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_52px_rgba(15,42,109,0.18)] active:scale-[0.98]";

  return (
 <motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={containerVariants}
  className="
    px-[14px] pt-[60px] pb-[70px]
    bg-gradient-to-b
    from-[#f0fdf4] via-[#f0f9ff] to-[#6baced]
    md:px-[6%]
    mt-15 mb-15
  "
>

      {/* ===== HEADING (ADDED) ===== */}
 <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
  className="max-w-4xl mx-auto text-center mb-16"
>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide text-[#0f2a6d] mb-4">
          Proposed Academic Programs at AAHII
        </h2>
      </motion.div>

      {/* ===== GRID ===== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-[22px] md:grid-cols-4 md:gap-6">

        {/* PhD */}
        <motion.div
            variants={cardVariants}
            whileHover={{y: -10,transition: { duration: 0.3 }, }}
          className={`${cardBase} bg-[#fff7ed]`}
        >
          <div className="overflow-hidden rounded-[14px] mb-4">
            <Image
              src="/programs/phd.png"
              alt="PhD"
              width={600}
              height={400}
              className="h-[170px] w-full object-cover"
            />
          </div>
          <h3 className="text-[17px] font-semibold mb-[6px]">PhD</h3>
          <p className="text-[14px] leading-[1.55]">
            • Medical, Engineering & Science programs including integrated
            PG–PhD programs
          </p>
        </motion.div>

        {/* PG Clinical */}
        <motion.div
          variants={cardVariants}
          whileHover={{y: -10,transition: { duration: 0.3 }, }}
          className={`${cardBase} bg-[#c8f2d5]`}
        >
          <div className="overflow-hidden rounded-[14px] mb-4">
            <Image
              src="/programs/pgclinical.png"
              alt="PG Degree Clinical"
              width={600}
              height={400}
              className="h-[170px] w-full object-cover"
            />
          </div>
          <h3 className="text-[17px] font-semibold mb-[6px]">
            PG Degree (Clinical)
          </h3>
          <p className="text-[14px] leading-[1.55]">
            • MD - Medicine, Emergency Medicine & Traumatology
          </p>
          <p className="text-[14px] leading-[1.55] mt-2">
            • MS - Surgery, G&O, Ortho
          </p>
        </motion.div>

        {/* PG Pre / Para */}
        <motion.div
          variants={cardVariants}
          whileHover={{y: -10,transition: { duration: 0.3 }, }}
          className={`${cardBase} bg-[#cfeaff] md:col-span-2`}
        >
          <div className="overflow-hidden rounded-[14px] mb-4">
            <Image
              src="/programs/ip.jpg"
              alt="PG Pre Para"
              width={600}
              height={400}
              className="h-[170px] w-full object-cover"
            />
          </div>
          <h3 className="text-[17px] font-semibold mb-[6px]">
            PG Degree (Pre / Para-clinical)
          </h3>
          <p className="text-[14px] leading-[1.55]">
            • MD - Biochemistry, Medicine Physiology and Community Medicine
          </p>
        </motion.div>

        {/* Superspeciality – BENTO */}
        <motion.div
          variants={cardVariants}
          whileHover={{y: -10,transition: { duration: 0.3 }, }}
          className={`${cardBase} bg-[#fefce8]`}
        >
          <div className="overflow-hidden rounded-[14px] mb-4">
            <Image
              src="/programs/superspeciality.png"
              alt="Superspeciality Degree"
              width={900}
              height={400}
              className="h-[180px] w-full object-cover"
            />
          </div>
          <h3 className="text-[18px] font-semibold mb-2">
            Superspeciality Degree
          </h3>
          <p className="text-[14px] leading-[1.55]">
            • MCh – Neurosurgery, GI Surgery, Urology
          </p>
          <p className="text-[14px] leading-[1.55]">
            • DM – Gastroenterology, Nephrology, Neurology
          </p>
        </motion.div>

        {/* UG */}
        <motion.div
          variants={cardVariants}
          whileHover={{y: -10,transition: { duration: 0.3 }, }}
          className={`${cardBase} bg-[#dcd9ff]`}
        >
          <div className="overflow-hidden rounded-[14px] mb-4">
            <Image
              src="/programs/ugdegree.png"
              alt="UG Degree"
              width={600}
              height={400}
              className="h-[170px] w-full object-cover"
            />
          </div>
          <h3 className="text-[17px] font-semibold mb-[6px]">UG Degree</h3>
          <p className="text-[14px] leading-[1.55]">
            • Dialysis, OT, ICU, MLT & Radiology
          </p>
        </motion.div>

        {/* Fellowships */}
        <motion.div
          variants={cardVariants}
          whileHover={{y: -10,transition: { duration: 0.3 }, }}
          className={`${cardBase} bg-[#e0f2fe]`}
        >
          <div className="overflow-hidden rounded-[14px] mb-4">
            <Image
              src="/programs/fellowships.png"
              alt="Fellowships"
              width={600}
              height={400}
              className="h-[170px] w-full object-cover"
            />
          </div>
          <h3 className="text-[17px] font-semibold mb-[6px]">Fellowships</h3>
          <p className="text-[14px] leading-[1.55]">
            • Short-term (6 months) & Long-term (12–18 months)
          </p>
        </motion.div>
        {/* Certificates */}
        <motion.div
          variants={cardVariants}
          whileHover={{y: -10,transition: { duration: 0.3 }, }}
          className={`${cardBase} bg-[#ffe1cf]`}
        >
          <div className="overflow-hidden rounded-[14px] mb-4">
            <Image
              src="/programs/certificate.png"
              alt="Certificates"
              width={600}
              height={400}
              className="h-[170px] w-full object-cover"
            />
          </div>
          <h3 className="text-[17px] font-semibold mb-[6px]">Certificates</h3>
          <p className="text-[14px] leading-[1.55]">
            • Speciality specific fellowships<br />
            • Skill-based program for AHP
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}