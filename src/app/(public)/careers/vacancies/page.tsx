"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Building2,
  FileText,
  Mail,
  Copy,
  Briefcase,
  Calendar,
  XCircle,

} from "lucide-react";

type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  dept: string;
  date: string;
  description: string;
  pdf: string;
};

const jobs: Job[] = [
  {
    id: "ra-plant-drugs",
    title: "Research Associate – Development of Plant-Based Drugs for Rheumatoid Arthritis",
    location: "Assam Advanced Healthcare Innovation Institute (AAHII), IIT Guwahati",
    type: "Full-time",
    dept: "R&D",
    date: "17.05.2026",
    description:
      "Work on developing plant-based therapeutics for rheumatoid arthritis including phytochemical extraction, in-vitro/in-vivo studies, and molecular analysis.",
    pdf: "https://res.cloudinary.com/ddi8hisku/image/upload/fl_attachment/v1777886477/Advertisement_for_website_q8dond.pdf",
  },
  {
    id: "rf-engineer-mri",
    title: "RF Engineer – Low-field MRI Systems (Indigenous Development)",
    location: "AAHII, IIT Guwahati",
    type: "Full-time",
    dept: "R&D",
    date: "17.05.2026",
    description:
      "Design and optimize RF subsystems for low-field MRI including RF coils, EM simulations, impedance matching, and signal chain optimization.",
    pdf: "https://res.cloudinary.com/ddi8hisku/image/upload/fl_attachment/v1777886477/Advertisement_for_website_q8dond.pdf",
  },
  {
    id: "robotics-mechatronics",
    title: "Robotics and Mechatronics Engineer",
    location: "AAHII, IIT Guwahati",
    type: "Full-time",
    dept: "Engineering",
    date: "17.05.2026",
    description:
      "Design, build, and test electromechanical systems for surgical robotics including CAD design, embedded systems, sensors, and system integration.",
    pdf: "https://res.cloudinary.com/ddi8hisku/image/upload/fl_attachment/v1777886477/Advertisement_for_website_q8dond.pdf",
  },
  {
    id: "senior-robotics-software",
    title: "Senior Robotics Software Engineer (C++ Expert)",
    location: "AAHII, IIT Guwahati",
    type: "Full-time",
    dept: "Engineering",
    date: "17.05.2026",
    description:
      "Develop high-performance real-time robotic software using modern C++, ROS2, and multi-threaded architectures for surgical robotics systems.",
    pdf: "https://res.cloudinary.com/ddi8hisku/image/upload/fl_attachment/v1777886477/Advertisement_for_website_q8dond.pdf",
  },
  {
    id: "senior-design-surgical",
    title: "Senior Design Engineer – Surgical Robotics",
    location: "AAHII, IIT Guwahati",
    type: "Full-time",
    dept: "Engineering",
    date: "17.05.2026",
    description:
      "Design and develop next-generation surgical robotic systems including mechanisms, actuation, and sterilizable interfaces with focus on precision and safety.",
    pdf: "https://res.cloudinary.com/ddi8hisku/image/upload/fl_attachment/v1777886477/Advertisement_for_website_q8dond.pdf",
  },
];



const previousVacancies = [
  {
    department: "R&D",
    role: "Research Associate – Development of Plant-Based Drugs for Rheumatoid Arthritis",
    lastDate: "30/06/2025",
    status: "Closed",
  },
  {
    department: "R&D",
    role: "Project Engineer – Low-field MRI Hardware Development – Corrigendum",
    lastDate: "25/06/2025",
    status: "Closed",
  },
  {
    department: "R&D",
    role: "Research Associate – Low-field MRI Metamaterial Development",
    lastDate: "25/06/2025",
    status: "Closed",
  },
  {
    department: "R&D",
    role: "Project Engineer – Low-field MRI Hardware Development",
    lastDate: "05/06/2025",
    status: "Closed",
  },
  {
    department: "Finance",
    role: "Executive – Finance and Accounts",
    lastDate: "30/09/2024",
    status: "Closed",
  },
  {
    department: "Procurement",
    role: "Procurement Executive",
    lastDate: "30/09/2024",
    status: "Closed",
  },
  {
    department: "R&D",
    role: "Research Associate",
    lastDate: "30/09/2024",
    status: "Closed",
  },
];



