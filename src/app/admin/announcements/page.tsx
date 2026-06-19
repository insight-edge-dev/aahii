import Link from "next/link";
import { Plus, Megaphone } from "lucide-react";

import AnnouncementsTable from "@/lib/features/admin/announcements/components/AnnouncementsTable";

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <Megaphone size={18} />
            <span className="text-sm font-medium">CMS</span>
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-gray-900">
            Announcements
          </h1>
        </div>

        <Link
          href="/admin/announcements/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Announcement
        </Link>
      </div>

      <AnnouncementsTable />
    </div>
  );
}
