"use client";

import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "./api";
import EventCard from "./EventCard";
import EventFormModal from "./EventFormModal";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data || []);
    } catch {
      toast.error("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* 🔥 DELETE FLOW */
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      setLoading(true);

      await deleteEvent(deleteId);

      setEvents((prev) => prev.filter((e) => e.id !== deleteId));
      toast.success("Event deleted");

      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const filtered = events.filter((e: any) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* 🔥 TOP BAR */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        {/* SEARCH */}
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl w-full md:w-80">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search events..."
            className="bg-transparent ml-2 outline-none w-full text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-sm"
        >
          <Plus size={16} />
          Add Event
        </button>

      </div>

      {/* 📦 GRID / EMPTY STATE */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          No events found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event: any) => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={(id: string) => setDeleteId(id)}
            />
          ))}
        </div>
      )}

      {/* 🔥 CREATE MODAL */}
      {open && (
        <EventFormModal
          onClose={() => setOpen(false)}
          refresh={fetchEvents}
        />
      )}

      {/* 🔥 DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-sm rounded-2xl p-6 space-y-4 shadow-xl">

            <h2 className="text-lg font-semibold text-gray-900">
              Delete Event?
            </h2>

            <p className="text-sm text-gray-500">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-2">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={loading}
                className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:opacity-90"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}