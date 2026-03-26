"use client";

import { Calendar, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EventCard({ event, onDelete }: any) {
  const router = useRouter();

  if (!event) return null;

  return (
    <div
      onClick={() => router.push(`/admin/events/${event.id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:scale-[1.01] transition duration-200"
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
          <h3 className="font-semibold text-gray-900 line-clamp-1">
            {event.title}
          </h3>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              event.isActive
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {event.isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {event.description}
        </p>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-3">

          {/* DATE */}
          <div className="flex items-center text-xs text-gray-400">
            <Calendar size={14} className="mr-1" />
            {new Date(event.eventDate).toDateString()}
          </div>

          {/* DELETE */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 🔥 VERY IMPORTANT
              onDelete(event.id);
            }}
            className="text-red-500 hover:scale-110 transition"
          >
            <Trash size={16} />
          </button>

        </div>
      </div>
    </div>
  );
}