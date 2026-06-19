import Link from "next/link";
import { Briefcase, Plus } from "lucide-react";

import VacanciesTable from "@/lib/features/admin/vacancies/components/VacanciesTable";

export default function VacanciesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <Briefcase size={18} />
            <span className="text-sm font-medium">CMS</span>
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-gray-900">
            Vacancies
          </h1>
        </div>

        <Link
          href="/admin/vacancies/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Vacancy
        </Link>
      </div>

      <VacanciesTable />
    </div>
  );
}
