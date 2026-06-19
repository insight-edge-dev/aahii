"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FileText, Pencil, Trash2 } from "lucide-react";

import type { VacancyItem } from "@/lib/features/vacancies/vacancy.types";
import {
  deleteVacancy,
  getVacancies,
} from "../api/vacancies.api";

function formatDate(value?: string | null) {
  if (!value) return "Not set";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function VacanciesTable() {
  const [vacancies, setVacancies] = useState<VacancyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const result = await getVacancies();
      setVacancies(result.data || []);
    } catch {
      toast.error("Failed to load vacancies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;

    const toastId = toast.loading("Deleting vacancy...");

    try {
      const result = await deleteVacancy(deleteId);

      if (!result.success) {
        throw new Error(result.message || "Delete failed");
      }

      toast.success("Vacancy deleted", { id: toastId });
      setDeleteId(null);
      fetchVacancies();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed", {
        id: toastId,
      });
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center text-sm text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        Loading vacancies...
      </div>
    );
  }

  if (vacancies.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <p className="font-medium text-slate-900">No vacancies found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {vacancies.map((item) => (
        <div
          key={item.id}
          className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_120px_140px_110px]"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate font-semibold text-slate-950">{item.title}</p>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ring-1 ${
                  item.status === "OPEN"
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : item.status === "CLOSED"
                      ? "bg-red-50 text-red-700 ring-red-200"
                      : "bg-slate-100 text-slate-600 ring-slate-200"
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {item.department} | {item.employmentType} | /{item.slug}
            </p>
          </div>

          <div className="text-sm text-slate-600">
            {formatDate(item.postedAt)}
          </div>
          <div className="text-sm text-slate-500">
            Deadline: {formatDate(item.applicationDeadline)}
          </div>

          <div className="flex items-center justify-end gap-3">
            {item.advertisementUrl ? (
              <a
                href={item.advertisementUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open advertisement for ${item.title}`}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <FileText size={18} />
              </a>
            ) : null}
            <Link
              href={`/admin/vacancies/${item.id}`}
              aria-label={`Edit ${item.title}`}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Pencil size={18} />
            </Link>
            <button
              type="button"
              aria-label={`Delete ${item.title}`}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
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
              Delete Vacancy?
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
