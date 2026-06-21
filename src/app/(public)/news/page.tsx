import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import NewsroomFilters from "@/components/news/NewsroomFilters";
import { getPublicNews } from "@/lib/features/news/services/news.service";

export const dynamic = "force-dynamic";

const fallbackImage = "/press/news1.jpg";

type NewsPageProps = {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    category?: string;
    source?: string;
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

function pageHref(
  page: number,
  search?: string,
  category?: string | null,
  source?: string | null,
) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (source) params.set("source", source);
  const query = params.toString();
  return query ? `/news?${query}` : "/news";
}

export default async function NewsroomPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search?.trim() || "";
  const category = params?.category?.trim() || "";
  const source = params?.source?.trim() || "";

  const newsResult = await getPublicNews({
    page,
    limit: 9,
    search,
    category,
    source,
  }).catch(() => null);

  const result = newsResult;
  const data = result?.success && result.data ? result.data : null;
  const articles = data?.news ?? [];
  const pagination = data?.pagination ?? { page: 1, pages: 1, total: 0 };

  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            AAHII Newsroom
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-[#0f2a6d] md:text-5xl">
            Institutional news, research updates, and public announcements.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Follow official updates from Assam Advanced Healthcare Innovation
            Institute and the AGIHF ecosystem advancing healthcare innovation in
            Northeast India.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <NewsroomFilters
          articleCount={pagination.total}
          category={category}
          search={search}
          source={source}
        />

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
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
                href={`/news/${article.slug}`}
                key={article.id}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    alt={article.title}
                    className="object-cover transition duration-700 group-hover:scale-110"
                    fill
                    src={article.featuredImageUrl || article.coverImage || fallbackImage}
                  />
                </div>
                <div className="relative p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                    <span className="rounded-full bg-blue-50 px-3 py-1 transition-colors group-hover:bg-white/80">
                      {article.category || article.source}
                    </span>
                    <span className="text-slate-300">/</span>
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-500 transition-colors group-hover:bg-white/80">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-slate-950 transition-colors duration-300 group-hover:text-blue-700">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {article.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-all duration-300 group-hover:gap-3">
                    Read More <ArrowRight size={16} />
                  </span>
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
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
                href={pageHref(item, search, category, source)}
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
