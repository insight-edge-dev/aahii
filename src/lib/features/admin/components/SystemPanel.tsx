'use client'

import { useRouter } from "next/navigation";
import { CheckCircle, Clock, Plus } from "lucide-react";

export const SystemPanel = ({ pendingCount = 0 }: any) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-900">
        Quick Actions
      </h2>

      {/* ACTIONS */}
      <div className="space-y-3">

        <button
          onClick={() => router.push("/admin/vendors?status=PENDING")}
          className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50 transition"
        >
          <Clock size={16} className="text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">
            Review Pending Vendors
          </span>
        </button>

        <button
          onClick={() => router.push("/admin/vendors")}
          className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50 transition"
        >
          <CheckCircle size={16} className="text-green-500" />
          <span className="text-sm font-medium text-gray-700">
            View All Vendors
          </span>
        </button>

        <button
          onClick={() => router.push("/vendor-registration")}
          className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50 transition"
        >
          <Plus size={16} className="text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            Add New Vendor
          </span>
        </button>

      </div>

      {/* PENDING ALERT */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-yellow-700 font-medium">
          {pendingCount} vendors pending approval
        </p>

        <button
          onClick={() => router.push("/admin/vendors?status=PENDING")}
          className="text-xs text-yellow-800 mt-2 underline"
        >
          Review now →
        </button>
      </div>

    </div>
  );
};