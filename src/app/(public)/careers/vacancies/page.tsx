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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-14 sm:pb-20">

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">

          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-3 text-slate-900">
            <span className="w-1 h-6 bg-yellow-500 shrink-0"></span>
            Current Opportunities
          </h2>

          <span className="inline-flex w-fit items-center rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-yellow-600">
            Open Positions
          </span>

        </div>

         {jobs.length === 0 ? (
    <div className="text-center text-gray-500 py-10">
      No openings available right now.
    </div>
  ) : (

    <div className="space-y-4 sm:space-y-5">
  {jobs.map((job, i) => (
    <motion.div
      key={job.id}
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="relative rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 transition hover:shadow-lg hover:border-gray-300"
    >

      <div className="flex flex-wrap items-start gap-2 justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
          {job.title}
        </h3>

        {job.status === "OPEN" && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Open
          </span>
        )}
      </div>

      {/* META */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 mt-3">
        <span className="flex items-center gap-1.5">
          <MapPin size={15} className="shrink-0" /> {job.location}
        </span>

        <span className="flex items-center gap-1.5">
          <Clock size={15} className="shrink-0" /> {job.employmentType}
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          <Building2 size={13} className="shrink-0" /> {job.department}
        </span>

        <span className="flex items-center gap-1.5">
          <Calendar size={15} className="shrink-0" /> Posted {formatDate(job.postedAt)}
        </span>
      </div>

      <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl">
        {job.description}
      </p>

      {/* ACTIONS */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <a
          href={`mailto:${job.applyEmail}`}
          className="inline-flex items-center justify-center gap-2 min-h-11 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-yellow-600 hover:shadow"
        >
          <Mail size={16} />
          Apply via Email
        </a>

        {job.advertisementUrl ? (
          <a
            href={job.advertisementUrl}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 min-h-11 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-gray-100"
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">

        {/* Heading */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">

          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-3 text-slate-900">
            <span className="w-1 h-6 bg-yellow-500 shrink-0"></span>
            Previous Vacancies
          </h2>

          <span className="inline-flex w-fit items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-500">
            Closed Positions
          </span>

        </div>

        {/* Mobile: card list */}
        <div className="space-y-3 md:hidden">
          {previousVacancies.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-slate-800 leading-snug">
                  {job.title}
                </p>

                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-500">
                  <XCircle size={12} />
                  Closed
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} /> {job.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {formatDate(job.applicationDeadline)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">

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
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-red-50 text-red-500">
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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">

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
          <div className="p-6 sm:p-10">

            <h3 className="text-xl sm:text-2xl font-semibold">
              Application Instructions
            </h3>

            <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
              Interested candidates should submit their updated CV along with
              a cover letter highlighting relevant experience and research
              interests.
            </p>

            {/* Email Card */}
            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-4 rounded-lg bg-blue-800 p-4">

              <div>
                <p className="text-xs text-gray-300">
                  SUBMISSION EMAIL
                </p>

                <p className="mt-1 flex items-center gap-2 text-base sm:text-lg font-semibold break-all">
                  <Mail size={18} className="shrink-0" />
                  careers@agihf.org
                </p>
              </div>

              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-2 min-h-11 rounded-md bg-gray-200 px-4 py-2 text-sm text-black transition hover:bg-white"
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
