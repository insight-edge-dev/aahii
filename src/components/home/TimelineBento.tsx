"use client";

import Image from "next/image";
import { Building2, ClipboardCheck, DraftingCompass, FileText, HardHat } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import styles from "./TimelineBento.module.css";

const milestones = [
  { year: "2022–23", title: "DPR completed", details: ["Detailed Project Report (DPR) finalized, laying the foundation for AAHII."], image: "/about/timeline/aahii-timeline-dpr.webp", imageAlt: "Detailed project report and healthcare masterplan documents on a desk", icon: FileText },
  { year: "2023–24", title: "Concept, Planning & Design", details: ["Conceptualization, master planning and architectural design developed.", "Onboarding of key personnel and architect/PMC."], image: "/about/timeline/aahii-timeline-planning.webp", imageAlt: "Healthcare campus planning drawings and architectural model", icon: DraftingCompass },
  { year: "2024–25", details: ["Drawing Finalization", "Tenders Floated"], image: "/hero/hero2.jpg", imageAlt: "Existing AAHII campus architectural rendering", icon: ClipboardCheck },
  { year: "2025–26", details: ["Contractor Finalized", "Construction commenced"], image: "/about/timeline/aahii-timeline-construction.webp", imageAlt: "Modern healthcare institution under construction", icon: HardHat },
  { year: "2026–27", details: ["Installation of equipments and procurement of services", "Commencing operations"], image: "/about/timeline/aahii-timeline-facility.webp", imageAlt: "Bright healthcare research facility interior with equipment", icon: Building2 },
] as const;

const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const revealVariants: Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } } };

function TimelineCard({ index }: { index: number }) {
  const milestone = milestones[index];
  const Icon = milestone.icon;
  const isWide = index > 2;
  return (
    <motion.article variants={revealVariants} className={`${styles.card} ${styles[`card${index + 1}`]} ${isWide ? styles.wideCard : styles.topCard}`}>
      <div className={styles.cardCopy}>
        <span className={styles.iconBadge}><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
        <h3 className={styles.year}>{milestone.year}</h3>
        {"title" in milestone && <p className={styles.title}>{milestone.title}</p>}
        <ul className={`${styles.details} ${"title" in milestone ? styles.proseDetails : styles.bulletDetails}`}>
          {milestone.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
      </div>
      <div className={styles.photo}>
        <Image src={milestone.image} alt={milestone.imageAlt} fill sizes={isWide ? "(max-width: 767px) 100vw, 40vw" : "(max-width: 767px) 100vw, 31vw"} className={styles.photoImage} />
      </div>
      <div className={styles.marker} aria-hidden="true"><span className={styles.stem} /><span className={styles.node}>{String(index + 1).padStart(2, "0")}</span></div>
    </motion.article>
  );
}

export default function TimelineBento() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section aria-labelledby="timeline-heading" className={styles.section} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={containerVariants}>
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.leftOrb} /><span className={styles.leftRing} />
        <svg className={styles.assamMap} viewBox="0 0 330 170" fill="none"><path d="M13 128 37 119 50 104 70 105 84 91 104 96 114 82 141 81 154 64 181 68 196 49 223 51 239 37 261 37 283 19 312 13 301 34 313 45 286 61 282 77 257 79 239 96 213 92 197 111 171 108 152 125 126 120 112 136 86 132 69 151 46 143 29 153Z" fill="currentColor" /></svg>
        <div className={styles.backgroundCampus}><Image src="/hero/hero2.jpg" alt="" fill sizes="560px" className={styles.backgroundCampusImage} /></div>
      </div>
      <div className={styles.inner}>
        <motion.header variants={revealVariants} className={styles.header}>
          <p className={styles.eyebrow}>OUR JOURNEY</p>
          <h2 id="timeline-heading" className={styles.heading}>Our Timeline</h2>
          <span className={styles.underline} aria-hidden="true" />
          <p className={styles.intro}>From vision to impact — key milestones in building a future-ready healthcare innovation ecosystem for Assam.</p>
        </motion.header>
        <motion.div variants={containerVariants} className={styles.stage}>
          <svg className={styles.desktopPath} viewBox="0 0 1306 746" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <motion.path d="M0 422 H1254 Q1306 422 1306 370 M54 422 Q0 422 0 476 V676 Q0 730 54 730 H1306" stroke="currentColor" strokeWidth="1.6" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }} />
            <path d="M1306 730 l-10 -10 m10 10 -10 10" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <div className={styles.topRow}>{[0, 1, 2].map((index) => <TimelineCard key={index} index={index} />)}</div>
          <div className={styles.bottomRow}>{[3, 4].map((index) => <TimelineCard key={index} index={index} />)}</div>
        </motion.div>
      </div>
    </motion.section>
  );
}
