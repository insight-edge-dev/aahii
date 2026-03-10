import NewsGrid from "@/components/news/NewsGrid";
import { pressData } from "@/content/press";

export default function PressPage() {
  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}
      <section className="border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 text-center">

          {/* Eyebrow */}
          <p className="text-xs md:text-sm font-semibold tracking-wider text-blue-700 uppercase">
            News
          </p>

          {/* Title */}
          <h1 className="mt-2 text-2xl md:text-4xl font-bold text-[#0f2a6d]">
            AAHII Newsroom
          </h1>

          {/* Description (mobile optimized line length) */}
          <p className="
            mt-4
            text-sm md:text-base
            text-neutral-600
            leading-relaxed
            max-w-xl md:max-w-2xl
            mx-auto
          ">
            Official announcements and media coverage of the
            <span className="font-medium">
              {" "}Assam Advanced Healthcare Innovation Institute (AAHII)
            </span>,
            developed under the
            <span className="font-medium">
              {" "}Assam Government IIT-G Healthcare Foundation (AGIHF)
            </span>
            — a joint initiative between the Government of Assam and IIT
            Guwahati advancing healthcare innovation and research.
          </p>
        </div>
      </section>

      {/* ================= NEWS FEED ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">

        {/* Section Header */}
        <div className="
          mb-6 md:mb-10
          flex flex-col sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
        ">
          <h2 className="text-lg md:text-2xl font-semibold text-neutral-900">
            All Updates
          </h2>

          <span className="text-xs md:text-sm text-neutral-500">
            {pressData.length} Articles
          </span>
        </div>

        {/* Adaptive Feed (auto mobile list) */}
        <NewsGrid articles={pressData} />
      </section>

      {/* ================= FOOTER NOTE ================= */}
      <section className="border-t border-neutral-200">
        <div className="
          max-w-4xl mx-auto
          px-4 sm:px-6
          py-8 md:py-10
          text-center
          text-xs md:text-sm
          text-neutral-500
          leading-relaxed
        ">
          Media enquiries and press communications related to AAHII may be
          directed through the official AGIHF communication channels.
        </div>
      </section>

    </main>
  );
}