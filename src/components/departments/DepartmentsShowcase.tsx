"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Baby,
  BadgePlus,
  Brain,
  ChevronDown,
  CircleDot,
  Dna,
  FlaskConical,
  HeartPulse,
  Hospital,
  Microscope,
  Pill,
  Scissors,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

export type DepartmentIconKey =
  | "activity"
  | "baby"
  | "badge-plus"
  | "brain"
  | "circle-dot"
  | "dna"
  | "flask"
  | "heart-pulse"
  | "hospital"
  | "microscope"
  | "pill"
  | "scissors"
  | "shield-plus"
  | "stethoscope"
  | "syringe"
  | "users";

export type DepartmentCard = {
  name: string;
  description: string;
  detail: string;
  status: string;
  category: string;
  icon: DepartmentIconKey;
};

export type DepartmentGroup = {
  title: string;
  description: string;
  departments: DepartmentCard[];
};

export type DepartmentStat = {
  label: string;
  value: string;
  description: string;
};

type DepartmentsShowcaseProps = {
  eyebrow: string;
  title: string;
  intro: string;
  stats: DepartmentStat[];
  groups: DepartmentGroup[];
};

const iconMap = {
  activity: Activity,
  baby: Baby,
  "badge-plus": BadgePlus,
  brain: Brain,
  "circle-dot": CircleDot,
  dna: Dna,
  flask: FlaskConical,
  "heart-pulse": HeartPulse,
  hospital: Hospital,
  microscope: Microscope,
  pill: Pill,
  scissors: Scissors,
  "shield-plus": ShieldPlus,
  stethoscope: Stethoscope,
  syringe: Syringe,
  users: Users,
} satisfies Record<DepartmentIconKey, LucideIcon>;

function DepartmentIcon({ icon }: { icon: DepartmentIconKey }) {
  const Icon = iconMap[icon];

  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#1e3a8a] transition-colors duration-300 group-hover:border-blue-200 group-hover:bg-white">
      <Icon aria-hidden="true" className="size-5" />
    </div>
  );
}

function DepartmentCardItem({ department }: { department: DepartmentCard }) {
  const [expanded, setExpanded] = useState(false);
  const detailId = `${department.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-detail`;

  return (
    <article className="group flex flex-col self-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="flex items-start gap-4">
        <DepartmentIcon icon={department.icon} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-700">
              {department.status}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              {department.category}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-snug text-[#0b1b3a]">
            {department.name}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {department.description}
      </p>

      <div
        id={detailId}
        className={clsx(
          "overflow-hidden transition-all duration-300",
          expanded ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <p className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700">
          {department.detail}
        </p>
      </div>

      <button
        type="button"
        aria-controls={detailId}
        aria-expanded={expanded}
        className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-semibold text-[#1e3a8a] transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        onClick={() => setExpanded((current) => !current)}
      >
        Learn More
        {expanded ? (
          <ChevronDown className="size-4 rotate-180 transition-transform" />
        ) : (
          <ArrowRight className="size-4" />
        )}
      </button>
    </article>
  );
}

export default function DepartmentsShowcase({
  eyebrow,
  title,
  intro,
  stats,
  groups,
}: DepartmentsShowcaseProps) {
  return (
    <main className="relative overflow-hidden bg-[#f7fbff]">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_20px_20px,rgba(30,58,138,0.08)_1px,transparent_0),linear-gradient(135deg,rgba(59,130,246,0.08),transparent_38%,rgba(14,165,233,0.08))] [background-size:32px_32px,100%_100%]" />

      <section className="relative px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#0b1b3a] md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              {intro}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/70 bg-white/85 p-5 text-center shadow-sm backdrop-blur"
              >
                <p className="text-3xl font-bold text-[#1e3a8a]">{stat.value}</p>
                <h2 className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-800">
                  {stat.label}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-20">
        <div className="mx-auto max-w-7xl space-y-14">
          {groups.map((group) => (
            <section key={group.title} aria-labelledby={`${group.title}-heading`}>
              <div className="mb-6 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                  Category
                </p>
                <h2
                  id={`${group.title}-heading`}
                  className="mt-2 text-2xl font-bold text-[#0b1b3a] md:text-3xl"
                >
                  {group.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                  {group.description}
                </p>
              </div>

              <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.departments.map((department) => (
                  <DepartmentCardItem
                    department={department}
                    key={department.name}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
