"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  Compass,
  FileText,
  Landmark,
  Layers3,
  Lightbulb,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import styles from "./NiramayaEntrance.module.css";

const metrics = [
  { value: "2025–26", label: "GRANT PROGRAM", Icon: FileText },
  { value: "02", label: "SELECTED STARTUPS", Icon: UsersRound },
  { value: "07", label: "FOCUS AREAS", Icon: Boxes },
  { value: "05", label: "SUPPORT PILLARS", Icon: Layers3 },
];

const destinations = [
  { label: "Explore", href: "#selected-startups", Icon: Compass },
  { label: "About", href: "#about-niramaya", Icon: FileText },
  { label: "Selected Startups", href: "#selected-startups", Icon: UsersRound },
  { label: "Infrastructure", href: "#infrastructure", Icon: Building2 },
  { label: "Innovation Areas", href: "#innovation", Icon: Lightbulb },
  { label: "Our Vision", href: "#vision", Icon: BadgeCheck },
];

const aboutCards = [
  {
    title: "Host Institution",
    description: "AAHII with IIT-G provides world-class engineering foundation.",
    Icon: Landmark,
  },
  {
    title: "Implementation Partner",
    description: "BioNEST at IIT-G Research park.",
    Icon: ShieldCheck,
  },
];

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start",
  });
  window.history.replaceState(null, "", href);
}

export function NiramayaHero() {
  return (
    <section className={styles.hero} aria-labelledby="niramaya-title">
      <div className={styles.heroVisual}>
        <Image
          src="/programs/phd-research.webp"
          alt="Researcher working with a microscope in a medical laboratory"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>
            NORTHEAST INCUBATOR FOR RAPID ACCELERATION<br />
            OF MEDICAL &amp; ALLIED INNOVATIONS
          </p>
          <h1 id="niramaya-title">NIRAMAYA</h1>
          <p className={styles.heroHeadline}>
            Turning healthcare innovations into<br className={styles.desktopBreak} /> real-world impact for a healthier India.
          </p>
          <p className={styles.heroDescription}>
            NIRAMAYA integrates clinical expertise, research strength, and institutional
            support to build a future-ready healthcare innovation ecosystem in Northeast India.
          </p>
          <a className={styles.heroCta} href="#at-a-glance" onClick={(event) => scrollToSection(event, "#at-a-glance")}>
            Explore NIRAMAYA <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <p className={styles.heroAside} aria-hidden="true">IDEAS<br />RESEARCH<br />VALIDATION<br />IMPACT</p>
      </div>
    </section>
  );
}

export function NiramayaAtGlance() {
  return (
    <section id="at-a-glance" className={styles.glanceSection} aria-labelledby="glance-title">
      <div className={styles.glancePanel}>
        <div className={styles.glanceIntro}>
          <h2 id="glance-title"><span>NIRAMAYA</span><br />AT A GLANCE</h2>
          <p>A complete innovation ecosystem connecting research, clinical validation, incubation, and market translation.</p>
        </div>
        <div className={styles.glanceMain}>
          <dl className={styles.metrics}>
            {metrics.map(({ value, label, Icon }) => (
              <div className={styles.metric} key={label}>
                <span className={styles.metricIcon}><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
                <div><dt>{value}</dt><dd>{label}</dd></div>
              </div>
            ))}
          </dl>
          <nav className={styles.index} aria-label="Explore NIRAMAYA sections">
            {destinations.map(({ label, href, Icon }) => (
              <a key={label} href={href} onClick={(event) => scrollToSection(event, href)}>
                <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export function NiramayaAbout() {
  return (
    <section id="about-niramaya" className={styles.about} aria-labelledby="about-niramaya-title">
      <div className={styles.aboutInner}>
        <div className={styles.aboutCopy}>
          <h2 id="about-niramaya-title">About <span>NIRAMAYA</span></h2>
          <p>
            AAHII has also taken up initiative to nurture innovation based Start-ups in Health-tech to develop a pipeline of products even when infrastructure is in progress. A Program &quot;NIRAMAYA&quot; has been launched to support the Healthcare based start-ups. AAHII is registered as an Incubator with Start-up India, GoI. The NIRAMAYA program supports health-tech startups to build a robust innovation pipeline aligned with national healthcare priorities.
          </p>
          <a href="#vision" onClick={(event) => scrollToSection(event, "#vision")}>Learn more about NIRAMAYA <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <div className={styles.aboutCards}>
          {aboutCards.map(({ title, description, Icon }) => (
            <article className={styles.aboutCard} key={title}>
              <span className={styles.aboutIcon}><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
