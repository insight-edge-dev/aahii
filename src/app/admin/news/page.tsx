import Link from "next/link";
import { Newspaper, Plus } from "lucide-react";

import { NewsTable } from "@/lib/features/admin/news/components/NewsTable";

export default function AdminNewsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <Newspaper size={18} />
            <span className="text-sm font-medium">Institutional CMS</span>
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-gray-900">
            Newsroom
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create, publish, feature, archive, and distribute institutional news.
          </p>
        </div>

        <Link
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white shadow-sm transition hover:bg-blue-700"
          href="/admin/news/new"
        >
          <Plus size={16} />
          Add News
        </Link>
      </div>

      <NewsTable />
    </div>
  );
}
