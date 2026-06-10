"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CreateTenderModal } from "@/lib/features/admin/tenders/components/CreateTenderModal";
import { TenderTable } from "@/lib/features/admin/tenders/components/TenderTable";

export default function AdminTendersPage() {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">Tenders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create procurement notices and upload public PDF documents.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          onClick={() => setOpen(true)}
          type="button"
        >
          <Plus size={18} />
          Add Tender
        </button>
      </div>

      <TenderTable key={refresh} />

      <CreateTenderModal
        onSuccess={() => setRefresh((current) => current + 1)}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
