"use client";

import { useState } from "react";
import { FileText, Pencil, Trash2 } from "lucide-react";
import { AdminTender, useTenders } from "../hooks/useTenders";
import { CreateTenderModal } from "./CreateTenderModal";

const statusStyles: Record<AdminTender["status"], string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CLOSED: "bg-red-50 text-red-700 border-red-200",
  CANCELLED: "bg-gray-100 text-gray-600 border-gray-200",
};

export function TenderTable() {
  const { fetchTenders, loading, removeTender, tenders } = useTenders();
  const [editItem, setEditItem] = useState<AdminTender | null>(null);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center text-sm text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        Loading tenders...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tenders.length ? (
        tenders.map((tender) => (
          <div
            className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] lg:grid-cols-[1.2fr_1fr_140px_120px_92px]"
            key={tender.id}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {tender.ref}
              </p>
              <h3 className="mt-1 font-semibold text-slate-950">
                {tender.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                {tender.description}
              </p>
            </div>

            <div className="text-sm text-slate-600">
              <p className="font-medium text-slate-900">
                {tender.itemType || "No item type"}
              </p>
              <p className="mt-1">
                {tender.publicationDate || "No bid publication date"}
              </p>
            </div>

            <div>
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[tender.status]}`}
              >
                {tender.status}
              </span>
              <p className="mt-2 text-xs text-slate-500">
                {tender.archived ? "Archived" : "Current"}
              </p>
              <p className="text-xs text-slate-500">
                {tender.isActive ? "Public" : "Hidden"}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FileText size={16} />
              {tender.documents.length} document
              {tender.documents.length === 1 ? "" : "s"}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                aria-label={`Edit ${tender.title}`}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setEditItem(tender)}
                type="button"
              >
                <Pencil size={18} />
              </button>
              <button
                aria-label={`Delete ${tender.title}`}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                onClick={() => removeTender(tender.id)}
                type="button"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <p className="font-medium text-slate-900">No tenders yet</p>
          <p className="mt-2 text-sm text-slate-500">
            Create the first tender notice to publish it on the public page.
          </p>
        </div>
      )}

      <CreateTenderModal
        editData={editItem}
        onSuccess={fetchTenders}
        open={!!editItem}
        setOpen={() => setEditItem(null)}
      />
    </div>
  );
}
