"use client";

import { useEffect, useState } from "react";
import { Users, Clock, CheckCircle } from "lucide-react";

import { api } from "@/lib/axios";
import { StatCard } from "@/lib/features/admin/components/StatCard";
import { VendorTable } from "@/lib/features/admin/components/VendorTable";
import { SystemPanel } from "@/lib/features/admin/components/SystemPanel";

/* ================= TYPES ================= */

type VendorStatus = "PENDING" | "APPROVED" | "REJECTED";

type Vendor = {
  id: string;
  entityName: string;
  status: VendorStatus;
};

type Stats = {
  total: number;
  pending: number;
  approved: number;
};

/* ================= COMPONENT ================= */

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/vendors");

        const data: Vendor[] = res?.data?.data ?? [];

        if (!mounted) return;

        const total = data.length;
        const pending = data.filter(v => v.status === "PENDING").length;
        const approved = data.filter(v => v.status === "APPROVED").length;

        setStats({ total, pending, approved });

      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, []);

  /* ================= UI ================= */

  return (
    <div className="space-y-6">

      {/* 🔝 Stats */}
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

      {/* 🔽 Content */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Vendors List */}
        <div className="lg:col-span-2">
          <VendorTable />
        </div>

        {/* Right Panel */}
        <div>
          <SystemPanel />
        </div>

      </div>

    </div>
  );
}