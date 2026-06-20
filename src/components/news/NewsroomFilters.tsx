"use client";

import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryOptions = [
  { label: "All News", value: "" },
  { label: "Research", value: "Research" },
  { label: "Innovation", value: "Innovation" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "CSR", value: "CSR" },
  { label: "Partnerships", value: "Partnerships" },
  { label: "Events", value: "Events" },
  { label: "Media Coverage", value: "Media Coverage" },
  { label: "Press Release", value: "Press Release" },
  { label: "Awards", value: "Awards" },
];

const sourceOptions = [
  { label: "All Sources", value: "" },
  { label: "AAHII", value: "AAHII" },
  { label: "LinkedIn", value: "LinkedIn" },
  { label: "The Assam Tribune", value: "The Assam Tribune" },
  { label: "The Indian Express", value: "The Indian Express" },
];

type NewsroomFiltersProps = {
  articleCount: number;
  category?: string;
  search?: string;
  source?: string;
};

function findLabel(
  options: Array<{ label: string; value: string }>,
  value?: string,
  fallback = "",
) {
  return options.find((option) => option.value === value)?.label || fallback;
}

export default function NewsroomFilters({
  articleCount,
  category = "",
  search = "",
  source = "",
}: NewsroomFiltersProps) {
  return (
    <form className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <label className="sr-only" htmlFor="news-search">
            Search articles
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            />
            <Input
              className="pl-10"
              defaultValue={search}
              id="news-search"
              name="search"
              placeholder="Search articles..."
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-[460px]">
          <Select
            defaultLabel={findLabel(categoryOptions, category, "All News")}
            defaultValue={category}
            name="category"
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.label} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            defaultLabel={findLabel(sourceOptions, source, "All Sources")}
            defaultValue={source}
            name="source"
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sourceOptions.map((option) => (
                <SelectItem key={option.label} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          className="h-11 rounded-xl bg-[#0f2a6d] px-5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          type="submit"
        >
          Apply
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        <Badge className="bg-slate-50 text-slate-700">Newsroom</Badge>
        <Badge>{articleCount} Articles</Badge>
        {category ? <Badge className="border-blue-100 bg-blue-50 text-blue-700">{category}</Badge> : null}
        {source ? <Badge className="border-blue-100 bg-blue-50 text-blue-700">{source}</Badge> : null}
      </div>
    </form>
  );
}

