"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function RejectVendorModal({
  isOpen,
  onClose,
  onConfirm,
  loading,}: any) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (reason.trim().length < 5) {
      toast.error("Reason must be at least 5 characters");
      return;
    }

    await onConfirm(reason);
    setReason("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        
        <h2 className="text-lg font-semibold mb-2">Reject Vendor</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter rejection reason
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500"
          rows={3}
          placeholder="Enter reason..."
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => {
              setReason("");
              onClose();
            }}
            className="px-4 py-1.5 border rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm"
          >
            {loading ? "Rejecting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}