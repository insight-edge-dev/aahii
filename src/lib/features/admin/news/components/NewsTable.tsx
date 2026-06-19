"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ExternalLink, Pencil, Search, Trash2 } from "lucide-react";

import { deleteNews, getNews } from "../api/news.api";
import type { AdminNewsItem } from "./NewsForm";

type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

const fallbackImage = "/press/news1.jpg";

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function NewsTable() {
  const [news, setNews] = useState<AdminNewsItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [category, setCategory] = useState("ALL");

  async function fetchNews(nextPage = pagination.page) {
    try {
      setLoading(true);
      const result = await getNews({
        page: nextPage,
        limit: pagination.limit,
        search,
        status,
        category,
      });

      setNews(result.data?.news ?? []);
      setCategories((result.data?.categories ?? []).filter(Boolean));
      setPagination(result.data?.pagination ?? pagination);
    } catch {
      toast.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, category]);

  async function removeNews(id: string) {
    if (!window.confirm("Delete this news article?")) return;

    const toastId = toast.loading("Deleting news...");
    try {
      const result = await deleteNews(id);
      if (!result.success) throw new Error(result.message || "Delete failed");
      toast.success("News deleted", { id: toastId });
      fetchNews();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed", {
        id: toastId,
      });
    }
  }

  return (
    <div className="space-y-5">
      <form
        className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_180px_180px_110px]"
        onSubmit={(event) => {
          event.preventDefault();
          fetchNews(1);
        }}
      >
        <label className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Search news"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <select
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="ALL">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <select
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="ALL">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          type="submit"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Loading news...
        </div>
      ) : news.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
          No news articles found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[96px_1fr_150px_120px_120px_120px] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
            <span>Thumbnail</span>
            <span>Title</span>
            <span>Category</span>
            <span>Status</span>
            <span>Publish Date</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-slate-100">
            {news.map((item) => (
              <div
                className="grid gap-4 p-4 lg:grid-cols-[96px_1fr_150px_120px_120px_120px] lg:items-center"
                key={item.id}
              >
                <div className="relative h-16 w-24 overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    alt={item.title}
                    className="object-cover"
                    fill
                    src={item.featuredImageUrl || item.coverImage || fallbackImage}
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-slate-950">{item.title}</p>
                    {item.featured ? (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                        FEATURED
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.excerpt}</p>
                </div>
                <div className="text-sm text-slate-600">{item.category || "Uncategorized"}</div>
                <div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      item.status === "PUBLISHED"
                        ? "bg-emerald-50 text-emerald-700"
                        : item.status === "ARCHIVED"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-sm text-slate-500">{formatDate(item.publishedAt)}</div>
                <div className="flex justify-end gap-2">
                  {item.status === "PUBLISHED" ? (
                    <Link
                      aria-label={`View ${item.title}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                      href={`/news/${item.slug}`}
                      target="_blank"
                    >
                      <ExternalLink size={18} />
                    </Link>
                  ) : (
                    <button
                      aria-label={`${item.title} is not published`}
                      className="cursor-not-allowed rounded-lg p-2 text-slate-300"
                      disabled
                      type="button"
                    >
                      <ExternalLink size={18} />
                    </button>
                  )}
                  <Link
                    aria-label={`Edit ${item.title}`}
                    className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                    href={`/admin/news/${item.id}`}
                  >
                    <Pencil size={18} />
                  </Link>
                  <button
                    aria-label={`Delete ${item.title}`}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeNews(item.id)}
                    type="button"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {pagination.pages > 1 ? (
        <div className="flex justify-end gap-2">
          {Array.from({ length: pagination.pages }, (_, index) => index + 1).map((item) => (
            <button
              className={`size-9 rounded-lg border text-sm font-semibold ${
                item === pagination.page
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 text-slate-600 hover:border-blue-200"
              }`}
              key={item}
              onClick={() => fetchNews(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
