import Image from "next/image";
import Link from "next/link";
import { sliderData } from "@/content/homeslider";
import styles from "./SyncedImageContent.module.css";

const cards = [
  {
    category: "Foundation",
    headline: "From vision to a new healthcare future for Assam",
    description: sliderData[0].title,
    attribution: `${sliderData[0].author}, ${sliderData[0].designation}`,
    href: "/about-us",
    image: sliderData[0].image,
    imageAlt: "Dr. Himanta Biswa Sarma speaking at an event",
  },
  {
    category: "Research",
    headline: "Where science, technology, and healthcare converge",
    description: "Where research, collaboration, and innovation converge to shape the next generation of healthcare delivery for India and the world.",
    href: "/research-development",
    image: "/about/vision.jpeg",
    imageAlt: "Illustration of connected healthcare technology, research, and innovation",
  },
  {
    category: "Innovation",
    headline: "Building the next generation of healthcare innovation",
    description: sliderData[2].title,
    attribution: `${sliderData[2].author}, ${sliderData[2].designation}`,
    href: "/about-us/vision-mission",
    image: sliderData[2].image,
    imageAlt: "Portrait of Prime Minister Narendra Modi in a dark vest",
  },
] as const;

export default function SyncedImageContent() {
  return (
    <section className={styles.section} aria-labelledby="vision-stories-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="vision-stories-heading" className={styles.heading}>Stories, milestones, and the vision shaping AAHII.</h2>
          <a className={styles.headerLink} href="https://agihf.org/niramaya/">
            Explore our vision <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.grid}>
          {cards.map((card, slot) => (
            <article className={styles.card} key={card.category}>
              <div className={styles.visual}>
                <Image src={card.image} alt={card.imageAlt} fill priority={slot === 0} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" className={styles.image} />
                <Link className={styles.imageLink} href={card.href} aria-label={`Read more: ${card.headline}`}><span aria-hidden="true">↗</span></Link>
              </div>
              <div className={styles.tags}><span className={styles.tag}>{card.category}</span></div>
              <h3 className={styles.cardTitle}>{card.headline}</h3>
              <p className={styles.description}>{card.description}</p>
              {"attribution" in card && <p className={styles.attribution}>{card.attribution}</p>}
            </article>
          ))}

          <article className={styles.card}>
            <div className={styles.visual}>
              <Image src="/about/milestone-1.jpeg" alt="Narendra Modi and Himanta Biswa Sarma at an AAHII foundation event" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" className={styles.image} />
              <Link className={styles.imageLink} href="/about-us" aria-label="Read more about AAHII's dedication to the nation"><span aria-hidden="true">↗</span></Link>
            </div>
            <div className={styles.tags}><span className={styles.tag}>{sliderData[1].label}</span></div>
            <h3 className={styles.cardTitle}>A new chapter for AAHII</h3>
            <p className={styles.description}>{sliderData[1].title}<br />{sliderData[1].description}</p>
            <p className={styles.attribution}>{sliderData[1].author}, {sliderData[1].designation}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
