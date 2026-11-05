import Image from "next/image";
import Link from "next/link";
import styles from "./ProposedPrograms.module.css";

const programs = [
  { number: "02", category: "Postgraduate (Clinical)", title: "PG Degree (Clinical)", details: ["MD – Medicine, Emergency Medicine & Traumatology", "MS – Surgery, G&O, Ortho"], image: "/programs/clinical.webp", className: styles.clinical },
  { number: "01", category: "Doctoral Program", title: "PhD", details: ["Medical, Engineering & Science programs including integrated PG–PhD programs"], image: "/programs/phd-research.webp", className: styles.phd },
  { number: "03", category: "Postgraduate (Pre / Para-clinical)", title: "PG Degree (Pre / Para-clinical)", details: ["MD – Biochemistry, Medicine Physiology and Community Medicine"], image: "/programs/preclinical-lab.webp", className: styles.preclinical },
  { number: "04", category: "Superspeciality", title: "Superspeciality Degree", details: ["MCh – Neurosurgery, GI Surgery, Urology", "DM – Gastroenterology, Nephrology, Neurology"], image: "/programs/superspeciality-imaging.webp", className: styles.superspeciality },
  { number: "05", category: "Undergraduate", title: "UG Degree", details: ["Dialysis, OT, ICU, MLT & Radiology"], image: "/programs/undergraduate-ward.webp", className: styles.undergraduate },
  { number: "06", category: "Fellowships", title: "Fellowships", details: ["Short-term (6 months) & Long-term (12–18 months)"], image: "/programs/fellowships-clinicians.webp", className: styles.fellowships },
  { number: "07", category: "Certification Programs", title: "Certificates", details: ["Speciality specific fellowships", "Skill-based program for AHP"], image: "/programs/certificates-documents.webp", className: styles.certificates },
] as const;

export default function ProposedPrograms() {
  return (
    <section className={styles.section} aria-labelledby="academic-programs-heading">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.campusImage} aria-hidden="true">
            <Image src="/hero/hero1.webp" alt="" fill sizes="(max-width: 768px) 100vw, 70vw" loading="eager" />
          </div>
          <div className={styles.introContent}>
            <p className={styles.eyebrow}>Academic pathways <span aria-hidden="true" /></p>
            <h2 id="academic-programs-heading" className={styles.heading}>Proposed Academic<br />Programs at AAHII</h2>
            <p className={styles.description}>A comprehensive academic ecosystem to build a future-ready healthcare workforce through research, clinical excellence and innovation.</p>
          </div>
          <p className={styles.marginalia} aria-hidden="true">Education<br />Research<br />Clinical care<br />Innovation</p>
        </div>
        <div className={styles.grid}>
          {programs.map((program) => (
            <article key={program.number} className={`${styles.card} ${program.className}`}>
              <div className={styles.cardImage} aria-hidden="true">
                <Image src={program.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw" loading={program.number === "02" ? "eager" : "lazy"} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.numberLine}><span>{program.number}</span><span aria-hidden="true" /></div>
                <p className={styles.category}>{program.category}</p>
                <h3 className={styles.cardTitle}>{program.title}</h3>
                <ul className={styles.details}>{program.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                <Link className={styles.cta} href="/contact-us" aria-label={`Enquire about ${program.title}`}>
                  <span className={styles.arrow} aria-hidden="true">→</span><span>Explore program</span><span className={styles.ctaArrow} aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
