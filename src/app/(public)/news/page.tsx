import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { Metadata } from "next";

import { getFeaturedNews, getPublicNews } from "@/lib/features/news/services/news.service";

export const dynamic = "force-dynamic";

const fallbackImage = "/press/news1.jpg";

type NewsPageProps = {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Newsroom | AAHII",
  description:
    "Official news, institutional updates, and media coverage from Assam Advanced Healthcare Innovation Institute.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "AAHII Newsroom",
    description:
      "Official news, institutional updates, and media coverage from AAHII.",
    type: "website",
  },
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function pageHref(page: number, search?: string, category?: string | null) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  const query = params.toString();
  return query ? `/news?${query}` : "/news";
}

export default async function NewsroomPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search?.trim() || "";
  const category = params?.category?.trim() || "";

  const [featuredResult, newsResult] = await Promise.allSettled([
    getFeaturedNews(),
    getPublicNews({
      page,
      limit: 9,
      search,
      category,
    }),
  ]);

  const featured = featuredResult.status === "fulfilled" ? featuredResult.value : null;
  const result = newsResult.status === "fulfilled" ? newsResult.value : null;
  const data = result?.success && result.data ? result.data : null;
  const articles = data?.news ?? [];
  const categories = data?.categories ?? [];
  const pagination = data?.pagination ?? { page: 1, pages: 1, total: 0 };
  const heroArticle = featured ?? articles[0] ?? null;

  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              AAHII Newsroom
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0f2a6d] md:text-5xl">
              Institutional news, research updates, and public announcements.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Follow official updates from Assam Advanced Healthcare Innovation
              Institute and the AGIHF ecosystem advancing healthcare innovation
              in Northeast India.
            </p>
          </div>

          {heroArticle ? (
            <Link
              className="group grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              href={`/news/${heroArticle.slug}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                  alt={heroArticle.title}
                  className="object-cover transition duration-700 group-hover:scale-105"
                  fill
                  priority
                  src={heroArticle.featuredImageUrl || heroArticle.coverImage || fallbackImage}
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                  <span>{heroArticle.category || heroArticle.source}</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-500">{formatDate(heroArticle.publishedAt)}</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950">
                  {heroArticle.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {heroArticle.excerpt}
                </p>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_120px]">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-md border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              defaultValue={search}
              name="search"
              placeholder="Search news"
            />
          </label>

          <select
            className="rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            defaultValue={category}
            name="category"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item || ""}>
                {item}
              </option>
            ))}
          </select>

          <button
            className="rounded-md bg-[#0f2a6d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
            type="submit"
          >
            Filter
          </button>
        </form>

        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Latest Updates</h2>
            <p className="mt-1 text-sm text-slate-500">
              {pagination.total} published article{pagination.total === 1 ? "" : "s"}
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">Sorted by latest</p>
        </div>

        {articles.length ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                href={`/news/${article.slug}`}
                key={article.id}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    alt={article.title}
                    className="object-cover transition duration-700 group-hover:scale-105"
                    fill
                    src={article.featuredImageUrl || article.coverImage || fallbackImage}
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                    <span>{article.category || article.source}</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-500">{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-slate-950">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {article.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                    Read More <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 p-12 text-center text-slate-500">
            No news articles match the selected filters.
          </div>
        )}

        {pagination.pages > 1 ? (
          <nav className="mt-10 flex justify-center gap-2" aria-label="News pagination">
            {Array.from({ length: pagination.pages }, (_, index) => index + 1).map((item) => (
              <Link
                className={`inline-flex size-10 items-center justify-center rounded-md border text-sm font-semibold ${
                  item === pagination.page
                    ? "border-[#0f2a6d] bg-[#0f2a6d] text-white"
                    : "border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-700"
                }`}
                href={pageHref(item, search, category)}
                key={item}
              >
                {item}
              </Link>
            ))}
          </nav>
        ) : null}
      </section>
    </main>
  );
}
