import { notFound } from "next/navigation";

import VacancyForm from "@/lib/features/admin/vacancies/components/VacancyForm";
import { getVacancyById } from "@/lib/features/vacancies/services/vacancies.service";

type PageProps = {
  params: Promise<{
    vacancyId: string;
  }>;
};

export default async function EditVacancyPage({ params }: PageProps) {
  const { vacancyId } = await params;
  const result = await getVacancyById(vacancyId);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="p-6">
      <VacancyForm editData={result.data} />
    </div>
  );
}
