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
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Vendors</h1>

      <StatusFilter status={status} setStatus={setStatus} />

      <VendorTable
        vendors={vendors}
        loading={loading}
        refresh={loadVendors}
      />
    </div>
  );
}