"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import type {
  VacancyItem,
  VacancyPayload,
  VacancyStatus,
} from "@/lib/features/vacancies/vacancy.types";
import {
  createVacancy,
  updateVacancy,
} from "../api/vacancies.api";

type VacancyFormProps = {
  editData?: VacancyItem | null;
};

function toDateInput(value?: string | null) {
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

export default function VacancyForm({ editData }: VacancyFormProps) {
  const router = useRouter();
  const isEdit = !!editData;
  const [loading, setLoading] = useState(false);
  const [advertisement, setAdvertisement] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: editData?.title ?? "",
    slug: editData?.slug ?? "",
    location: editData?.location ?? "AAHII, IIT Guwahati",
    employmentType: editData?.employmentType ?? "Full-time",
    department: editData?.department ?? "",
    description: editData?.description ?? "",
    applyEmail: editData?.applyEmail ?? "careers@agihf.org",
    status: editData?.status ?? "DRAFT" as VacancyStatus,
    postedAt: toDateInput(editData?.postedAt),
    applicationDeadline: toDateInput(editData?.applicationDeadline),
  });

  const suggestedSlug = useMemo(() => slugify(form.title), [form.title]);

  const handleSubmit = async () => {
    if (!form.title.trim() || form.title.trim().length < 5) {
      toast.error("Title must be at least 5 characters");
      return;
    }

    if (!form.department.trim()) {
      toast.error("Department is required");
      return;
    }

    if (!form.description.trim() || form.description.trim().length < 10) {
      toast.error("Description must be at least 10 characters");
      return;
    }

    if (!form.postedAt) {
      toast.error("Posted date is required");
      return;
    }

    if (!form.applyEmail.includes("@")) {
      toast.error("A valid apply email is required");
      return;
    }

    const toastId = toast.loading(
      isEdit ? "Updating vacancy..." : "Creating vacancy...",
    );

    try {
      setLoading(true);

      const payload: VacancyPayload = {
        title: form.title.trim(),
        slug: form.slug.trim() || suggestedSlug,
        location: form.location.trim(),
        employmentType: form.employmentType.trim(),
        department: form.department.trim(),
        description: form.description.trim(),
        applyEmail: form.applyEmail.trim(),
        status: form.status,
        postedAt: form.postedAt,
        applicationDeadline: form.applicationDeadline || null,
      };

      const fd = new FormData();
      fd.append("vacancyData", JSON.stringify(payload));

      if (advertisement) {
        fd.append("advertisement", advertisement);
      }

      const result =
        isEdit && editData
          ? await updateVacancy(editData.id, fd)
          : await createVacancy(fd);

      if (!result.success) {
        throw new Error(result.message || "Failed to save vacancy");
      }

      toast.success(
        isEdit ? "Vacancy updated" : "Vacancy created",
        { id: toastId },
      );

      router.push("/admin/vacancies");
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
    <div className="mx-auto max-w-3xl space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          {isEdit ? "Edit Vacancy" : "Create Vacancy"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage career vacancies shown on the public vacancies page.
        </p>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-500">Title</label>
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
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
          <label className="text-xs text-gray-500">Status</label>
          <select
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
            value={form.status}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                status: event.target.value as VacancyStatus,
              }))
            }
          >
            <option value="DRAFT">DRAFT</option>
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Location</label>
          <input
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
            value={form.location}
            onChange={(event) =>
              setForm((current) => ({ ...current, location: event.target.value }))
            }
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-500">Employment Type</label>
          <input
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
            value={form.employmentType}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                employmentType: event.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Department</label>
          <input
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
            value={form.department}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                department: event.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-500">Apply Email</label>
          <input
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
            value={form.applyEmail}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                applyEmail: event.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-500">Description</label>
        <textarea
          rows={4}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Posted Date</label>
          <input
            type="date"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
            value={form.postedAt}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                postedAt: event.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-500">Application Deadline</label>
          <input
            type="date"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-500"
            value={form.applicationDeadline}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                applicationDeadline: event.target.value,
              }))
            }
          />
        </div>
      </div>

      <label className="block">
        <span className="text-xs text-gray-500">PDF Advertisement (optional)</span>
        <div className="mt-1 rounded-xl border-2 border-dashed border-gray-300 p-5 text-center transition hover:border-blue-500">
          <p className="text-sm text-gray-600">
            {advertisement
              ? advertisement.name
              : editData?.advertisementUrl
                ? "Current PDF attached. Upload to replace."
                : "Click to upload PDF advertisement"}
          </p>
          <p className="mt-1 text-xs text-gray-400">PDF only, max 5MB</p>
        </div>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;

            if (file.type !== "application/pdf") {
              toast.error("Please upload a PDF");
              return;
            }

            if (file.size > 5 * 1024 * 1024) {
              toast.error("PDF must be under 5MB");
              return;
            }

            setAdvertisement(file);
          }}
        />
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/vacancies")}
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
