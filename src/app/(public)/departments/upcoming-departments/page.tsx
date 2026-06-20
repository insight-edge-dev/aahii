import DepartmentsShowcase, {
  type DepartmentGroup,
  type DepartmentStat,
} from "@/components/departments/DepartmentsShowcase";

const stats: DepartmentStat[] = [
  {
    label: "Total Departments",
    value: "12",
    description: "Planned clinical departments across core and specialty care.",
  },
  {
    label: "Expansion Phases",
    value: "3",
    description: "A phased rollout aligned with infrastructure and workforce readiness.",
  },
  {
    label: "Healthcare Focus Areas",
    value: "8+",
    description: "Priority domains spanning medicine, diagnostics, critical care, and recovery.",
  },
];

const groups: DepartmentGroup[] = [
  {
    title: "Core Clinical Care",
    description:
      "Foundational departments designed to anchor outpatient, inpatient, and multidisciplinary care delivery.",
    departments: [
      {
        name: "General Medicine",
        description:
          "Comprehensive adult medical care for diagnosis, prevention, and chronic disease management.",
        detail:
          "The department will serve as a central access point for internal medicine, referrals, and coordinated care pathways across specialties.",
        status: "Upcoming",
        category: "Core Care",
        icon: "stethoscope",
      },
      {
        name: "Surgery",
        description:
          "General surgical services planned to support elective, emergency, and referral-based procedures.",
        detail:
          "The surgical program will be developed with emphasis on patient safety, perioperative care, and integration with advanced operating infrastructure.",
        status: "Upcoming",
        category: "Core Care",
        icon: "scissors",
      },
      {
        name: "Gynaecology & Obstetrics",
        description:
          "Women's health services covering maternal care, reproductive health, and obstetric support.",
        detail:
          "This service line will support phased development of maternal health, gynaecological care, and coordinated newborn support.",
        status: "Upcoming",
        category: "Core Care",
        icon: "baby",
      },
      {
        name: "Psychiatry",
        description:
          "Mental health services focused on assessment, counselling, and integrated treatment planning.",
        detail:
          "The department will strengthen holistic care by connecting behavioural health with medical, rehabilitation, and community health programs.",
        status: "Upcoming",
        category: "Core Care",
        icon: "brain",
      },
    ],
  },
  {
    title: "Specialty Medicine",
    description:
      "Focused specialty departments for high-burden chronic disease, complex diagnostics, and advanced clinical management.",
    departments: [
      {
        name: "Gastroenterology",
        description:
          "Specialized care for digestive, liver, pancreatic, and gastrointestinal disorders.",
        detail:
          "The service will support advanced evaluation, procedure-linked referrals, and cross-disciplinary care for complex digestive diseases.",
        status: "Upcoming",
        category: "Specialty",
        icon: "pill",
      },
      {
        name: "Neurology",
        description:
          "Evaluation and management of disorders affecting the brain, spine, nerves, and muscles.",
        detail:
          "Neurology will support stroke pathways, neurodiagnostics, and collaboration with rehabilitation and critical care services.",
        status: "Upcoming",
        category: "Specialty",
        icon: "brain",
      },
      {
        name: "Endocrinology",
        description:
          "Specialized care for diabetes, thyroid, metabolic, and hormonal disorders.",
        detail:
          "The department will support long-term metabolic care models, prevention programs, and coordinated chronic disease management.",
        status: "Upcoming",
        category: "Specialty",
        icon: "activity",
      },
      {
        name: "Rheumatology",
        description:
          "Clinical services for autoimmune, inflammatory, and musculoskeletal disorders.",
        detail:
          "Rheumatology will add structured pathways for early diagnosis, disease monitoring, and multidisciplinary management.",
        status: "Upcoming",
        category: "Specialty",
        icon: "shield-plus",
      },
    ],
  },
  {
    title: "Critical & Supportive Care",
    description:
      "Departments that strengthen high-acuity care, respiratory medicine, renal health, and blood-related services.",
    departments: [
      {
        name: "Pulmonary Medicine",
        description:
          "Respiratory care for lung disease, sleep-related breathing disorders, and pulmonary rehabilitation.",
        detail:
          "Pulmonary Medicine will support diagnostics, chronic respiratory care, and integrated critical care pathways.",
        status: "Upcoming",
        category: "Supportive Care",
        icon: "heart-pulse",
      },
      {
        name: "Haematology",
        description:
          "Specialized services for blood disorders, anaemia, coagulation, and related conditions.",
        detail:
          "The department will strengthen diagnostic depth and specialty referral support for complex blood-related illnesses.",
        status: "Upcoming",
        category: "Diagnostics",
        icon: "syringe",
      },
      {
        name: "Nephrology",
        description:
          "Kidney care services covering chronic kidney disease, hypertension, and renal complications.",
        detail:
          "Nephrology will support early detection, renal risk management, and phased development of advanced kidney care pathways.",
        status: "Upcoming",
        category: "Supportive Care",
        icon: "hospital",
      },
      {
        name: "Critical Care",
        description:
          "High-acuity care services for complex and life-threatening medical conditions.",
        detail:
          "Critical Care will anchor intensive monitoring, multidisciplinary escalation, and evidence-led treatment protocols.",
        status: "Upcoming",
        category: "Acute Care",
        icon: "badge-plus",
      },
    ],
  },
];

export default function UpcomingDepartmentsPage() {
  return (
    <DepartmentsShowcase
      eyebrow="Clinical Expansion"
      title="Upcoming Clinical Departments"
      intro="AAHII is planning a phased expansion of clinical departments to strengthen tertiary healthcare access, specialty services, and integrated patient care in Assam."
      groups={groups}
      stats={stats}
    />
  );
}
