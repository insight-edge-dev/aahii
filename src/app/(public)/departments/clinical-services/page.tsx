import DepartmentsShowcase, {
  type DepartmentGroup,
  type DepartmentStat,
} from "@/components/departments/DepartmentsShowcase";

const stats: DepartmentStat[] = [
  {
    label: "Total Departments",
    value: "12",
    description: "Advanced service areas spanning surgery, precision care, and critical specialties.",
  },
  {
    label: "Expansion Phases",
    value: "4",
    description: "Clinical capabilities aligned with infrastructure, training, and technology readiness.",
  },
  {
    label: "Healthcare Focus Areas",
    value: "9+",
    description: "Integrated focus across advanced procedures, diagnostics, newborn care, and intensive care.",
  },
];

const groups: DepartmentGroup[] = [
  {
    title: "Surgical Innovation",
    description:
      "Procedure-led services focused on safer surgery, faster recovery, and technology-enabled operating environments.",
    departments: [
      {
        name: "Advanced Laparoscopic Surgery",
        description:
          "Minimally invasive surgical care designed to reduce trauma, recovery time, and hospital stay.",
        detail:
          "This service area supports modern operating workflows, image-guided decision-making, and protocol-based perioperative safety.",
        status: "Clinical Service",
        category: "Surgery",
        icon: "scissors",
      },
      {
        name: "Endo-Urology",
        description:
          "Specialized urological procedures using endoscopic and minimally invasive approaches.",
        detail:
          "Endo-Urology will strengthen treatment pathways for stone disease, urinary tract conditions, and precision procedural care.",
        status: "Clinical Service",
        category: "Surgery",
        icon: "stethoscope",
      },
      {
        name: "Robotic Surgery",
        description:
          "Technology-assisted surgical capability for greater precision and consistency in complex procedures.",
        detail:
          "The program will support skill development, advanced instrumentation, and multidisciplinary surgical planning.",
        status: "Clinical Service",
        category: "Surgery",
        icon: "activity",
      },
    ],
  },
  {
    title: "Precision & Regenerative Care",
    description:
      "Forward-looking services connecting molecular insight, regenerative therapies, and patient-specific treatment strategies.",
    departments: [
      {
        name: "Stem Cell Therapy",
        description:
          "Regenerative medicine capability focused on translational care and future therapeutic innovation.",
        detail:
          "The service will be developed with attention to evidence, ethics, laboratory readiness, and clinical governance.",
        status: "Clinical Service",
        category: "Regenerative",
        icon: "dna",
      },
      {
        name: "Precision Medicine",
        description:
          "Personalized treatment planning guided by molecular, clinical, and diagnostic insights.",
        detail:
          "Precision Medicine will connect diagnostics, data, and clinical decision-making to support targeted care pathways.",
        status: "Clinical Service",
        category: "Precision Care",
        icon: "microscope",
      },
      {
        name: "Microbiology",
        description:
          "Diagnostic microbiology support for infection detection, antimicrobial guidance, and hospital safety.",
        detail:
          "The department strengthens infection control, laboratory-backed diagnosis, and evidence-led treatment decisions.",
        status: "Clinical Service",
        category: "Diagnostics",
        icon: "flask",
      },
    ],
  },
  {
    title: "Maternal & Child Health",
    description:
      "Specialized care pathways for newborns, children, mothers, and family-centered clinical support.",
    departments: [
      {
        name: "Neonatology",
        description:
          "Specialized newborn care focused on premature, low-birth-weight, and medically complex infants.",
        detail:
          "Neonatology will support high-dependency newborn care, monitoring, family counselling, and coordinated paediatric escalation.",
        status: "Clinical Service",
        category: "Newborn Care",
        icon: "baby",
      },
      {
        name: "Adult & Paediatric Cardiac Surgery",
        description:
          "Cardiac surgical services planned for adult and paediatric heart conditions.",
        detail:
          "This capability will require multidisciplinary coordination across cardiology, anaesthesia, intensive care, and rehabilitation.",
        status: "Clinical Service",
        category: "Cardiac Care",
        icon: "heart-pulse",
      },
    ],
  },
  {
    title: "Advanced Critical Specialties",
    description:
      "High-complexity clinical services for neurological, digestive, liver, and intensive care needs.",
    departments: [
      {
        name: "Advanced Neurosurgery",
        description:
          "Specialized surgical care for complex brain, spine, and nervous system conditions.",
        detail:
          "Advanced Neurosurgery will support high-precision surgical planning, critical monitoring, and rehabilitation-linked recovery.",
        status: "Clinical Service",
        category: "Neurosciences",
        icon: "brain",
      },
      {
        name: "Gastroenterology",
        description:
          "Specialty care for digestive disorders supported by diagnostic and procedure-based services.",
        detail:
          "The department will connect medical gastroenterology, endoscopy-linked referrals, nutrition, and long-term disease management.",
        status: "Clinical Service",
        category: "Digestive Health",
        icon: "pill",
      },
      {
        name: "Hepatology",
        description:
          "Focused care for liver diseases, metabolic liver conditions, and complex hepatic disorders.",
        detail:
          "Hepatology will add specialty depth for liver diagnostics, chronic disease monitoring, and advanced referral pathways.",
        status: "Clinical Service",
        category: "Liver Care",
        icon: "shield-plus",
      },
      {
        name: "Critical Care",
        description:
          "Intensive care capability for patients requiring close monitoring and advanced life support.",
        detail:
          "Critical Care will support protocol-driven escalation, multidisciplinary rounds, and technology-assisted patient monitoring.",
        status: "Clinical Service",
        category: "Acute Care",
        icon: "badge-plus",
      },
    ],
  },
];

export default function ClinicalServicesPage() {
  return (
    <DepartmentsShowcase
      eyebrow="Clinical Services"
      title="Clinical Services"
      intro="AAHII's clinical service roadmap brings together advanced medicine, surgical innovation, diagnostics, and patient-centered specialty care."
      groups={groups}
      stats={stats}
    />
  );
}
