import {
  Building2,
  Stethoscope,
  FlaskConical,
  Factory,
  FileText,
  Briefcase,
  Newspaper,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type SitemapLink = {
  label: string;
  href: string;
};

export type SitemapSection = {
  title: string;
  href?: string;
  icon: LucideIcon;
  links?: SitemapLink[];
};

export const sitemapSections: SitemapSection[] = [
  {
    title: "About",
    href: "/about-us",
    icon: Building2,
    links: [
      { label: "Vision & Mission", href: "/about-us/vision-mission" },
      { label: "Board of Directors", href: "/about-us/board-of-directors" },
      { label: "Management Team", href: "/about-us/management-team" },
    ],
  },
  {
    title: "Departments",
    href: "/departments",
    icon: Stethoscope,
    links: [
      { label: "Upcoming Departments", href: "/departments/upcoming-departments" },
      { label: "Clinical Services", href: "/departments/clinical-services" },
    ],
  },
  {
    title: "Research & Development",
    href: "/research-development",
    icon: FlaskConical,
  },
  {
    title: "Infrastructure",
    href: "/infrastructure",
    icon: Factory,
  },
  {
    title: "Tenders",
    href: "/tenders",
    icon: FileText,
  },
  {
    title: "Careers",
    icon: Briefcase,
    links: [
      { label: "Vacancies", href: "/careers/vacancies" },
      { label: "Fellowship / Internship", href: "/careers/fellowship-internship" },
    ],
  },
  {
    title: "News & Media",
    icon: Newspaper,
    links: [
      { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
      { label: "Videos", href: "/videos" },
      { label: "Employee Engagement", href: "/employee-engagement" },
    ],
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    icon: Phone,
  },
  {
    title: "Legal",
    icon: ShieldCheck,
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Legal Disclaimer", href: "/legal-disclaimer" },
    ],
  },
];
