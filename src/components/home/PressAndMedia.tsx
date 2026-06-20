"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { pressData } from "@/content/press";

type ApiNews = {
  id: string;
  slug: string;
  source: string;
  category?: string | null;
  title: string;
  excerpt: string;
  link: string | null;
  coverImage: string | null;
  featuredImageUrl?: string | null;
  publishedAt: string;
};

type HomeNewsArticle = {
  id: string;
  slug: string;
  source: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  publishedAtValue: number;
};

function fallbackSlug(title: string, id: number) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `press-${id}`;
}

function getDateValue(value: string | Date) {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function mapNews(item: ApiNews): HomeNewsArticle {
  return {
    id: item.id,
    slug: item.slug,
    source: item.category || item.source,
    title: item.title,
    excerpt: item.excerpt,
    image: item.featuredImageUrl ?? item.coverImage ?? "/press/news1.jpg",
    publishedAt: formatDate(item.publishedAt),
    publishedAtValue: getDateValue(item.publishedAt),
  };
}

function mapFallbackNews(): HomeNewsArticle[] {
  return pressData.map((item) => ({
    id: `press-${item.id}`,
    slug: fallbackSlug(item.title, item.id),
    source: item.source,
    title: item.title,
    excerpt: item.excerpt,
    image: item.image,
    publishedAt: formatDate(item.publishedAt),
    publishedAtValue: getDateValue(item.publishedAt),
  }));
}

function pickLatestThree(items: HomeNewsArticle[]) {
  const fallbackItems = mapFallbackNews();
  const merged = [...items, ...fallbackItems].filter(
    (item, index, list) =>
      list.findIndex((entry) => entry.slug === item.slug) === index,
  );

  return merged
    .sort((a, b) => b.publishedAtValue - a.publishedAtValue)
    .slice(0, 3);
}

function NewsroomCard({ article }: { article: HomeNewsArticle }) {
  return (
    <Link
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-[0_22px_48px_rgba(15,23,42,0.12)]"
      href={`/news/${article.slug}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          alt={article.title}
          className="object-cover transition duration-700 group-hover:scale-110"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={article.image}
        />
      </div>

      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em]">
          <span className="max-w-[62%] truncate rounded-full bg-blue-50 px-3 py-1 text-blue-700 transition-colors group-hover:bg-white/80">
            {article.source}
          </span>
          <span className="shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-slate-600 transition-colors group-hover:bg-white/80">
            {article.publishedAt}
          </span>
        </div>

        <h3 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug text-slate-950 transition-colors duration-300 group-hover:text-blue-700">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-all duration-300 group-hover:gap-3">
            Read More <ArrowRight size={16} />
          </span>
        </div>

        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
      </div>
    </Link>
  );
}

function NewsroomSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          className="h-[420px] animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
          key={index}
        />
      ))}
    </div>
  );
}

const initialNews = pickLatestThree([]);

export default function PressAndMedia() {
  const [latestNews, setLatestNews] = useState<HomeNewsArticle[]>(initialNews);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news?limit=50");
        const json = await res.json();
        const items = (json?.data?.news ?? []).map(mapNews);
        setLatestNews(pickLatestThree(items));
      } catch {
        setLatestNews(initialNews);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            News
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0f2a6d] md:text-5xl">
            AAHII Newsroom
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Official announcements and media coverage of the Assam Advanced
            Healthcare Innovation Institute (AAHII), advancing healthcare
            innovation, research, partnerships and public health initiatives.
          </p>
        </div>

        {latestNews.length === 3 ? (
          <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((article) => (
              <NewsroomCard article={article} key={article.id} />
            ))}
          </div>
        ) : (
          <NewsroomSkeleton />
        )}

        <div className="mt-10 flex justify-center">
          <Link
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-[#0f2a6d] shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
            href="/news"
          >
            View All News <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
