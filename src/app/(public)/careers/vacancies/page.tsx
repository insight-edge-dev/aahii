import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Vacancies | Careers",
  description: "Explore upcoming career opportunities at our institution.",
};

export default function VacanciesPage() {
  return (
    <ComingSoon
      title="Vacancies"
      highlight="Careers"
      description="Open positions and career opportunities will be announced here soon."
    />
  );
}
