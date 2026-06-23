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
    <div className="flex items-center justify-between gap-3 min-h-18 py-2.5 sm:min-h-20 sm:py-4">

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
    w-12 h-12
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
            text-[11px]
            sm:text-base
            md:text-lg
            lg:text-lg
            font-bold
            text-blue-900
            leading-tight
            tracking-tight
          ">
            Assam Advanced Healthcare Innovation Institute (AAHII)
          </h1>

          <p className="text-[9px] sm:text-xs italic font-semibold text-blue-500 mt-0.5">
            by
          </p>

          <p className="
            text-[10px]
            sm:text-sm
            md:text-base
            font-semibold
            text-slate-800
            leading-tight
            mt-0.5
          ">
            Assam Government IIT-G Healthcare Foundation (AGIHF)
          </p>

          <p className="hidden sm:block text-[11px] text-red-600 mt-1">
            A joint venture between Govt. of Assam & IIT-G
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2.5 sm:gap-5 shrink-0">

        {/* Assam Govt Logo */}
        <Image
          src="/logos/assam-gov.png"
          alt="Government of Assam logo"
          width={60}
          height={60}
          className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain self-center"
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
            xl:hidden
            flex items-center justify-center
            h-11 w-11
            rounded-lg
            text-slate-700
            hover:bg-slate-100
            active:scale-95
            transition
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-(--nav-blue)
            focus-visible:ring-offset-2
          "
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

      </div>
    </div>
  </div>
</div>
  );
}
