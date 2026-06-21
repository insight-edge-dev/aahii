"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

type LoginTransitionProps = {
  active?: boolean;
  onComplete: () => void;
};

const steps = [
  "Preparing workspace...",
  "Loading dashboard modules...",
  "Redirecting to Admin Dashboard...",
];

export default function LoginTransition({
  active = true,
  onComplete,
}: LoginTransitionProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex] ?? steps[steps.length - 1];
  const progress = useMemo(
    () => `${((stepIndex + 1) / steps.length) * 100}%`,
    [stepIndex],
  );

  useEffect(() => {
    if (!active) {
      return;
    }

    let cancelled = false;

    const timers = [
      window.setTimeout(() => {
        if (!cancelled) setStepIndex(1);
      }, 550),
      window.setTimeout(() => {
        if (!cancelled) setStepIndex(2);
      }, 1100),
      window.setTimeout(() => {
        if (!cancelled) onComplete();
      }, 1700),
    ];

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          aria-live="assertive"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/25 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
        >
          <motion.div
            className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-[0_28px_80px_rgba(15,23,42,0.22)]"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex size-20 items-center justify-center rounded-2xl border border-blue-50 bg-gradient-to-br from-white to-blue-50 shadow-inner">
              <Image
                src="/logos/aahii-logo.png"
                alt="AAHII"
                width={58}
                height={58}
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[#0f2a6d]">
              <CheckCircle2 className="size-6" aria-hidden="true" />
              <h1 className="text-2xl font-bold tracking-tight">
                Authentication Successful
              </h1>
            </div>

            <p className="mt-3 text-sm font-medium text-slate-600">
              Setting up your dashboard session...
            </p>

            <div className="mt-6 rounded-2xl border border-blue-50 bg-blue-50/70 p-4">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#0f2a6d]">
                <ShieldCheck className="size-4" aria-hidden="true" />
                <span>{currentStep}</span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#0f2a6d] via-blue-500 to-sky-400"
                  animate={{ width: progress }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              </div>

              <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">
                {steps.map((step, index) => (
                  <motion.span
                    key={step}
                    className="size-2 rounded-full bg-blue-500"
                    animate={{
                      opacity: index <= stepIndex ? 1 : 0.28,
                      scale: index === stepIndex ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                  />
                ))}
              </div>
            </div>

            <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              Redirecting to Admin Dashboard
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
