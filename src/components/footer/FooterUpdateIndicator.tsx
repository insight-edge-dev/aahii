import { SITE_LAST_UPDATED } from "@/content/site-metadata";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatUpdatedDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

type FooterUpdateIndicatorProps = {
  updatedAt?: string | Date;
};

export default function FooterUpdateIndicator({
  updatedAt,
}: FooterUpdateIndicatorProps) {
  const formatted = formatUpdatedDate(updatedAt ?? SITE_LAST_UPDATED);

  return (
    <span
      title="Website content reviewed and updated."
      className="inline-flex items-center gap-2 text-white/70"
    >
      <span
        className="size-1.5 rounded-full bg-green-400"
        aria-hidden="true"
      />
      Updated {formatted}
    </span>
  );
}
