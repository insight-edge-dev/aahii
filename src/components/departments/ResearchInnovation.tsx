"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, } from "framer-motion";
import {
  Microscope,
  Brain,
  Cpu,
  FlaskConical,
  Activity,
  Stethoscope,
  Bot,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const DATA = [
  {
    id: "non-invasive",
    label: "Invasive to Non-Invasive",
    icon: Microscope,
    image: "/images/invasive.jpg",
    title: "Invasive to Non-Invasive Diagnostics",
    quote: "Transforming diagnostics for safer, faster patient care.",
    focusAreas: [
      {
        title: "Advanced Technology",
        desc: "Advance non-invasive and minimally invasive diagnostic technologies.",
      },
      {
        title: "Early Detection",
        desc: "Develop early-detection tools using imaging, biomarkers, and integrated smart sensors.",
      },
      {
        title: "Continuous Monitoring",
        desc: "Enable continuous, comfortable health monitoring through wearable bio-electronics.",
      },
      {
        title: "Patient Comfort",
        desc: "Reduce patient risk, discomfort, and diagnostic delays with immediate bedside results.",
      },
    ],
  },
  {
    id: "personalized-medicine",
    label: "Personalized Medicine",
    icon: Brain,
    image: "/images/Personalized-Medicine.jpg",
    title: "Personalized Precision Medicine",
    quote: "Precision healthcare designed for every individual.",
    focusAreas: [
      {
        title: "Genomic Profiling",
        desc: "Utilize genomics, proteomics, and molecular profiling.",
      },
      {
        title: "Predictive Health",
        desc: "Develop personalized drug and treatment strategies.",
      },
      {
        title: "Precision Therapies",
        desc: "Enable early disease detection through data-driven diagnostics.",
      },
      {
        title: "Tailored Interventions",
        desc: "Apply pharmacogenomics to reduce side effects and improve outcomes.",
      },
    ],
  },
  {
    id: "multi-scale-robotics",
    label: "Multi Scale Robotics",
    icon: Cpu,
    image: "/images/robotics.jpg",
    title: "Multi-Scale Medical Robotics",
    quote: "Robotics innovation from nano to macro healthcare solutions.",
    focusAreas: [
      {
        title: "Micro Robotics",
        desc: "Design nano-robots for targeted drug delivery.",
      },
      {
        title: "Surgical Robotics",
        desc: "Enhancing surgical precision and consistency.",
      },
      {
        title: "Automation Systems",
        desc: "Integrate AI, sensors, and advanced materials into healthcare robotics.",
      },
      {
        title: "Rehabilitation Robotics",
        desc: "Develop robots to assist patient recovery and mobility.",
      },
    ],
  },
  {
    id: "nano-therapeutics",
    label: "Nano Therapeutics",
    icon: FlaskConical,
    image: "/images/nano.jpg",
    title: "Nano Therapeutics & Drug Delivery",
    quote: "Revolutionizing treatment at the nanoscale.",
    focusAreas: [
      {
        title: "Targeted Drug Delivery",
        desc: "Engineered nanoparticles for targeted drug delivery.",
      },
      {
        title: "Reduced Side Effects",
        desc: "Minimize side effects while improving treatment effectiveness.",
      },
      {
        title: "Smart Nano Systems",
        desc: "Explore biomimetic and smart nanomaterials.",
      },
      {
        title: "Theranostics",
        desc: "Develop nanocarriers for gene therapy and regenerative medicine.",
      },
    ],
  },
  {
    id: "integrated-medicine",
    label: "Integrated Medicine",
    icon: Activity,
    image: "/images/Integrated-Medicine.jpg",
    title: "Integrated & Holistic Medicine",
    quote: "Where traditional wisdom meets modern science.",
    focusAreas: [
      {
        title: "Cross-Disciplinary Care",
        desc: "Integrate Ayurveda, Yoga, and traditional practices with modern medicine.",
      },
      {
        title: "Unified Data Systems",
        desc: "Single patient view across multiple medical domains.",
      },
      {
        title: "Outcome-Based Treatment",
        desc: "Focus on long-term patient well-being.",
      },
      {
        title: "Preventive Health",
        desc: "Promote preventive and lifestyle-based healthcare.",
      },
    ],
  },
  {
    id: "ml-icu",
    label: "Machine Learning & Big Data (ICU)",
    icon: Stethoscope,
    image: "/images/icu.jpg",
    title: "AI & Machine Learning in ICU",
    quote: "Smarter ICUs powered by data and AI.",
    focusAreas: [
      {
        title: "Real-Time Monitoring",
        desc: "Continuous analysis of ICU patient vitals.",
      },
      {
        title: "Predictive Alerts",
        desc: "Early warning systems for clinical deterioration.",
      },
      {
        title: "Decision Support",
        desc: "AI-assisted clinical decision making.",
      },
      {
        title: "Resource Optimization",
        desc: "Optimize ICU resource allocation and workflow.",
      },
    ],
  },
  {
    id: "rehab-robots",
    label: "Rehabilitation Robots",
    icon: Bot,
    image: "/images/Robo.jpg",
    title: "Rehabilitation Robotics",
    quote: "Redefining recovery through intelligent robotics.",
    focusAreas: [
      {
        title: "Assistive Robotics",
        desc: "Support patient mobility and rehabilitation.",
      },
      {
        title: "Adaptive Therapy",
        desc: "Provide personalized, adaptive therapy solutions.",
      },
      {
        title: "Remote Rehabilitation",
        desc: "Extend therapy beyond hospital settings.",
      },
      {
        title: "Patient Engagement",
        desc: "Track patient progress with precision and insights.",
      },
    ],
  },
];

export default function ResearchInnovation() {
  const [activeTab, setActiveTab] = useState(DATA[0]);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);

    if (window.innerWidth < 768) {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#f8fbff] py-12 md:py-20">


      <div className="max-w-[1400px] mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0b1b3a]">
            UPCOMING RESEARCH &{" "}
            <span className="text-blue-500">INNOVATION POSSIBILITIES</span>
          </h2>
          <p className="mt-4 text-gray-500">
            At AAHII, we are pioneering the next generation of medical solutions
            through interdisciplinary research and advanced technology.
          </p>
        </div>

        {/* Tabs */}
        <div
  className="
    flex gap-4
    overflow-x-auto
    flex-nowrap
    px-2
    md:flex-wrap md:justify-center md:overflow-visible md:px-0
    scroll-smooth
  "
>
  {DATA.map((tab) => {
    const Icon = tab.icon;
    const isActive = activeTab.id === tab.id;

    return (
      <button
        key={tab.id}
        onClick={() => handleTabClick(tab)}
        className="
          flex flex-col items-center gap-1 text-xs
          min-w-[80px] shrink-0
          sm:gap-2 sm:text-sm
        "
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-200
            ${
              isActive
                ? "bg-blue-500 shadow-lg scale-105"
                : "bg-white border shadow-sm hover:shadow-md"
            }`}
        >
          <Icon
            className={`w-5 h-5 ${
              isActive ? "text-white" : "text-blue-500"
            }`}
          />
        </div>

        <span className="text-center max-w-[90px] text-gray-700 leading-tight">
          {tab.label}
        </span>
      </button>
    );
  })}
</div>


        {/* Content */}
        <div
          ref={contentRef}
          className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mt-12 md:mt-20"
        >
          <div>
            <div className="mb-6 md:mb-10 max-w-xl">
              <h3 className="text-2xl font-bold text-[#0b1b3a]">
                {activeTab.title}
              </h3>
              <p className="text-gray-500 mt-2 italic">
                “{activeTab.quote}”
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={activeTab.image}
                alt={activeTab.title}
                width={700}
                height={500}
                className="w-full h-[220px] sm:h-[300px] md:h-full object-cover"
              />
            </div>
          </div>

          {/* Focus Areas */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 sm:p-6 md:p-8 rounded-3xl shadow-lg">
            <h4 className="text-xl font-bold text-[#0b1b3a] mb-6">
              Our Focus Areas
            </h4>

            <ul className="space-y-5">
              {activeTab.focusAreas.map((area, i) => (
                <li key={i} className="flex gap-4">
                  <CheckCircle2 className="text-blue-500 mt-1" />
                  <div>
                    <h5 className="font-semibold text-[#0b1b3a]">
                      {area.title}
                    </h5>
                    <p className="text-sm text-gray-600">{area.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
