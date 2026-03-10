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
<div className="footer-marquee bg-(--nav-blue) py-4 overflow-hidden">
  <div className="footer-marquee-track flex items-center gap-2 sm:gap-4 md:gap-6">
    {[...logos, ...logos].map((logo, index) => (
      <div
        key={index}
        className="
          min-w-[90px]        /* mobile */
          sm:min-w-[140px]    /* phones */
          md:min-w-[200px]    /* tablets */
          lg:min-w-[240px]    /* desktop */

          bg-white rounded-lg
          px-2 sm:px-4 md:px-6
          py-1.5 sm:py-3 md:py-4

          flex justify-center items-center
          shadow-sm
        "
      >
        <Image
          src={logo}
          alt="Partner logo"
          width={200}
          height={80}
          className="
            object-contain
            h-6 sm:h-10 md:h-14 lg:h-20
          "
        />
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
            <Link href="/website-policies" className="hover:underline">
              Website Policies
            </Link>
          </div>

          <p className="md:ml-auto text-center md:text-left">
            <span className="text-orange-400">Page Update on:</span>{" "}
            <strong>20/02/2026</strong>
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
