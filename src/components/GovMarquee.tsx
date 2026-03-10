"use client";

export default function GovMarquee() {
  const messages = [
    "Integrating research, clinical excellence, and innovation",
    "Where science, technology, and patient care converge",
    "Designed for innovation, collaboration, and impact",
  ];

  return (
    <div className="relative w-full overflow-hidden  py-3">
      {/* Tricolor bars (full width) */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
  <div className="mx-auto h-1 max-w-7xl bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />
</div>

<div className="pointer-events-none absolute inset-x-0 bottom-0">
  <div className="mx-auto h-1 max-w-7xl bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />
</div>

      {/* Centered content wrapper */}
      <div className="mx-auto max-w-7xl overflow-hidden">
        {/* Marquee track */}
        <div
          className="flex w-max"
          style={{ animation: "govScroll 24s linear infinite" }}
        >
          {[...messages, ...messages].map((text, i) => (
            <MarqueeItem key={i} text={text} />
          ))}
        </div>
      </div>

      {/* Scoped animation */}
      <style jsx>{`
        @keyframes govScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

function MarqueeItem({ text }: { text: string }) {
  return (
    <span
      className="
        inline-flex items-center whitespace-nowrap
        pr-20 md:pr-16 sm:pr-10
        text-[18px] md:text-[16px] sm:text-[15px]
        font-semibold tracking-[0.3px]
        text-[#0f2a6d]
        before:content-['☸']
        before:mr-3 sm:before:mr-2
        before:text-[16px] sm:before:text-[14px]
        before:opacity-90
      "
    >
      {text}
    </span>
  );
}
