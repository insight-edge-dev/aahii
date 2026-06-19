import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Calendar, Clock, UserRound } from "lucide-react";

import NewsContentRenderer from "@/components/news/NewsContentRenderer";
import NewsShareButtons from "@/components/news/NewsShareButtons";
import { pressData } from "@/content/press";
import {
  getLatestNews,
  getNewsBySlug,
  getRelatedNews,
} from "@/lib/features/news/services/news.service";

export const dynamic = "force-dynamic";

const fallbackImage = "/press/news1.jpg";

type NewsDetailProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

function readingTime(content?: string | null) {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(Math.ceil(words / 220), 1)} min read`;
}

function fallbackSlug(title: string, id: number) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `press-${id}`;
}

function getFallbackArticle(slug: string) {
  const item = pressData.find((entry) => fallbackSlug(entry.title, entry.id) === slug);
  if (!item) return null;

  return {
    id: String(item.id),
    slug,
    title: item.title,
    excerpt: item.excerpt,
    content: `${item.excerpt}\n\n[Read the original coverage](${item.link})`,
    source: item.source,
    category: item.source,
    link: item.link,
    coverImage: item.image,
    featuredImageUrl: item.image,
    publishedAt: new Date(item.publishedAt),
    featured: item.featured ?? false,
    status: "PUBLISHED",
    type: "PRESS",
    isActive: true,
    metaTitle: null,
    metaDescription: null,
    facebookCaption: null,
    linkedinCaption: null,
    twitterCaption: null,
    socialCaption: null,
    socialHashtags: null,
  };
}

function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://agihf.org";
  if (/^https?:\/\//i.test(path)) return path;
  return `${base.replace(/\/$/, "")}${path}`;
}

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getNewsBySlug(slug);
  const fallback = !result.success ? getFallbackArticle(slug) : null;

  if ((!result.success || !result.data) && !fallback) {
    return {
      title: "News not found | AAHII",
    };
  }

  const article = result.success && result.data ? result.data : fallback!;
  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const image = absoluteUrl(article.featuredImageUrl || article.coverImage || fallbackImage);
  const canonical = `/news/${article.slug}`;

  return {
    title: `${title} | AAHII Newsroom`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonical),
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = await params;
  const result = await getNewsBySlug(slug);

  const fallback = !result.success ? getFallbackArticle(slug) : null;

  if ((!result.success || !result.data) && !fallback) {
    notFound();
  }

  const article = result.success && result.data ? result.data : fallback!;
  const [latestResult, relatedResult] = await Promise.allSettled([
    getLatestNews(5),
    getRelatedNews({
      slug: article.slug,
      category: article.category,
      limit: 3,
    }),
  ]);
  const latest = latestResult.status === "fulfilled" ? latestResult.value : [];
  const relatedByCategory = relatedResult.status === "fulfilled" ? relatedResult.value : [];
  const latestItems = latest.filter((item) => item.slug !== article.slug).slice(0, 4);
  const related = relatedByCategory.length
    ? relatedByCategory
    : latestItems.slice(0, 3);
  const heroImage = article.featuredImageUrl || article.coverImage || fallbackImage;

  return (
    <main className="bg-white pb-20 lg:pb-0">
      <NewsShareButtons description={article.excerpt} title={article.title} />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Link className="text-sm font-semibold text-blue-700 hover:text-blue-900" href="/news">
            Newsroom
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                <span>{article.category || article.source}</span>
                <span className="text-slate-300">/</span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0f2a6d] md:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {article.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <UserRound size={16} /> AAHII Newsroom
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar size={16} /> {formatDate(article.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={16} /> {readingTime(article.content)}
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-100 shadow-sm">
              <Image alt={article.title} className="object-cover" fill priority src={heroImage} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <article>
          <NewsContentRenderer content={article.content || article.excerpt} />
        </article>

        <aside className="space-y-8">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Latest News</h2>
            <div className="mt-4 space-y-4">
              {latestItems.map((item) => (
                <Link
                  className="block border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                  href={`/news/${item.slug}`}
                  key={item.id}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                    {item.category || item.source}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 hover:text-blue-700">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-950">Social Preview</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {article.socialCaption || article.linkedinCaption || article.excerpt}
            </p>
            {article.socialHashtags ? (
              <p className="mt-3 text-sm font-semibold text-blue-700">
                {article.socialHashtags}
              </p>
            ) : null}
          </div>
        </aside>
      </section>

      {related.length ? (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-slate-950">Related Articles</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  href={`/news/${item.slug}`}
                  key={item.id}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                    {item.category || item.source}
                  </p>
                  <h3 className="mt-3 line-clamp-2 font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                    Read article <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
