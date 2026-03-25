'use client'

import { Users, Clock, CheckCircle, XCircle } from 'lucide-react'
import { StatCard } from '@/lib/features/admin/components/StatCard'
import { VendorTable } from '@/lib/features/admin/components/VendorTable'
import { SystemPanel } from '@/lib/features/admin/components/SystemPanel'

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Vendors" value="1,284" icon={Users} color="bg-blue-100" />
        <StatCard title="Pending Approvals" value="42" icon={Clock} color="bg-yellow-100" />
        <StatCard title="Approved Vendors" value="1,192" icon={CheckCircle} color="bg-green-100" />
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
  )
}