"use client";

import Image from "next/image";
import { motion, type Variants, useReducedMotion } from "framer-motion";

type Researcher = {
  name: string;
  role: string;
  initials: string;
  kind: "Researcher" | "Consultant" | "Contractor";
  image?: string;
};

type Project = {
  number: string;
  phase: string;
  title: string;
  researchers: Researcher[];
};

const projects: Project[] = [
  {
    number: "01",
    phase: "Phase 1",
    title: "Development of Plant-based Drug for Treatment of Rheumatoid Arthritis",
    researchers: [
      {
        name: "Vaghela Darshankumar Jagdishchandra",
        role: "Research Associate",
        initials: "VD",
        kind: "Researcher",
      },
      {
        name: "Varnita Karmakar",
        role: "Research Associate",
        initials: "VK",
        kind: "Researcher",
        image: "/research/project-teams/varnita-karmakar.png",
      },
    ],
  },
  {
    number: "02",
    phase: "Phase 2",
    title: "Development of Indigenous Prototype of Multi-arm Surgical Robot",
    researchers: [
      {
        name: "Jagannath Prasad Sahoo",
        role: "Robotics Engineer Intern",
        initials: "JS",
        kind: "Researcher",
        image: "/research/project-teams/jagannath-prasad-sahoo.jpg",
      },
      {
        name: "Parvesh Kumar",
        role: "Senior Robotics Consultant",
        initials: "PK",
        kind: "Consultant",
        image: "/research/project-teams/parvesh-kumar.jpg",
      },
      {
        name: "Dr. Sreekanth Kana",
        role: "Motion Planning Contractor",
        initials: "SK",
        kind: "Contractor",
        image: "/research/project-teams/sreekanth-kana.jpg",
      },
    ],
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function PortraitFigure({
  researcher,
  projectNumber,
  className = "",
}: {
  researcher: Researcher;
  projectNumber: string;
  className?: string;
}) {
  return (
    <figure className={`group/portrait min-w-0 ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-[#c8d4e0] bg-[#102b55] shadow-[0_18px_45px_-38px_rgba(14,38,73,0.85)] transition-[border-color,box-shadow] duration-300 group-hover/portrait:border-[#91a9c2] group-hover/portrait:shadow-[0_24px_52px_-38px_rgba(14,38,73,0.95)] motion-reduce:transition-none">
        {researcher.image ? (
          <Image
            src={researcher.image}
            alt={`${researcher.name} \u2014 ${researcher.role}, AAHII`}
            fill
            sizes="(max-width: 767px) 46vw, (max-width: 1023px) 40vw, 28vw"
            className="object-cover object-top transition-transform duration-300 ease-out group-hover/portrait:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            role="img"
            aria-label={`Portrait not yet available for ${researcher.name}, ${researcher.role} at AAHII`}
          >
            <span
              aria-hidden="true"
              className="select-none text-[clamp(3.25rem,7vw,5.75rem)] font-light tracking-[-0.07em] text-white/90"
            >
              {researcher.initials}
            </span>
          </div>
        )}
      </div>

      <figcaption className="pt-4 sm:pt-5">
        <div className="flex items-center gap-2.5">
          <p className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-blue-600/70 transition-colors duration-300 group-hover/portrait:text-blue-700 motion-reduce:transition-none sm:text-[10px]">
            P{projectNumber} {"\u00B7"} {researcher.kind}
          </p>
          <span className="h-px flex-1 bg-[#d4dee8]" />
        </div>
        <p className="mt-2.5 text-[13px] font-semibold leading-[1.3] text-[#10284d] sm:text-base">
          {researcher.name}
        </p>
        <p className="mt-1.5 text-xs leading-snug text-slate-500 sm:text-sm">
          {researcher.role}
        </p>
      </figcaption>
    </figure>
  );
}

function ProjectEditorial({ project }: { project: Project }) {
  const teamCount = String(project.researchers.length).padStart(2, "0");
  const prefersReducedMotion = useReducedMotion();
  const portraitLayouts =
    project.researchers.length === 2
      ? ["md:col-span-7", "md:col-span-5 md:mt-24"]
      : [
          "md:col-span-5 md:mt-20",
          "md:col-span-4",
          "col-span-2 w-[calc(50%_-_0.375rem)] justify-self-center md:col-span-3 md:mt-32 md:w-full",
        ];

  return (
    <motion.article
      variants={reveal}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.16 }}
      className="grid min-w-0 gap-12 border-t border-[#ccd8e4] py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24 xl:gap-20"
    >
      <header className="min-w-0 lg:col-span-5 lg:pt-12">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">
            Project {project.number}
          </span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#4c9a68]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.19em] text-[#516b83]">
            {project.phase}
          </span>
        </div>

        <h3 className="mt-7 max-w-[11ch] text-[clamp(2.35rem,4.35vw,4.65rem)] font-semibold leading-[1.01] tracking-[-0.05em] text-[#0a2146]">
          {project.title}
        </h3>

        <div className="mt-9 flex items-center gap-3 border-t border-[#d7e0e9] pt-5 sm:max-w-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#24486f]">
            Research team
          </span>
          <span aria-hidden="true" className="text-slate-300">
            {"\u00B7"}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {teamCount} contributors
          </span>
        </div>
      </header>

      <div className="grid min-w-0 grid-cols-2 items-start gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-12 lg:col-span-7 lg:gap-x-5">
        {project.researchers.map((researcher, index) => (
          <PortraitFigure
            key={researcher.name}
            researcher={researcher}
            projectNumber={project.number}
            className={portraitLayouts[index]}
          />
        ))}
      </div>
    </motion.article>
  );
}

export default function ProjectResearchTeams() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="overflow-hidden border-t border-slate-200 bg-[#f7f9fb] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-10">
        <motion.div
          variants={reveal}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.35 }}
          className="mb-4 grid items-end gap-8 md:grid-cols-[1.08fr_0.92fr] lg:mb-8"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-blue-600" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                AAHII {"\u00B7"} Research &amp; Innovation
              </p>
            </div>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.7rem,5.25vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0a2146]">
              Project-Wise Research Team
            </h2>
          </div>

          <div className="md:pb-1">
            <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Meet the researchers, consultants and technical experts contributing to
              AAHII&apos;s ongoing healthcare innovation projects.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#48637c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#48a56a]" />
              Ongoing projects
            </div>
          </div>
        </motion.div>

        <div>
          {projects.map((project) => (
            <ProjectEditorial key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
