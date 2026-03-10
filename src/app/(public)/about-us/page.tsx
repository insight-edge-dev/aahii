"use client";
{
  /* MILESTONES */
}
import { motion, AnimatePresence, color } from "framer-motion";

import {
  Cpu,
  Stethoscope,
  Bot,
  Atom,
  Database,
  Hospital,
  GraduationCap,
  Lightbulb,
  Landmark,
  Hammer,
  Megaphone,
  Microscope,
  Users,
  Rocket,
  Building2,
  Flag,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";

type Tab = "about" | "milestones" | "focus";

const TABS: { key: Tab; label: string }[] = [
  { key: "about", label: "About Us" },
  { key: "milestones", label: "Key Milestones" },
  { key: "focus", label: "Focus Areas (R&D)" },
];

const aboutImages = [
  { src: "/about/milestone-1.jpeg", alt: "Foundation ceremony" },
  { src: "/about/m-2.jpeg", alt: "Leadership address" },
  { src: "/about/milestone-3.jpeg", alt: "Inauguration event" },
  { src: "/about/milestone-4.jpeg", alt: "Lamp lighting ceremony" },
  { src: "/about/milestone-5.jpeg", alt: "Public address" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<Tab>("about");

  return (
    <main className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* ================= HERO ================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[220px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden shadow-sm">
          <Image
            src="/hero/hero1.webp"
            alt="AAHII Campus"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.section>

        {/* ================= TABS (STICKY) ================= */}
        <div className="sticky top-0 z-20 bg-gray-50 pt-2">
          <div className="overflow-x-auto">
            <div className="flex gap-2 bg-white rounded-xl p-2 border border-gray-200 shadow-sm min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`whitespace-nowrap rounded-lg font-medium transition
            px-2 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-base
            ${activeTab === tab.key
                      ? "bg-blue-700 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
           <AnimatePresence mode="wait">
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Apple-style cubic bezier
      }}>
          {/* ABOUT */}
          {activeTab === "about" && (
            <div className="space-y-8">
              <header className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-800">
                  About Us
                </h1>
                <div className="h-1 w-12 bg-blue-700 rounded-full" />
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-700 max-w-4xl">
                <p>
                  The{" "}
                  <strong>
                    Assam Advanced Healthcare Innovation Institute (AAHII)
                  </strong>{" "}
                  is a flagship national initiative dedicated to advancing
                  high-impact healthcare innovation, translational research, and
                  state-of-the-art medical services in India. Established
                  through a strategic partnership between the{" "}
                  <strong>Government of Assam</strong> and{" "}
                  <strong>IIT Guwahati</strong>, AAHII is envisioned as a
                  long-term platform to strengthen healthcare outcomes, research
                  excellence, and innovation-led economic growth.
                </p>

                <p>
                  The foundation stone of AAHII was laid on 14 April 2023 by the
                  Hon’ble Prime Minister of India,
                  <strong> Shri Narendra Modi</strong>, in the presence of the
                  Hon’ble Chief Minister of Assam,{" "}
                  <strong> Shri Himanta Biswa Sarma</strong>, underscoring the
                  institute’s national significance and strong alignment with
                  India’s healthcare and innovation policy priorities.
                </p>

                <p>
                  AAHII is being developed as a multi-disciplinary healthcare
                  innovation ecosystem, integrating advanced clinical care,
                  biomedical and engineering research, digital health and
                  medical technology development, and capacity building. The
                  institute is designed to enable seamless bench-to-bedside
                  translation, foster close collaboration between clinicians,
                  scientists, and engineers, and accelerate the development and
                  adoption of scalable healthcare solutions relevant to India
                  and other emerging economies.
                </p>
              </div>

              {/* IMAGE CAROUSEL */}
              <ImageCarousel images={aboutImages} />

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-700 max-w-4xl">
                <p>
                  Governance and execution are anchored through the{" "}
                  <strong>
                    Assam Government–IIT Guwahati Healthcare Foundation
                    (AGIHF){" "}
                  </strong>
                  , a Section 8 (not-for-profit) company established to ensure
                  strong institutional governance, financial discipline, and
                  strategic oversight. AGIHF provides a credible and transparent
                  platform for public funding, private investment, philanthropic
                  participation, and global collaborations, supporting phased
                  development and long-term sustainability.
                </p>

                <p>
                  The name AAHII draws inspiration from the Sanskrit word “Ātmā”
                  (आत्मा)—the soul or essence of life—reflecting the institute’s
                  foundational philosophy. Guided by this ethos, AAHII is
                  committed to advancing health through scientific rigor,
                  ethical practice, and patient-centred innovation, with a focus
                  on creating enduring societal value.
                </p>

                <p>
                  With its scale, academic anchoring, and strong policy support,
                  AAHII is poised to emerge as a national reference institution
                  and a strategic platform for investment in advanced healthcare
                  infrastructure, research capabilities, and innovation-driven
                  health systems.
                </p>

                <p>
                  In essence, AAHII represents a unique convergence of public
                  policy support, academic excellence, and scalable healthcare
                  innovation—creating long-term value for patients, partners,
                  and the broader healthcare ecosystem.
                </p>
              </div>
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="space-y-10">
              {/* Header */}
              <header className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">
                  Key Milestones
                </h2>
                <div className="h-1 w-12 bg-blue-700 rounded-full" />
              </header>

              {/* Timeline */}
              <ol className="relative border-l border-blue-700/30 pl-8 space-y-8">
                {[
                  {
                    date: "30 Sep 2022",
                    text: "Incorporation of the Assam Government–IIT Guwahati Healthcare Foundation (AGIHF), establishing the institutional and governance framework for AAHII.",
                    icon: Landmark,
                    color: "bg-blue-50 border-blue-100",
                  },
                  {
                    date: "14 Apr 2023",
                    text: "Foundation stone laid by the Hon’ble Prime Minister of India, Shri Narendra Modi, and the Hon’ble Chief Minister of Assam, Shri Himanta Biswa Sarma.",
                    icon: Flag,
                    color: "bg-green-50 border-green-100",
                  },
                  {
                    date: "27 Aug 2024",
                    text: "Release of campus construction advertisement, marking the initiation of infrastructure development.",
                    icon: Megaphone,
                    color: "bg-amber-50 border-amber-100",
                  },
                  {
                    date: "08 Nov 2024",
                    text: "Launch of structured doctor–scientist collaboration through an interdisciplinary symposium.",
                    icon: Users,
                    color: "bg-purple-50 border-purple-100",
                  },
                  {
                    date: "25 Apr 2025",
                    text: "Launch of R&D activities in the fields of robotics, imaging, and plant-based medicines.",
                    icon: Microscope,
                    color: "bg-emerald-50 border-emerald-100",
                  },
                  {
                    date: "01 May 2025",
                    text: "Commencement of construction activities at the AAHII campus.",
                    icon: Hammer,
                    color: "bg-red-50 border-red-100",
                  },
                  {
                    date: "01 Aug 2025",
                    text: "AAHII becomes an incubator and calls for innovative proposals under Project NIRAMAYA.",
                    icon: Rocket,
                    color: "bg-blue-50 border-blue-100",
                  },
                  {
                    date: "Oct 2027",
                    text: "Targeted completion of the AAHII campus and core institutional facilities.",
                    icon: Building2,
                    color: "bg-yellow-50 border-yellow-100",
                  },
                ].map(({ date, text, icon: Icon, color }) => (
                  <li key={date} className="relative">
                    {/* Icon */}
                    <span className="absolute -left-[22px] top-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white shadow-md">
                      <Icon size={18} />
                    </span>

                    {/* Card */}
                    <div className={`rounded-xl border border-blue-100  p-5 shadow-sm transition hover:shadow-md ${color}`}>
                      <p className="text-sm font-semibold text-blue-700">
                        {date}
                      </p>
                      <p className="mt-1 text-sm sm:text-base text-gray-700">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* FOCUS AREAS */}

          {activeTab === "focus" && (
            <div className="space-y-12">
              {/* Header */}
              <header className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">
                  Our Focus Areas in Research & Development
                </h2>
                <div className="h-1 w-12 bg-blue-700 rounded-full" />
              </header>

              {/* Intro */}
              <p className="max-w-4xl text-sm sm:text-base leading-relaxed text-gray-700">
                The AAHII campus will support focused Centres of Excellence
                spanning precision medicine, advanced diagnostics, medical
                robotics, nanotherapeutics, integrated medicine, and data-driven
                healthcare. These centres will enable structured pathways for
                research translation, clinical validation, and large-scale
                technology adoption.
              </p>

              {/* Research Focus Grid */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Centres of Excellence
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { label: "Precision Medicine", icon: Microscope, color: "bg-indigo-50 border-indigo-100" },
                    {
                      label: "Advanced Diagnostics & Imaging",icon: Stethoscope, color: "bg-sky-50 border-sky-100"},
                    { label: "Medical Robotics", icon: Bot, color: "bg-amber-50 border-amber-100" },
                    { label: "Nanotherapeutics", icon: Atom, color: "bg-emerald-50 border-emerald-100" },
                    { label: "Integrated & Regenerative Medicine", icon: Cpu, color: "bg-violet-50 border-violet-100" },
                    {
                      label: "Data-Driven & Digital Healthcare",icon: Database,color: "bg-rose-50 border-rose-100",
                    },
                  ].map(({ label, icon: Icon, color }) => (
                    <div key={label}
                      className={`flex items-start gap-4 rounded-xl border border-gray-200  p-5 transition hover:border-blue-700/40 hover:shadow-sm ${color}`}>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-700/10 text-blue-700">
                        <Icon size={20} />
                      </span>
                      <p className="font-medium text-gray-800">{label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Clinical Backbone */}
              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Hospital className="text-blue-700" size={22} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Clinical & Infrastructure Backbone
                  </h3>
                </div>

                <p className="max-w-4xl text-sm sm:text-base leading-relaxed text-gray-700">
                  These research capabilities are anchored by a 400-bed
                  super-specialty hospital delivering complex tertiary and
                  quaternary care across surgery, transplantation, cardiac
                  sciences, critical care, emergency and trauma care, infectious
                  and neglected diseases, and regenerative medicine.
                </p>
              </section>

              {/* Talent & Innovation */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl border border-gray-200 bg-blue-50 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <GraduationCap className="text-blue-700" size={22} />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Talent Development
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                    AAHII integrates postgraduate medical education with
                    doctoral and advanced engineering programs, enabling the
                    development of clinician–scientists, biomedical engineers,
                    and translational researchers.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-amber-50 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="text-blue-700" size={22} />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Innovation & Investment Platform
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                    Close collaboration with IIT Guwahati and leading clinicians
                    creates a steady pipeline of health-technology innovation.
                    This integrated model positions AAHII as a long-term
                    investment opportunity across advanced healthcare
                    infrastructure, research platforms, and scalable health
                    technologies, supported by strong public governance and
                    policy alignment.
                  </p>
                </div>
              </section>
            </div>
          )}
             </motion.div>
            </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
