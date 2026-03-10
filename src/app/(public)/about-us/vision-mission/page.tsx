"use client";

import { useState } from "react";
import {
  Eye,
  Target,
  Building2,
  ChevronDown,
  Layers,
  Globe,
  TrendingUp,
} from "lucide-react";

/* ---------- Types ---------- */
type OpenState = {
  vision: boolean;
  mission: boolean;
  invest: boolean;
};

type OpenKey = keyof OpenState;

/* ---------- Component ---------- */
export default function VisionMissionPage() {
  const [open, setOpen] = useState<OpenState>({
    vision: true,
    mission: true,
    invest: true,
  });

  const toggle = (key: OpenKey) => {
    setOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <main>
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

        {/* ================= Vision ================= */}
        <section
          className="relative rounded-2xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/about/vision.jpeg')" }}
        >
          <div className="absolute inset-0 bg-white/80" />

          <div className="relative p-10">
            <button
              onClick={() => toggle("vision")}
              className="w-full flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-3">
                <Eye className="w-7 h-7 text-blue-900" />
                <h2 className="text-2xl font-semibold text-blue-900">
                  Vision
                </h2>
              </div>

              <ChevronDown
                className={`w-7 h-7 text-blue-900 transition-transform duration-300
                ${open.vision ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out
              ${open.vision ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="text-gray-800 leading-relaxed">
                  To establish AAHII as a globally recognised hub for advanced
                  healthcare research and innovation, translating cutting-edge
                  science and technology into scalable, high-impact healthcare
                  solutions that improve patient outcomes and shape the future
                  of medicine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Mission ================= */}
        <section
          className="relative rounded-2xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/about/mission.jpeg')" }}
        >
          <div className="absolute inset-0 bg-blue-900/70" />

          <div className="relative p-10">
            <button
              onClick={() => toggle("mission")}
              className="w-full flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-3">
                <Target className="w-7 h-7 text-white" />
                <h2 className="text-2xl font-semibold text-white">
                  Mission
                </h2>
              </div>

              <ChevronDown
                className={`w-7 h-7 text-white transition-transform duration-300
                ${open.mission ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out
              ${open.mission ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden space-y-4">
                <p className="text-blue-50 leading-relaxed">
                  AAHII’s mission is to advance interdisciplinary research and
                  innovation across precision medicine, digital health, medical
                  robotics, and regenerative therapies.
                </p>

                <p className="text-blue-50 leading-relaxed">
                  Built through a partnership between the Government of Assam
                  and IIT Guwahati, the institute is designed to generate
                  measurable clinical impact and innovation-led growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Invest ================= */}
        <section
          className="relative rounded-2xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/about/invest.png')" }}
        >
          <div className="absolute inset-0 bg-white/85" />

          <div className="relative p-10">
            <button
              onClick={() => toggle("invest")}
              className="w-full flex items-center justify-between mb-10"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-7 h-7 text-blue-900" />
                <h2 className="text-2xl font-semibold text-blue-900">
                  Why Partner / Why Invest?
                </h2>
              </div>

              <ChevronDown
                className={`w-7 h-7 text-blue-900 transition-transform duration-300
                ${open.invest ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out
              ${open.invest ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: Building2,
                    title: "Credible Institutional Anchoring",
                    text:
                      "Established by the Government of Assam in partnership with IIT Guwahati.",
                  },
                  {
                    icon: Layers,
                    title: "Integrated, Scalable Model",
                    text:
                      "Unified platform combining clinical care, research, and health technology.",
                  },
                  {
                    icon: Globe,
                    title: "Access to High-Growth Markets",
                    text:
                      "Strategically located to serve North-East India and neighbouring regions.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Sustainable Impact with Returns",
                    text:
                      "Delivers measurable outcomes with ESG-aligned returns.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-blue-900" />
                      <h3 className="text-lg font-semibold text-blue-900">
                        {title}
                      </h3>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
