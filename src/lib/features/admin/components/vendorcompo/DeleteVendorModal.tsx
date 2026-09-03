"use client";

import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useRef } from "react";

type DeleteVendorModalProps = {
  isOpen: boolean;
  vendorName: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteVendorModal({
  isOpen,
  vendorName,
  loading,
  onClose,
  onConfirm,
}: DeleteVendorModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <div
        aria-describedby="delete-vendor-description"
        aria-labelledby="delete-vendor-title"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        role="dialog"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-red-50 p-2 text-red-600">
            <TriangleAlert aria-hidden="true" size={20} />
          </div>
          <div>
            <h2
              className="text-lg font-semibold text-slate-950"
              id="delete-vendor-title"
            >
              Delete vendor?
            </h2>
            <p
              className="mt-2 text-sm leading-6 text-slate-600"
              id="delete-vendor-description"
            >
              This action permanently removes <strong>{vendorName}</strong> and
              its registration data. It cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            onClick={onClose}
            ref={cancelButtonRef}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex min-w-32 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            onClick={onConfirm}
            type="button"
          >
            {loading ? (
              <Loader2 aria-hidden="true" className="animate-spin" size={16} />
            ) : null}
            {loading ? "Deleting..." : "Delete Vendor"}
          </button>
        </div>
      </div>
    </div>
  );
}
