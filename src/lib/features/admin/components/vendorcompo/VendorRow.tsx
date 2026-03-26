"use client";

import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  approveVendor,
  rejectVendor,
} from "@/lib/features/admin/news/api/vendor.api";
import RejectVendorModal from "@/lib/features/admin/components/vendorcompo/RejectVendorModal";
import toast from "react-hot-toast";

export default function VendorRow({ vendor, refresh }: any) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const router = useRouter();
  // ✅ Approve Handler (clean separation)
  const handleApprove = async () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">
            Approve this vendor?
          </span>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs border rounded-lg hover:bg-gray-100"
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
              className="px-3 py-1 text-xs text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  // 🎨 Status Badge
  const getStatusColor = () => {
    switch (vendor.status) {
      case "APPROVED":
        return "bg-green-100 text-green-700 border border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    }
  };

  return (
    <>
      <tr className="border-t hover:bg-gray-50 transition-all duration-200">

        {/* 🆔 Vendor ID (short) */}
        <td className="p-4 text-xs text-gray-500 font-mono">
          {vendor.id?.slice(0, 8)}
        </td>

        {/* 👤 Vendor */}
        <td className="p-4 font-medium text-gray-800">
          {vendor.entityName || "—"}
        </td>
        {/* 📧 Email */}
        <td className="p-4 text-gray-600 text-sm">
          {vendor.email}
        </td>

        {/* 📊 Status */}
        <td className="p-4">
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor()}`}
          >
            {vendor.status}
          </span>
        </td>

        {/* ⚡ Actions */}
        <td className="p-4">
          <div className="flex gap-2 justify-end">
            {vendor.status === "PENDING" ? (
              <>
                {/* ✅ Approve */}
                <button
                  onClick={handleApprove}
                  disabled={loading !== null}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                >
                  {loading === "approve" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Check size={16} />
                  )}
                  Approve
                </button>

                {/* ❌ Reject */}
                <button
                  onClick={() => setShowRejectModal(true)}
                  disabled={loading !== null}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 transition"
                >
                  {loading === "reject" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <X size={16} />
                  )}
                  Reject
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push(`/admin/vendors/${vendor.id}`)}
                className="text-blue-600 text-sm hover:underline"
              >
                View
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* ✅ Reject Modal */}
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