export default function VacanciesPage() {
  const copyEmail = () => {
    navigator.clipboard.writeText("careers@agihf.org");
  };

  return (
    <div className="bg-white">

      {/* CURRENT OPPORTUNITIES */}

      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-semibold flex items-center gap-3">
            <span className="w-1 h-6 bg-yellow-500"></span>
            Current Opportunities
          </h2>

          <span className="text-yellow-500 text-sm uppercase tracking-wide">
            Open Positions
          </span>

        </div>

         {jobs.length === 0 ? (
    <div className="text-center text-gray-500 py-10">
      No openings available right now.
    </div>
  ) : (

    <div className="space-y-6">
  {jobs.map((job, i) => (
    <motion.div
      key={i}
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="relative border rounded-xl p-6 bg-gray-50 hover:shadow-lg transition"
    >
      
{/* 
<div className="absolute top-2 right-2 z-10">
  <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
    
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
    </span>

    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
      Extended Till 10th April
    </span>
  </div>
</div>
*/}

      <h3 className="text-lg font-semibold">{job.title}</h3>

      {/* META */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <MapPin size={16} /> {job.location}
        </span>

        <span className="flex items-center gap-1">
          <Clock size={16} /> {job.type}
        </span>

        <span className="flex items-center gap-1">
          <Building2 size={16} /> Dept: {job.dept}
        </span>

        <span className="flex items-center gap-1">
          <Clock size={16} /> Posted: {job.date}
        </span>
      </div>

      <p className="mt-3 text-gray-600 max-w-3xl">
        {job.description}
      </p>

      {/* ACTIONS */}
      <div className="mt-5 flex gap-4 flex-wrap">
        <a
          href="mailto:careers@agihf.org"
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          <Mail size={16} />
          Apply via Email
        </a>

        <a
          href={job.pdf}
          target="_blank"
          className="flex items-center gap-2 border px-5 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
        >
          <FileText size={16} />
          PDF Advt.
        </a>
      </div>

    </motion.div>
  ))}
</div>
)}
      </section>

      {/* PREVIOUS VACANCIES */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        {/* Heading */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-semibold flex items-center gap-3">
            <span className="w-1 h-6 bg-yellow-500"></span>
            Previous Vacancies
          </h2>

          <span className="text-sm text-gray-500 uppercase tracking-wide">
            Closed Positions
          </span>

        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">

          <table className="w-full text-sm">

            {/* Header */}
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-6 py-4 font-medium">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} />
                    Department
                  </div>
                </th>

                <th className="text-left px-6 py-4 font-medium">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    Role
                  </div>
                </th>

                <th className="text-left px-6 py-4 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    Last Date
                  </div>
                </th>

                <th className="text-left px-6 py-4 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            {/* Body */}
<tbody className="divide-y">
  {previousVacancies.map((job, i) => (
    <tr key={i} className="hover:bg-gray-50 transition">
      
      <td className="px-6 py-4 text-gray-600">
        {job.department}
      </td>

      <td className="px-6 py-4 font-medium text-gray-800">
        {job.role}
      </td>

      <td className="px-6 py-4 text-gray-500">
        {job.lastDate}
      </td>

      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
          <XCircle size={14} />
          {job.status}
        </span>
      </td>

    </tr>
  ))}
</tbody>

          </table>

        </div>

      </section>

      {/* APPLICATION INSTRUCTIONS */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <motion.div
          className="grid md:grid-cols-2 overflow-hidden rounded-2xl bg-blue-900 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >

          {/* Illustration Side */}
          <div className="relative hidden md:flex items-center justify-center bg-blue-950">

            <Image
              src="/images/vacan.png"
              alt="Application Illustration"
              width={900}
              height={900}
              priority
              className="object-contain opacity-90"
            />

          </div>

          {/* Content Side */}
          <div className="p-10">

            <h3 className="text-2xl font-semibold">
              Application Instructions
            </h3>

            <p className="mt-3 text-blue-100 leading-relaxed">
              Interested candidates should submit their updated CV along with
              a cover letter highlighting relevant experience and research
              interests.
            </p>

            {/* Email Card */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-blue-800 p-4">

              <div>
                <p className="text-xs text-gray-300">
                  SUBMISSION EMAIL
                </p>

                <p className="mt-1 flex items-center gap-2 text-lg font-semibold">
                  <Mail size={18} />
                  careers@agihf.org
                </p>
              </div>

              <button
                onClick={copyEmail}
                className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm text-black transition hover:bg-white"
              >
                <Copy size={16} />
                Copy Email Address
              </button>

            </div>

            {/* Deadline */}
            <p className="mt-4 text-sm text-yellow-300">
              📅 Deadline: Applications accepted on a rolling basis unless specified.
            </p>

          </div>

        </motion.div>

      </section>

    </div>
  );
}