import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Fellowships | Academics",
  description: "Information about upcoming fellowship programs.",
};

export default function FellowshipsPage() {
  return (
    <ComingSoon
      title="Fellowships"
      highlight="Academics & Research"
      description="Details about fellowship programs and applications will be available soon."
    />
  );
}
