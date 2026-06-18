"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import type {
  AnnouncementItem,
  AnnouncementPayload,
} from "@/lib/features/announcements/announcement.types";
import {
  createAnnouncement,
  updateAnnouncement,
} from "../api/announcements.api";

type AnnouncementFormProps = {
  editData?: AnnouncementItem | null;
};

function toDateInput(value?: string) {
  if (!value) return "";
  return value.slice(0, 10);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AnnouncementForm({ editData }: AnnouncementFormProps) {
  const router = useRouter();
  const isEdit = !!editData;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: editData?.title ?? "",
    slug: editData?.slug ?? "",
    category: editData?.category ?? "",
    link: editData?.link ?? "",
    priority: editData?.priority ?? false,
    isActive: editData?.isActive ?? true,
    publishedAt: toDateInput(editData?.publishedAt),
  });

  const suggestedSlug = useMemo(() => slugify(form.title), [form.title]);

  const handleSubmit = async () => {
    if (!form.title.trim() || form.title.trim().length < 5) {
      toast.error("Title must be at least 5 characters");
      return;
    }

    if (!form.category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!form.publishedAt) {
      toast.error("Published date is required");
      return;
    }

    const toastId = toast.loading(
      isEdit ? "Updating announcement..." : "Creating announcement...",
    );

    try {
      setLoading(true);

      const payload: AnnouncementPayload = {
        title: form.title.trim(),
        slug: form.slug.trim() || suggestedSlug,
        category: form.category.trim(),
        link: form.link.trim() || null,
        priority: form.priority,
        isActive: form.isActive,
        publishedAt: form.publishedAt,
      };

      const result =
        isEdit && editData
          ? await updateAnnouncement(editData.id, payload)
          : await createAnnouncement(payload);

      if (!result.success) {
        throw new Error(result.message || "Failed to save announcement");
      }

      toast.success(
        isEdit ? "Announcement updated" : "Announcement created",
        { id: toastId },
      );

      router.push("/admin/announcements");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { id: toastId },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          {isEdit ? "Edit Announcement" : "Create Announcement"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          This content appears in the public announcement bar.
        </p>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-500">Title</label>
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
          placeholder="Enter announcement title"
          value={form.title}
          onChange={(event) =>
            setForm((current) => ({ ...current, title: event.target.value }))
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Slug</label>
          <input
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
            placeholder={suggestedSlug || "auto-generated"}
            value={form.slug}
            onChange={(event) =>
              setForm((current) => ({ ...current, slug: event.target.value }))
            }
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-500">Category</label>
          <input
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
            placeholder="Admission, Tender, Notice"
            value={form.category}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                category: event.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-500">Link (optional)</label>
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
          placeholder="/news/example or https://example.com"
          value={form.link}
          onChange={(event) =>
            setForm((current) => ({ ...current, link: event.target.value }))
          }
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-500">Published Date</label>
        <input
          type="date"
          className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
          value={form.publishedAt}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              publishedAt: event.target.value,
            }))
          }
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.priority}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                priority: event.target.checked,
              }))
            }
          />
          Priority announcement
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                isActive: event.target.checked,
              }))
            }
          />
          Active
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/announcements")}
          className="flex-1 rounded-xl border border-gray-300 py-2 text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className="flex-1 rounded-xl bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}
