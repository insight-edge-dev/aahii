import Image from "next/image";
import Link from "next/link";

const logos = [
  "/logos/iitg-logo.png",
  "/logos/medirays.png",
  "/logos/govassam.jpg",
  "/logos/roboss.png",
  "/logos/bionest.png",
];

export default function FooterBottom() {
  return (
    <section className="bg-(--nav-blue) text-white">
      {/* MARQUEE STRIP */}
<div className="footer-marquee bg-[var(--nav-blue)] py-3 overflow-hidden">
  <div className="footer-marquee-track flex items-center gap-3 sm:gap-6 md:gap-8">
    
    {[...logos, ...logos].map((logo, index) => (
      <div
        key={index}
        className="
          flex-shrink-0
          w-[110px] sm:w-[150px] md:w-[200px] lg:w-[240px]
          h-[50px] sm:h-[70px] md:h-[90px]

          bg-white rounded-xl
          px-3 sm:px-4 md:px-5

          flex items-center justify-center
          shadow-sm
        "
      >
        <div className="relative w-full h-full">
          <Image
            src={logo}
            alt="Partner logo"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 110px, (max-width: 768px) 150px, 200px"
          />
        </div>
      </div>
    ))}

  </div>
</div>


      {/* POLICIES */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row items-center gap-3 text-xs md:text-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
            <Link href="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/legal-disclaimer" className="hover:underline">
              Legal Disclaimer
            </Link>
          </div>

          <p className="md:ml-auto text-center md:text-left">
            <span className="text-orange-400">Page Update on:</span>{" "}
            <strong>27/03/2026</strong>
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="bg-[#18284f] text-center py-3 text-sm">
        Copyright © 2026 | All Rights Reserved by AGHIF
      </div>
    </section>
  );
}
