"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeIndianRupee,
  ChartNoAxesCombined,
  FlaskConical,
  Heart,
  LockKeyhole,
  MessagesSquare,
  Play,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import styles from "./SelectedStartups.module.css";

type Startup = {
  id: string;
  number: string;
  name: string;
  categories: [string, string];
  description: string;
  image?: string;
  founder?: { name: string; role: string; image?: string; bio: string };
  video?: { url: string; poster?: string; duration?: string };
  innovation?: string;
  impactGoals: [string, string, string];
  website?: string;
};

// Media, founder details, and website links are intentionally empty until approved assets arrive.
const startups: Startup[] = [
  {
    id: "a-savemom",
    number: "01",
    name: "A.Savemom",
    categories: ["Maternal health", "Digital health"],
    description:
      "AI-enabled maternal care platform for early risk detection and continuous support during pregnancy and postpartum.",
    impactGoals: [
      "Improved maternal health outcomes",
      "Greater access to specialized care",
      "Scalable technology for the region",
    ],
  },
  {
    id: "khurimeri",
    number: "02",
    name: "Khurimeri",
    categories: ["Ayush & nutraceuticals", "Wellness"],
    description:
      "Science-backed, region-specific nutraceutical solutions to improve women’s health and community wellness.",
    impactGoals: [
      "Women’s health",
      "Community wellness",
      "Region-specific solutions",
    ],
  },
];

const supportItems = [
  { title: "Clinical Validation", Icon: Stethoscope },
  { title: "Mentorship & Advisory", Icon: MessagesSquare },
  { title: "Research Infrastructure", Icon: FlaskConical },
  { title: "Regulatory Guidance", Icon: ShieldCheck },
  { title: "Funding & Scale Support", Icon: BadgeIndianRupee },
];

const impactIcons = [Heart, UsersRound, ChartNoAxesCombined];

