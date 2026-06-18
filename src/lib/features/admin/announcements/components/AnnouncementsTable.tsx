"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

import type { AnnouncementItem } from "@/lib/features/announcements/announcement.types";
import {
  deleteAnnouncement,
  getAnnouncements,
} from "../api/announcements.api";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function AnnouncementsTable() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const result = await getAnnouncements();
      setAnnouncements(result.data || []);
    } catch {
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;

    const toastId = toast.loading("Deleting announcement...");

    try {
      const result = await deleteAnnouncement(deleteId);

      if (!result.success) {
        throw new Error(result.message || "Delete failed");
      }

      toast.success("Announcement deleted", { id: toastId });
      setDeleteId(null);
      fetchAnnouncements();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed", {
        id: toastId,
      });
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center text-gray-400">
        Loading announcements...
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center text-gray-400">
        No announcements found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {announcements.map((item) => (
        <div
          key={item.id}
          className="grid gap-4 rounded-xl border bg-white p-4 shadow-sm md:grid-cols-[1fr_120px_120px_100px]"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate font-medium text-gray-900">{item.title}</p>
              {item.priority ? (
                <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                  PRIORITY
                </span>
              ) : null}
              {!item.isActive ? (
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500">
                  INACTIVE
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {item.category} | /{item.slug}
            </p>
          </div>

          <div className="text-sm text-gray-600">{formatDate(item.publishedAt)}</div>
          <div className="truncate text-sm text-gray-500">{item.link || "No link"}</div>

          <div className="flex items-center justify-end gap-3">
            <Link
              href={`/admin/announcements/${item.id}`}
              aria-label={`Edit ${item.title}`}
              className="text-gray-500 transition hover:text-blue-600"
            >
              <Pencil size={18} />
            </Link>
            <button
              type="button"
              aria-label={`Delete ${item.title}`}
              className="text-gray-500 transition hover:text-red-600"
              onClick={() => setDeleteId(item.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

      {deleteId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Announcement?
            </h2>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:opacity-90"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
