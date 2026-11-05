"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, FlaskConical, Lightbulb, Play, Stethoscope, UsersRound } from "lucide-react";

const slides = [
  { src: "/hero/hero1.webp", alt: "AAHII healthcare and research campus entrance" },
  { src: "/hero/hero2.jpg", alt: "AAHII healthcare innovation campus courtyard" },
  { src: "/hero/hero3.png", alt: "Aerial view of the AAHII healthcare and research campus" },
  { src: "/hero/hero4.png", alt: "AAHII research campus surrounded by greenery" },
];

const trustPoints = [
  { label: "Advanced Care", description: "Super-specialty focus", icon: Stethoscope },
  { label: "Research", description: "Clinical to community impact", icon: FlaskConical },
  { label: "Innovation", description: "Technology for healthcare", icon: Lightbulb },
  { label: "Capacity Building", description: "People, skills and systems", icon: UsersRound },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(query.matches);
    updateMotionPreference();
    query.addEventListener("change", updateMotionPreference);
    return () => query.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const interval = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(interval);
  }, [isPaused, reducedMotion]);

  return (
    <section className="overflow-hidden bg-[#fbfcfe]">
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16 xl:px-14 xl:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.08fr)] lg:gap-14 xl:gap-20">
          <div className="max-w-[590px] lg:py-4">
            <p className="mb-5 text-[10px] font-bold tracking-[0.14em] text-slate-600 sm:text-xs">ASSAM ADVANCED HEALTHCARE INNOVATION INSTITUTE</p>
            <h1 className="font-serif text-[42px] leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-[80px]">
              Advancing<br /><span className="text-(--nav-blue)">Healthcare</span> through <br /> <i>Innovation</i>
            </h1>
            <p className="mt-6 max-w-[520px] text-sm leading-6 text-slate-600 sm:mt-7 sm:text-base sm:leading-7 lg:text-[17px]">
              A Government of Assam and IIT Guwahati initiative building a future-ready healthcare ecosystem through advanced care, research, innovation and capacity building.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              <Link href="/about-us" className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#082f49] px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0c4264] hover:shadow-[0_10px_22px_rgba(8,47,73,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nav-blue) focus-visible:ring-offset-2 motion-reduce:transition-none">
                Explore AAHII <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </Link>
              <Link href="/departments" className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#315f91] hover:bg-[#f2f7ff] hover:text-[#082f49] hover:shadow-[0_10px_22px_rgba(15,23,42,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nav-blue) focus-visible:ring-offset-2 motion-reduce:transition-none">
                Our Centres
              </Link>
            </div>
          </div>

          <div className="group/image relative h-[350px] overflow-hidden rounded-2xl bg-slate-200 shadow-[0_18px_55px_rgba(15,23,42,0.14)] sm:h-[480px] lg:h-[570px] xl:h-[620px]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {slides.map((slide, index) => (
              <div key={slide.src} aria-hidden={index !== current} className={`absolute inset-0 transition-opacity duration-[900ms] ease-out motion-reduce:transition-none ${index === current ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                <Image src={slide.src} alt={slide.alt} fill priority={index === 0} quality={90} sizes="(max-width: 1023px) 100vw, 58vw" className={`object-cover transition-transform duration-[1400ms] ease-out motion-reduce:transition-none ${index === current ? "scale-100" : "scale-[1.035]"}`} />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-slate-950/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                {slides.map((slide, index) => (
                  <button key={slide.src} type="button" onClick={() => setCurrent(index)} aria-label={`Show slide ${index + 1}: ${slide.alt}`} aria-current={index === current ? "true" : undefined} className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nav-blue) focus-visible:ring-offset-2 ${index === current ? "w-6 bg-(--nav-blue)" : "w-2 bg-slate-400 hover:bg-slate-600"}`} />
                ))}
              </div>
              <Link href="/about-us/vision-mission" className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-white/95 py-2 pl-2 pr-3 text-left shadow-md backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(8,47,73,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nav-blue) focus-visible:ring-offset-2 motion-reduce:transition-none">
                <span className="absolute left-2 top-2 size-10 rounded-full bg-[#082f49] transition-transform duration-500 ease-out group-hover:scale-[7] motion-reduce:transition-none" aria-hidden="true" />
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#082f49] text-white transition-all duration-500 ease-out group-hover:scale-90 group-hover:bg-white group-hover:text-[#082f49] motion-reduce:transition-none"><Play className="ml-0.5 size-4 fill-current transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:scale-110 motion-reduce:transition-none" aria-hidden="true" /></span>
                <span className="relative z-10 text-xs font-semibold leading-4 text-slate-800 transition-colors duration-300 group-hover:text-white sm:text-sm motion-reduce:transition-none">Watch<br />Our Vision</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1500px] divide-y divide-slate-200 px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-10 xl:px-14">
          {trustPoints.map(({ label, description, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 py-5 sm:px-5 lg:px-7">
              <Icon className="size-6 shrink-0 text-[#315f91]" strokeWidth={1.8} aria-hidden="true" />
              <div><p className="text-sm font-semibold text-slate-800">{label}</p><p className="mt-0.5 text-xs text-slate-500">{description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
