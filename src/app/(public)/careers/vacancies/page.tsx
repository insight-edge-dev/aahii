"use client";

import { useEffect, useState } from "react";
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

type VacancyItem = {
  id: string;
  title: string;
  slug: string;
  location: string;
  employmentType: string;
  department: string;
  description: string;
  applyEmail: string;
  advertisementUrl?: string | null;
  status: "DRAFT" | "OPEN" | "CLOSED";
  postedAt: string;
  applicationDeadline?: string | null;
};

type VacanciesResponse = {
  data?: {
    open?: VacancyItem[];
    closed?: VacancyItem[];
  };
};

function formatDate(value?: string | null) {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB").format(date);
}

export default function VacanciesPage() {
  const [jobs, setJobs] = useState<VacancyItem[]>([]);
  const [previousVacancies, setPreviousVacancies] = useState<VacancyItem[]>([]);

  const copyEmail = () => {
    navigator.clipboard.writeText("careers@agihf.org");
  };

  useEffect(() => {
    const controller = new AbortController();

    async function loadVacancies() {
      try {
        const response = await fetch("/api/vacancies", {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load vacancies");
        }

        const json = await response.json() as VacanciesResponse;
        setJobs(json.data?.open ?? []);
        setPreviousVacancies(json.data?.closed ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setJobs([]);
        setPreviousVacancies([]);
      }
    }

    loadVacancies();

    return () => controller.abort();
  }, []);

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
      key={job.id}
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
          <Clock size={16} /> {job.employmentType}
        </span>

        <span className="flex items-center gap-1">
          <Building2 size={16} /> Dept: {job.department}
        </span>

        <span className="flex items-center gap-1">
          <Clock size={16} /> Posted: {formatDate(job.postedAt)}
        </span>
      </div>

      <p className="mt-3 text-gray-600 max-w-3xl">
        {job.description}
      </p>

      {/* ACTIONS */}
      <div className="mt-5 flex gap-4 flex-wrap">
        <a
          href={`mailto:${job.applyEmail}`}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          <Mail size={16} />
          Apply via Email
        </a>

        {job.advertisementUrl ? (
          <a
            href={job.advertisementUrl}
            target="_blank"
            className="flex items-center gap-2 border px-5 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
          >
            <FileText size={16} />
            PDF Advt.
          </a>
        ) : null}
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
  {previousVacancies.map((job) => (
    <tr key={job.id} className="hover:bg-gray-50 transition">
      
      <td className="px-6 py-4 text-gray-600">
        {job.department}
      </td>

      <td className="px-6 py-4 font-medium text-gray-800">
        {job.title}
      </td>

      <td className="px-6 py-4 text-gray-500">
        {formatDate(job.applicationDeadline)}
      </td>

      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
          <XCircle size={14} />
          Closed
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
              Deadline: Applications accepted on a rolling basis unless specified.
            </p>

          </div>

        </motion.div>

      </section>

    </div>
  );
}
