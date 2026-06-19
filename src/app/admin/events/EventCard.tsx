"use client";

import { Calendar, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type EventCardItem = {
  id: string;
  title?: string | null;
  description?: string | null;
  coverImage?: string | null;
  eventDate: string | Date;
  isActive: boolean;
};

type EventCardProps = {
  event: EventCardItem | null;
  onDelete: (id: string) => void;
};

export default function EventCard({ event, onDelete }: EventCardProps) {
  const router = useRouter();

  if (!event) return null;

  return (
    <div
      onClick={() => router.push(`/admin/events/${event.id}`)}
      className="cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
    >

      {/* IMAGE */}
      <Image
        src={event.coverImage || "/placeholder.png"}
        alt={event.title || "Event"}
        width={500}
        height={160}
        className="w-full h-40 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        {/* TITLE + STATUS */}
        <div className="flex justify-between items-center">
          <h3 className="line-clamp-1 font-semibold text-slate-950">
            {event.title}
          </h3>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
              event.isActive
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-slate-100 text-slate-500 ring-slate-200"
            }`}
          >
            {event.isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
          {event.description}
        </p>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-3">

          {/* DATE */}
          <div className="flex items-center text-xs text-slate-500">
            <Calendar size={14} className="mr-1" />
            {new Date(event.eventDate).toDateString()}
          </div>

          {/* DELETE */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 🔥 VERY IMPORTANT
              onDelete(event.id);
            }}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash size={16} />
          </button>

        </div>
      </div>
    </div>
  );
}
