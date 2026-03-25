"use client";

import { useEffect, useState } from "react";
import { Users, Clock, CheckCircle } from "lucide-react";

import { StatCard } from "@/lib/features/admin/components/StatCard";
import { VendorTable } from "@/lib/features/admin/components/VendorTable";
import { SystemPanel } from "@/lib/features/admin/components/SystemPanel";

import { api } from "@/lib/axios";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/vendors");
        const data = res.data.data || [];

        setStats({
          total: data.length,
          pending: data.filter((v: any) => v.status === "PENDING").length,
          approved: data.filter((v: any) => v.status === "APPROVED").length,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Vendors"
          value={loading ? "..." : stats.total}
          icon={Users}
        />

        <StatCard
          title="Pending Approvals"
          value={loading ? "..." : stats.pending}
          icon={Clock}
        />

        <StatCard
          title="Approved Vendors"
          value={loading ? "..." : stats.approved}
          icon={CheckCircle}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <VendorTable />
        </div>

        <div>
          <SystemPanel />
        </div>

      </div>

    </div>
  );
}