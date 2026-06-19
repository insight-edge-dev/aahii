import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getFeaturedNews, getLatestNews } from "@/lib/features/news/services/news.service";

const fallbackImage = "/press/news1.jpg";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

export default async function FeaturedNewsSection() {
  const featured = await getFeaturedNews().catch(() => null);
  const latest = featured ? [] : await getLatestNews(1).catch(() => []);
  const article = featured ?? latest[0];

  if (!article) return null;

  return (
    <section className="bg-slate-50 px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-72 bg-slate-100">
          <Image
            alt={article.title}
            className="object-cover"
            fill
            src={article.featuredImageUrl || article.coverImage || fallbackImage}
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Featured News
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#0f2a6d]">
            {article.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {article.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-slate-500">
            <span>{article.category || article.source}</span>
            <span>/</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <Link
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-[#0f2a6d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
            href={`/news/${article.slug}`}
          >
            Read Featured Story <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
