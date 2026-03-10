"use client";
import Image from "next/image";
import {
  Leaf,
  Settings,
  Layers,
  User,
  BarChart3,
  Cpu,
  CheckCircle2,
  Building2,
  GraduationCap,
  Home,
  Hospital,
  LandPlot,
} from "lucide-react";
import ConstructionGallery from "@/components/infra/ConstructionGallery";
import GallerySection from "@/components/infra/GallerySection";
const UPCOMING_HOSPITAL_IMAGES = [
  "/upcoming/1.jpg",
  "/upcoming/2.png",
  "/upcoming/3.png",
  "/upcoming/4.png",
  "/upcoming/5.png",
  "/upcoming/6.jpg",
  "/upcoming/7.png",
  "/upcoming/8.jpg",
  "/upcoming/9.png",
  "/upcoming/10.png",
  "/upcoming/11.png",
  "/upcoming/12.png",

];
export default function InfrastructurePage() {
  
  return (
    <section className="bg-[#f9fcff] py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-28">
        {/* ================================================= */}
        {/* INFRASTRUCTURE OVERVIEW */}
        {/* ================================================= */}
        <section>
          <h2 className="text-4xl font-bold text-[#3c73fe] text-center mb-16">
            INFRASTRUCTURE
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/infra.png"
                alt="Integrated Healthcare & R&D Campus"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-white">
                <p className="font-semibold text-blue-700">
                  Integrated Healthcare & R&D Campus
                </p>
                <p className="text-sm text-gray-600">
                  A future-ready ecosystem combining clinical care, research,
                  and academia.
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Project Introduction
              </h3>
              <p className="text-gray-600 mb-8">
                The Centre of Excellence in Healthcare R&D facility is
                conceptualized as a single, scalable campus within IIT Guwahati
                to support advanced healthcare delivery, interdisciplinary
                research, and education.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                <div
                  className="group bg-white p-5 rounded-xl border 
    transition-all duration-300 hover:-translate-y-1
    hover:bg-blue-600 hover:border-blue-600 hover:shadow-md
  "
                >
                  <Hospital className="text-blue-600 mb-2 transition-colors group-hover:text-white" />
                  <h4 className="font-semibold transition-colors group-hover:text-white">
                    Research & Development Block
                  </h4>
                  <p className="text-sm text-gray-600 transition-colors group-hover:text-white">
                    Interdisciplinary R&D in health sciences and medical
                    technologies.
                  </p>
                </div>

                <div
                  className="group bg-white p-5 rounded-xl border 
    transition-all duration-300 hover:-translate-y-1
    hover:bg-blue-600 hover:border-blue-600 hover:shadow-md
  "
                >
                  <Building2 className="text-blue-600 mb-2 transition-colors group-hover:text-white" />
                  <h4 className="font-semibold transition-colors group-hover:text-white">
                    Super-Specialty Hospital
                  </h4>
                  <p className="text-sm text-gray-600 transition-colors group-hover:text-white">
                    Advanced clinical services with national & global
                    connectivity.
                  </p>
                </div>

                <div
                  className="group bg-white p-5 rounded-xl border 
    transition-all duration-300 hover:-translate-y-1
    hover:bg-blue-600 hover:border-blue-600 hover:shadow-md
  "
                >
                  <GraduationCap className="text-blue-600 mb-2 transition-colors group-hover:text-white" />
                  <h4 className="font-semibold transition-colors group-hover:text-white">
                    Academic Program
                  </h4>
                  <p className="text-sm text-gray-600 transition-colors group-hover:text-white">
                    Integrated medical, engineering, and health sciences
                    curriculum.
                  </p>
                </div>

                <div
                  className="group bg-white p-5 rounded-xl border 
    transition-all duration-300 hover:-translate-y-1
    hover:bg-blue-600 hover:border-blue-600 hover:shadow-md
  "
                >
                  <Home className="text-blue-600 mb-2 transition-colors group-hover:text-white" />
                  <h4 className="font-semibold transition-colors group-hover:text-white">
                    Residential Infrastructure
                  </h4>
                  <p className="text-sm text-gray-600 transition-colors group-hover:text-white">
                    Housing for faculty, staff, PG students, interns, and
                    nurses.
                  </p>
                </div>
              </div>

              <div className="flex gap-12">
                <div>
                  <p className="text-2xl font-bold text-blue-700">
                    14.44 Acres
                  </p>
                  <p className="text-xs text-gray-500">TOTAL CAMPUS AREA</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">G+5 / G+6</p>
                  <p className="text-xs text-gray-500">
                    VERTICAL EXPANSION READY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* DESIGN FEATURES + R&D BLOCK */}
        {/* ================================================= */}
        <section className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">
              Design Features
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Settings className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Helipad</h4>
                  <p className="text-sm text-gray-600">
                    Provision of a rooftop helipad to support emergency medical
                    services and critical patient transfers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Layers className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Connecting Bridge</h4>
                  <p className="text-sm text-gray-600">
                    Steel bridge connecting R&D and Hospital blocks as an
                    independent structure with expansion joints.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Building2 className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Facade & Solar Integration</h4>
                  <p className="text-sm text-gray-600">
                    Facade load-bearing solar elements considered as per
                    architectural and structural requirements.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <LandPlot className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Cricket Ground Retention</h4>
                  <p className="text-sm text-gray-600">
                    Existing cricket ground of approximately 4 acres retained on
                    the south-east side of the site.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* R&D Block Card */}
          <div className="bg-gradient-to-br from-slate-700 to-teal-700 text-white rounded-2xl p-10 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              R&D cum Academic Block (G+4)
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                "Invasive to non-invasive diagnostics",
                "Personalized medicine",
                "Multi-scale robotics",
                "Nano-therapeutics",
                "Integrated medicine",
                "AI & Big Data in ICU settings",
                "Rehabilitation robots",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <CheckCircle2 className="text-emerald-400 mt-0.5" size={16} />
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-6 bg-white text-teal-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
              Explore Research Facilities
            </button>
          </div>
        </section>
        {/* ================================================= */}
        {/* OVERALL PLANNING OBJECTIVES */}
        {/* ================================================= */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            Overall Planning Objectives
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: "Sustainable & Green",
                desc: "Holistic campus development focused on environmental harmony and carbon-neutral goals.",
              },
              {
                icon: Settings,
                title: "Adaptable Infrastructure",
                desc: "Modern, iconic, and future-ready spaces that evolve with medical breakthroughs.",
              },
              {
                icon: Layers,
                title: "High Flexibility",
                desc: "Accommodating future technological advancements without structural overhauls.",
              },
              {
                icon: User,
                title: "Patient-Oriented",
                desc: "Designing from the patient's perspective to ensure ease of access, comfort, and safety.",
              },
              {
                icon: BarChart3,
                title: "Evidence-Based",
                desc: "Every architectural choice is backed by clinical data and research insights.",
              },
              {
                icon: Cpu,
                title: "Tech Integration",
                desc: "Seamlessly blending medical equipment with physical space for optimal workflow.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl p-6 shadow-sm border
    transition-all duration-300 hover:-translate-y-1
    hover:bg-blue-600 hover:border-blue-600 hover:shadow-md"
              >
                <item.icon className="text-blue-600 mb-3 transition-colors group-hover:text-white" />

                <h4 className="font-semibold mb-1 transition-colors group-hover:text-white">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-600 transition-colors group-hover:text-white">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* ================================================= */}
        {/* HEALING ENVIRONMENT */}
        {/* ================================================= */}
        <section>
          <h2 className="text-3xl font-bold text-center text-black-600 mb-4">
            Healing Environment for Patients
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            The design concept emphasizes creating healing environments both
            inside and outside the clinical buildings to support patient
            recovery and mental well-being.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Link to Nature & Outside World",
                desc: "Green surroundings, podium landscapes, and terrace gardens enhance patient well-being and visual comfort.",
              },
              {
                title: "Sense of Privacy",
                desc: "The built environment safeguards patient and personal privacy through thoughtful spatial planning.",
              },
              {
                title: "Well-Planned IPD Wards",
                desc: "IPD wards are designed with adequate sunlight, nursing efficiency, and essential support areas.",
              },
              {
                title: "Hospital Street & Social Spaces",
                desc: "All clinical blocks are interconnected via a hospital street with breakout spaces, cafeterias, and lobbies.",
              },
              {
                title: "Places for Relaxation",
                desc: "Refuge green terraces, landscaped courtyards, and terrace gardens provide spaces for relaxation and rejuvenation.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl p-6 shadow-sm border
    transition-all duration-300 hover:-translate-y-1
    hover:bg-blue-600 hover:border-blue-600 hover:shadow-md">
                <h4 className="font-semibold text-blue-700 mb-2 transition-colors group-hover:text-white">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-600 transition-colors group-hover:text-white">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
     <ConstructionGallery />
       <GallerySection
      subtitle="Upcoming Infrastructure"
      title="Hospital"
      description="A glimpse into our upcoming world-class healthcare campus."
      images={UPCOMING_HOSPITAL_IMAGES}
    />
    </section>
  );
}