export default function SelectedStartups() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const selected = startups.find((startup) => startup.id === selectedId);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const closeStartup = useCallback(() => {
    if (closeTimerRef.current !== null) return;
    setIsVisible(false);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 460;
    closeTimerRef.current = window.setTimeout(() => {
      setSelectedId(null);
      closeTimerRef.current = null;
    }, delay);
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    backButtonRef.current?.focus();
    const frame = requestAnimationFrame(() => setIsVisible(true));

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeStartup();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const controls = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [selectedId, closeStartup]);

  function openStartup(startup: Startup, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelectedId(startup.id);
  }

  return (
    <section id="selected-startups" className={styles.section} aria-labelledby="selected-startups-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>NIRAMAYA</p>
            <h2 id="selected-startups-title" className={styles.title}>
              Selected Startups under<br /> NIRAMAYA Grant 2025–26
            </h2>
            <p className={styles.intro}>
              Supporting bold ideas and innovative teams working on real-world healthcare
              solutions for a healthier Northeast and a stronger India.
            </p>
          </div>
          <a className={styles.allLink} href="#selected-startup-grid">
            View all startups <ArrowRight size={18} aria-hidden="true" />
          </a>
        </header>

        <div id="selected-startup-grid" className={styles.grid}>
          {startups.map((startup) => (
            <button
              key={startup.id}
              type="button"
              className={styles.card}
              onClick={(event) => openStartup(startup, event.currentTarget)}
              aria-label={`Meet the founder of ${startup.name}`}
            >
              <span className={styles.cardMedia}>
                {startup.image ? (
                  // Startup images can be supplied as local or approved remote URLs.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={startup.image} alt="" loading="lazy" />
                ) : (
                  <span className={styles.mediaPlaceholder} aria-hidden="true">
                    <span className={styles.mediaOrb} />
                    <span className={styles.mediaSymbol}>{startup.number}</span>
                  </span>
                )}
                <span className={styles.cardArrow} aria-hidden="true"><ArrowRight size={20} /></span>
              </span>
              <span className={styles.cardBody}>
                <span className={styles.pills}>
                  {startup.categories.map((category, index) => (
                    <span key={category} className={index === 0 ? styles.primaryPill : styles.secondaryPill}>
                      {category}
                    </span>
                  ))}
                </span>
                <span className={styles.cardName}>{startup.name}</span>
                <span className={styles.cardDescription}>{startup.description}</span>
                <span className={styles.cardFooter}>
                  <span>Meet the Founder <ArrowRight size={17} aria-hidden="true" /></span>
                  <span className={styles.number}>{startup.number}</span>
                </span>
              </span>
            </button>
          ))}

          <div className={styles.comingSoon} aria-label="More startups coming soon">
            <div className={styles.comingSoonContent}>
              <span className={styles.lock}><LockKeyhole size={23} strokeWidth={1.8} aria-hidden="true" /></span>
              <p>More startups<br />coming soon</p>
              <span className={styles.progress} aria-hidden="true"><i /><i /></span>
            </div>
          </div>
        </div>

        <div className={styles.support}>
          <div className={styles.supportIntro}>
            <div>
              <p className={styles.eyebrow}>OUR SUPPORT</p>
              <h3>From incubation to impact.</h3>
            </div>
            <p>
              NIRAMAYA provides research infrastructure, clinical environments,
              mentorship, and institutional support to help startups scale their
              innovations from lab to life.
            </p>
          </div>
          <ul className={styles.supportList}>
            {supportItems.map(({ title, Icon }) => (
              <li key={title}>
                <span className={styles.supportIcon}><Icon size={23} strokeWidth={1.9} aria-hidden="true" /></span>
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {typeof document !== "undefined" && selected && createPortal(
            <div className={styles.modalRoot} data-open={isVisible}>
              <button
                type="button"
                className={styles.backdrop}
                aria-label="Close startup details"
                onClick={closeStartup}
              />
              <div
                ref={panelRef}
                className={styles.drawer}
                role="dialog"
                aria-modal="true"
                aria-labelledby="startup-drawer-title"
              >
                <div className={styles.drawerTop}>
                  <button ref={backButtonRef} type="button" className={styles.backButton} onClick={closeStartup}>
                    <ArrowLeft size={20} aria-hidden="true" /> Back to Startups
                  </button>
                  <button type="button" className={styles.closeButton} aria-label="Close startup details" onClick={closeStartup}>
                    <X size={24} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
                <div className={styles.drawerContent}>
                  <span className={styles.grantBadge}>NIRAMAYA GRANT 2025–26</span>
                  <h2 id="startup-drawer-title" className={styles.drawerTitle}>{selected.name}</h2>
                  <p className={styles.drawerDescription}>{selected.description}</p>
                  <div className={styles.drawerPills}>
                    {selected.categories.map((category, index) => (
                      <span key={category} className={index === 0 ? styles.primaryPill : styles.secondaryPill}>{category}</span>
                    ))}
                  </div>

                  <div className={styles.videoCard}>
                    {selected.video ? (
                      <video controls preload="none" poster={selected.video.poster} aria-label={`${selected.name} video`}>
                        <source src={selected.video.url} />
                        Your browser does not support video playback.
                      </video>
                    ) : (
                      <div className={styles.videoPlaceholder}>
                        <span className={styles.videoName}>{selected.name}</span>
                        <span className={styles.videoUnavailable}><Play size={22} fill="currentColor" aria-hidden="true" /> Video coming soon</span>
                      </div>
                    )}
                  </div>

                  <section className={styles.drawerSection} aria-labelledby="founder-title">
                    <h3 id="founder-title">About the Founder</h3>
                    <div className={styles.founderRow}>
                      <span className={styles.founderImage}>
                        {selected.founder?.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={selected.founder.image} alt={selected.founder.name} loading="lazy" />
                        ) : <UserRound size={31} strokeWidth={1.5} aria-hidden="true" />}
                      </span>
                      <div>
                        <strong>{selected.founder?.name ?? "Founder details coming soon"}</strong>
                        {selected.founder && <span>{selected.founder.role}</span>}
                        {selected.founder && <p>{selected.founder.bio}</p>}
                      </div>
                    </div>
                  </section>

                  <section className={styles.drawerSection} aria-labelledby="innovation-title">
                    <h3 id="innovation-title">The Innovation</h3>
                    <p>{selected.innovation ?? selected.description}</p>
                  </section>

                  <section className={styles.drawerSection} aria-labelledby="impact-title">
                    <h3 id="impact-title">Impact Goals</h3>
                    <ul className={styles.impactList}>
                      {selected.impactGoals.map((goal, index) => {
                        const Icon = impactIcons[index];
                        return <li key={goal}><span><Icon size={23} strokeWidth={1.9} aria-hidden="true" /></span>{goal}</li>;
                      })}
                    </ul>
                  </section>

                  {selected.website && (
                    <a className={styles.websiteLink} href={selected.website} target="_blank" rel="noopener noreferrer">
                      Visit Website <ArrowRight size={18} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>,
        document.body,
      )}
    </section>
  );
}
