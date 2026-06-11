"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  CalendarDays,
  Download,
  FileText,
  Link2,
  Search,
} from "lucide-react";

type TenderStatus = "ACTIVE" | "CLOSED" | "CANCELLED";
type Filter = "All" | "Active" | "Closed" | "Cancelled";

type TenderDocument = {
  id: string;
  kind: "TENDER_DOCUMENT" | "CORRIGENDUM";
  title: string;
  fileUrl: string;
  originalName: string;
};

type Tender = {
  id: string;
  ref: string;
  title: string;
  description: string;
  itemType: string | null;
  publicationDate: string | null;
  preBidMeeting: string | null;
  bidEndDateTime: string | null;
  bidOpeningDateTime: string | null;
  status: TenderStatus;
  archived: boolean;
  documents: TenderDocument[];
};

const filters: Filter[] = ["All", "Active", "Closed", "Cancelled"];

const statusLabels: Record<TenderStatus, Exclude<Filter, "All">> = {
  ACTIVE: "Active",
  CLOSED: "Closed",
  CANCELLED: "Cancelled",
};

const statusStyles: Record<TenderStatus, string> = {
  ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CLOSED: "border-red-200 bg-red-50 text-red-700",
  CANCELLED: "border-neutral-200 bg-neutral-100 text-neutral-600",
};

export default function TendersPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenders = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/tenders?limit=100", {
          cache: "no-store",
        });
        const json = await response.json();
        const nextTenders = json?.data?.tenders ?? [];

        setTenders(nextTenders);
        setSelectedTenderId(nextTenders[0]?.id ?? null);
      } catch {
        setTenders([]);
      } finally {
        setLoading(false);
      }
    };

    loadTenders();
  }, []);

  const filteredTenders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tenders.filter((tender) => {
      const matchesStatus =
        activeFilter === "All" || statusLabels[tender.status] === activeFilter;

      const matchesQuery =
        !normalizedQuery ||
        tender.ref.toLowerCase().includes(normalizedQuery) ||
        tender.title.toLowerCase().includes(normalizedQuery) ||
        tender.description.toLowerCase().includes(normalizedQuery) ||
        tender.itemType?.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [activeFilter, query, tenders]);

  const selectedTender =
    filteredTenders.find((tender) => tender.id === selectedTenderId) ??
    filteredTenders[0] ??
    null;

  return (
    <main className="bg-white text-neutral-950">
      <section className="border-b border-neutral-200 bg-gradient-to-b from-blue-50/70 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            Procurement
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0f2a6d] md:text-6xl">
            Tenders
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
            Browse procurement opportunities and tender notices published by
            Assam Advanced Healthcare Innovation Institute.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
        <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm md:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block flex-1">
              <span className="sr-only">Search tenders</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              />
              <input
                className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by tender title, reference, item type, or description"
                type="search"
                value={query}
              />
            </label>

            <div className="flex overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-1">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    className={`min-h-10 whitespace-nowrap rounded-lg px-4 text-sm font-medium transition ${
                      isActive
                        ? "bg-white text-neutral-950 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    type="button"
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <section className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm md:p-4">
            <div className="flex items-center justify-between px-1 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-950">
                  Tender Notices
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  {loading
                    ? "Loading notices"
                    : `${filteredTenders.length} matching notice${
                        filteredTenders.length === 1 ? "" : "s"
                      }`}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {filteredTenders.map((tender) => {
                const isSelected = selectedTender?.id === tender.id;

                return (
                  <button
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? "border-blue-300 bg-blue-50/70 shadow-sm ring-4 ring-blue-100"
                        : "border-neutral-200 bg-white hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
                    }`}
                    key={tender.id}
                    onClick={() => setSelectedTenderId(tender.id)}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                        {tender.ref}
                      </p>
                      <StatusBadge status={tender.status} />
                    </div>

                    <h3 className="mt-3 text-base font-semibold leading-6 text-neutral-950">
                      {tender.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
                      <CalendarDays
                        aria-hidden="true"
                        className="h-4 w-4 text-neutral-400"
                      />
                      <span>{tender.publicationDate || "Bid date to be announced"}</span>
                    </div>
                  </button>
                );
              })}

              {!loading && filteredTenders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center">
                  <p className="text-sm font-medium text-neutral-900">
                    No tenders found
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Try changing your search or status filter.
                  </p>
                </div>
              ) : null}
            </div>
          </section>

          <section className="min-h-[480px] rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-8">
            {selectedTender ? (
              <TenderDetails tender={selectedTender} />
            ) : (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 text-center">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <FileText
                      aria-hidden="true"
                      className="h-5 w-5 text-neutral-500"
                    />
                  </div>
                  <p className="mt-4 text-base font-semibold text-neutral-950">
                    {loading ? "Loading tenders..." : "Select a tender to view details"}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

function StatusBadge({ status }: { status: TenderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

function TenderDetails({ tender }: { tender: Tender }) {
  const tenderDocuments = tender.documents.filter(
    (document) => document.kind === "TENDER_DOCUMENT",
  );
  const relatedDocuments = tender.documents.filter(
    (document) => document.kind === "CORRIGENDUM",
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">{tender.ref}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
            {tender.title}
          </h2>
        </div>
        <StatusBadge status={tender.status} />
      </div>

      <div className="grid gap-4 border-b border-neutral-200 py-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard
            icon={<CalendarDays aria-hidden="true" className="h-5 w-5" />}
            label="Bid Publication"
            value={tender.publicationDate || "To be announced"}
          />
          <InfoCard
            icon={<Link2 aria-hidden="true" className="h-5 w-5" />}
            label="Type of Items"
            value={tender.itemType || "Tender notice"}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard
            icon={<CalendarDays aria-hidden="true" className="h-5 w-5" />}
            label="Pre-Bid Meeting"
            value={tender.preBidMeeting || "To be announced"}
          />
          <InfoCard
            icon={<CalendarDays aria-hidden="true" className="h-5 w-5" />}
            label="Bid End Date/Time"
            value={tender.bidEndDateTime || "To be announced"}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard
            icon={<CalendarDays aria-hidden="true" className="h-5 w-5" />}
            label="Bid Opening Date/Time"
            value={tender.bidOpeningDateTime || "To be announced"}
          />
        </div>
      </div>

      <div className="py-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Description
        </h3>
        <p className="mt-3 text-base leading-7 text-neutral-700">
          {tender.description}
        </p>
      </div>

      <div className="mt-auto grid gap-6">
        <DocumentGroup documents={tenderDocuments} title="Tender Documents" />
        <DocumentGroup
          documents={relatedDocuments}
          title="Corrigendum and Related Notices"
        />
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </p>
      <div className="mt-3 flex items-center gap-2 text-base font-semibold text-neutral-950">
        <span className="text-blue-600">{icon}</span>
        {value}
      </div>
    </div>
  );
}

function DocumentGroup({
  documents,
  title,
}: {
  documents: TenderDocument[];
  title: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
      <div className="mt-3 grid gap-3">
        {documents.length ? (
          documents.map((document) => (
            <a
              className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
              href={`/api/tenders/documents/${document.id}`}
              key={document.id}
              rel="noreferrer"
              target="_blank"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
                  <FileText
                    aria-hidden="true"
                    className="h-5 w-5 text-neutral-600"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-950">
                    {document.title}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {document.originalName || "PDF document"}
                  </p>
                </div>
              </div>
              <Download
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-neutral-500"
              />
            </a>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-sm text-neutral-500">
            No documents uploaded.
          </p>
        )}
      </div>
    </div>
  );
}
