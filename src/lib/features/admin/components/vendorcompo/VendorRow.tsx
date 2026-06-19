"use client";

import { useState } from "react";
import {
  Building2,
  Calendar,
  Check,
  Eye,
  Globe,
  Loader2,
  Mail,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  approveVendor,
  rejectVendor,
} from "@/lib/features/admin/news/api/vendor.api";
import RejectVendorModal from "@/lib/features/admin/components/vendorcompo/RejectVendorModal";
import toast from "react-hot-toast";

const statusStyles: Record<string, string> = {
  APPROVED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
};

type VendorListItem = {
  id: string;
  entityName?: string | null;
  email?: string | null;
  website?: string | null;
  status: string;
  createdAt?: string | Date;
};

type VendorRowProps = {
  vendor: VendorListItem;
  refresh: () => void;
};

function formatDate(value?: string | Date) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function VendorRow({ vendor, refresh }: VendorRowProps) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">
            Approve this vendor?
          </span>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="rounded-lg border px-3 py-1 text-xs hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  setLoading("approve");
                  await approveVendor(vendor.id);
                  toast.success("Vendor Approved");
                  refresh();
                } catch {
                  toast.error("Something went wrong");
                } finally {
                  setLoading(null);
                }
              }}
              className="rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-700"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <>
      <div className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] lg:grid-cols-[1.2fr_1fr_150px_230px]">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Vendor ID: {vendor.id?.slice(0, 8)}
          </p>
          <h3 className="mt-1 truncate font-semibold text-slate-950">
            {vendor.entityName || "Unnamed vendor"}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-slate-500">
            <Mail size={14} />
            {vendor.email || "No email provided"}
          </p>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p className="flex items-center gap-2 font-medium text-slate-900">
            <Building2 size={15} className="text-slate-500" />
            Vendor Registration
          </p>
          <p className="flex items-center gap-2 truncate">
            <Globe size={15} className="text-slate-400" />
            {vendor.website || "No website"}
          </p>
        </div>

        <div>
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[vendor.status] || statusStyles.PENDING}`}
          >
            {vendor.status}
          </span>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar size={14} />
            {formatDate(vendor.createdAt)}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2">
          {vendor.status === "PENDING" ? (
            <>
              <button
                onClick={handleApprove}
                disabled={loading !== null}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading === "approve" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Check size={16} />
                )}
                Approve
              </button>

              <button
                onClick={() => setShowRejectModal(true)}
                disabled={loading !== null}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                {loading === "reject" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <X size={16} />
                )}
                Reject
              </button>
            </>
          ) : null}

          <button
            aria-label={`View ${vendor.entityName || "vendor"}`}
            onClick={() => router.push(`/admin/vendors/${vendor.id}`)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
            type="button"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      <RejectVendorModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        loading={loading === "reject"}
        onConfirm={async (reason: string) => {
          try {
            setLoading("reject");
            await rejectVendor(vendor.id, reason);
            toast.success("Vendor Rejected");
            refresh();
            setShowRejectModal(false);
          } catch {
            toast.error("Something went wrong");
          } finally {
            setLoading(null);
          }
        }}
      />
    </>
  );
}
