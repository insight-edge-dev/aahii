"use client";

import Image from "next/image";
import { Activity, Microscope, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import AdminLoginModal from "@/lib/features/admin/components/auth/AdminLoginModal";

const highlights = [
  {
    icon: Microscope,
    label: "Healthcare innovation",
  },
  {
    icon: Activity,
    label: "Research-led clinical systems",
  },
  {
    icon: ShieldCheck,
    label: "Secure administrative access",
  },
];

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Image
          src="/hero/hero1.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover blur-[14px]"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#071b45]/70 via-[#0f2a6d]/35 to-black/50" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_460px]">
          <motion.section
            className="hidden max-w-2xl text-white lg:block"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
              AAHII Admin Portal
            </p>
            <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight">
              Assam Advanced Healthcare Innovation Institute
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-blue-50/90">
              Secure access for institutional teams advancing healthcare
              innovation, translational research, and public health initiatives.
            </p>

            <div className="mt-9 grid gap-3">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-sm backdrop-blur"
                  key={label}
                >
                  <Icon className="size-5 text-blue-200" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <AdminLoginModal />
        </div>
      </div>
    </main>
  );
}
