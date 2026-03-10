import Image from "next/image";
import { Menu } from "lucide-react";

export default function BrandingBar({
  onOpenMenu,
}: {
  onOpenMenu: () => void;
}) {
  return (
<div className="bg-white border-b border-slate-200/60">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between py-3 sm:py-4">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 sm:gap-5 min-w-0">

        {/* Main Logo */}


<Image
  src="https://res.cloudinary.com/ddi8hisku/image/upload/f_auto,q_auto,dpr_auto,w_200/v1772693374/AAHII_logo_kicvm7.webp"
  alt="AAHII official logo"
  width={90}
  height={90}
  priority
  className="
    w-14 h-14
    sm:w-16 sm:h-16
    md:w-20 md:h-20
    object-contain
    flex-shrink-0
    transition duration-300 ease-out
    hover:scale-105
  "
/>

        {/* Text Block */}
        <div className="min-w-0">
          <h1 className="
            text-[8px]
            sm:text-base
            md:text-lg
            lg:text-lg
            font-bold
            text-blue-900
            leading-snug
            tracking-tight
          ">
            Assam Advanced Healthcare Innovation Institute (AAHII)
          </h1>

          <p className="text-[6px] sm:text-xs italic font-semibold text-blue-500">
            by
          </p>

          <p className="
            text-[8px]
            sm:text-sm
            md:text-base
            font-semibold
            text-slate-800
            leading-snug
          ">
            Assam Government IIT-G Healthcare Foundation (AGIHF)
          </p>

          <p className="hidden sm:block text-[11px] text-red-600 mt-0.5">
            A joint venture between Govt. of Assam & IIT-G
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">

        {/* Assam Govt Logo */}
        <Image
          src="/logos/assam-gov.png"
          alt="Government of Assam logo"
          width={60}
          height={60}
          className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
        />

        {/* IITG Logo (Desktop Only) */}
        <div className="hidden md:block">
          <Image
            src="/logos/iitg-logo.png"
            alt="IIT Guwahati logo"
            width={60}
            height={60}
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />
        </div>

        {/* Mobile Menu */}
        <button
          onClick={onOpenMenu}
          className="
            md:hidden
            p-2
            rounded-lg
            hover:bg-slate-100
            active:scale-95
            transition
          "
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>

      </div>
    </div>
  </div>
</div>
  );
}
