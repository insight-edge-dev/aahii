"use client";

import { useEffect, useState } from "react";
import { fetchVendors } from "@/lib/features/admin/news/api/vendor.api";
import VendorTable from "@/lib/features/admin/components/vendorcompo/VendorTable";
import StatusFilter from "@/lib/features/admin/components/vendorcompo/StatusFilter";

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const res = await fetchVendors(status);
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, [status]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Vendor Management
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-950">
          Vendors
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review vendor registrations and manage approval status.
        </p>
      </div>

      <StatusFilter status={status} setStatus={setStatus} />

      <VendorTable
        vendors={vendors}
        loading={loading}
        refresh={loadVendors}
      />
    </div>
  );
}
