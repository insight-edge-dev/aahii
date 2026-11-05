"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

type LabCard = {
  title: string;
  desc: string;
  img: string;
  href: string;
};

const labs: LabCard[] = [
  {
    title: "Invasive to Non-Invasive Diagnostics",
    desc: "Addresses the fast-growing diagnostics market with scalable, low-risk platforms that reduce procedure costs while enabling earlier, higher-volume detection.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/invasive_1_auf8hk.png",
    href: "/departments",
  },
  {
    title: "Personalized Medicine",
    desc: "Unlocks premium, outcomes-based care models through genomics-driven therapies tailored to individual patient profiles.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/inavsive_3_jvf4ds.png",
    href: "/departments",
  },
  {
    title: "Multi-Scale Robotics",
    desc: "Targets high-value surgical and interventional markets with precision robotics that improve efficiency, outcomes, and clinician productivity.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127204/robot_1_vvlx9p.png",
    href: "/departments",
  },
  {
    title: "Nano-Therapeutics",
    desc: "Enables next-generation oncology and chronic-disease treatments through high-margin, targeted delivery platforms with strong IP potential.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/medicine-doctor-touching-electronic-medical-record-tablet-dna-digital-healthcare-network-connection-hologram-modern-virtual-icon-scaled_jdtoro.jpg",
    href: "/departments",
  },
  {
    title: "Integrated Medicine",
    desc: "Creates differentiated, preventive and chronic-care models by validating traditional systems within modern, scalable healthcare frameworks.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/team-industrial-scientists-engineers-developers-innovating-new-vaccine-doctor-pointing-tablet-explaining-virus-evolution-coworker-scaled_kzhxph.jpg",
    href: "/departments",
  },
  {
    title: "Machine Learning & Big Data in ICU",
    desc: "Drives cost reduction and outcome improvement in critical care through predictive analytics and real-time decision support.",
    img: "https://res.cloudinary.com/ddi8hisku/image/upload/v1773127203/healthcare-professional-intensive-care-unit-scaled_gqfdug.jpg",
    href: "/departments",
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function ExploreLink({ href, featured = false }: { href: string; featured?: boolean }) {
  return (
    <Link
      href={href}
      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#06469b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nav-blue) focus-visible:ring-offset-2"
    >
      {featured ? "Explore Research" : "Explore"}
      <span className="flex size-8 items-center justify-center rounded-full border border-[#75b5ec] transition-colors duration-300 group-hover/link:bg-[#06469b] group-hover/link:text-white motion-reduce:transition-none">
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
      </span>
    </Link>
  );
}

function CardNumber({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-2.5 text-lg text-[#062456]">
      <span>{String(index + 1).padStart(2, "0")}</span>
      <span className="h-px w-9 bg-[#75b5ec]" aria-hidden="true" />
    </div>
  );
}

export default function LabResearchSection() {
  const [featured, ...remainingLabs] = labs;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={sectionVariants}
      className="overflow-hidden bg-[#f8f7f3] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28 xl:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(250px,0.7fr)] lg:items-end lg:gap-16">
          <motion.div variants={revealVariants} className="max-w-[760px]">
            <p className="mb-5 text-xs font-bold tracking-[0.26em] text-[#248ee2]">
              RESEARCH &amp; INNOVATION
            </p>
            <h2 className="text-4xl font-normal leading-[1.05] tracking-[-0.045em] text-[#061d46] sm:text-5xl lg:text-6xl xl:text-[70px]">
              Research &amp; Innovation
              <br />
              Possibilities at AAHII
            </h2>
            <p className="mt-6 max-w-[700px] text-[17px] font-normal leading-[1.55] tracking-normal text-slate-600">
              Interdisciplinary translational R&amp;D centre for innovation in frontier areas of health sciences and cutting-edge health technologies.
            </p>
          </motion.div>

          <motion.aside variants={revealVariants} className="border-l border-slate-300 pl-7 lg:mb-1">
            <p className="text-2xl font-normal leading-[1.12] tracking-[-0.045em] text-slate-600 sm:text-[28px]">
              From
              <br />
              Discovery to
              <br />
              Real-World Impact
            </p>
            <span className="mt-5 block h-px w-8 bg-[#248ee2]" aria-hidden="true" />
          </motion.aside>
        </div>

        <motion.div variants={revealVariants} className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-[minmax(0,1.72fr)_minmax(330px,0.9fr)] lg:gap-5">
          <article className="group relative min-h-[480px] overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100 shadow-[0_12px_35px_rgba(20,40,80,0.05)] sm:min-h-[520px] lg:min-h-[560px]">
            <Image src={featured.img} alt={featured.title} fill sizes="(max-width: 1023px) 100vw, 65vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none" />
            <div className="absolute inset-0 bg-linear-to-r from-white via-white/88 to-white/10 sm:via-white/82" />
            <div className="relative z-10 flex h-full max-w-[455px] flex-col justify-end p-7 sm:p-10 lg:p-11">
              <CardNumber index={0} />
              <h3 className="mt-5 text-3xl font-normal leading-[1.08] tracking-[-0.045em] text-[#061d46] sm:text-4xl lg:text-[42px]">
                Invasive to Non-Invasive
                <br />
                Diagnostics
              </h3>
              <p className="mt-4 text-base font-normal leading-[1.55] tracking-normal text-slate-600">{featured.desc}</p>
              <div className="mt-6"><ExploreLink href={featured.href} featured /></div>
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            {remainingLabs.slice(0, 2).map((lab, index) => (
              <motion.article key={lab.title} variants={revealVariants} className="group relative min-h-[300px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(20,40,80,0.05)] lg:min-h-0">
                <Image src={lab.img} alt={lab.title} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 34vw" className="object-cover object-right transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none" />
                <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-white/10" />
                <div className="relative z-10 flex h-full max-w-[66%] flex-col justify-center p-6 sm:p-7">
                  <CardNumber index={index + 1} />
                  <h3 className="mt-2 text-2xl font-normal leading-[1.12] tracking-[-0.045em] text-[#061d46]">{lab.title}</h3>
                  <p className="mt-2 text-[15px] font-normal leading-[1.55] tracking-normal text-slate-600">{lab.desc}</p>
                  <div className="mt-3"><ExploreLink href={lab.href} /></div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {remainingLabs.slice(2).map((lab, index) => (
            <motion.article key={lab.title} variants={revealVariants} className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(20,40,80,0.05)]">
              <div className="relative h-44 overflow-hidden sm:h-48">
                <Image src={lab.img} alt={lab.title} fill sizes="(max-width: 767px) 100vw, 34vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent" />
              </div>
              <div className="px-6 pb-6 pt-1">
                <CardNumber index={index + 3} />
                <h3 className="mt-2 text-2xl font-normal leading-[1.12] tracking-[-0.045em] text-[#061d46]">{lab.title}</h3>
                <p className="mt-2 text-[15px] font-normal leading-[1.55] tracking-normal text-slate-600">{lab.desc}</p>
                <div className="mt-4"><ExploreLink href={lab.href} /></div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
