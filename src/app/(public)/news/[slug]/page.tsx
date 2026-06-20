import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock } from "lucide-react";

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

function SidebarNewsList({
  items,
  title,
}: {
  items: Array<{
    id: string;
    slug: string;
    title: string;
    category?: string | null;
    source?: string | null;
  }>;
  title: string;
}) {
  if (!items.length) return null;

  return (
    <section className="border-t border-slate-200 pt-6">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        {title}
      </h2>
      <div className="mt-4 space-y-5">
        {items.map((item) => (
          <Link className="group block" href={`/news/${item.slug}`} key={item.id}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
              {item.category || item.source || "News"}
            </p>
            <h3 className="mt-1 text-sm font-semibold leading-6 text-slate-950 group-hover:text-blue-700">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
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
  const categoryLabel = article.category || article.source || "News";

  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Link className="text-sm font-semibold text-blue-700 hover:text-blue-900" href="/news">
            Newsroom
          </Link>
          <div className="mt-8 max-w-[800px]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              {categoryLabel}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#0f2a6d] sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 text-xl leading-9 text-slate-600">
              {article.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
              <span>Published {formatDate(article.publishedAt)}</span>
              <span className="text-slate-300">/</span>
              <span>{categoryLabel}</span>
              <span className="text-slate-300">/</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} /> {readingTime(article.content)}
              </span>
            </div>
            <div className="mt-7">
              <NewsShareButtons description={article.excerpt} title={article.title} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,800px)_280px] lg:px-8 lg:py-14">
        <article className="min-w-0">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-slate-100">
            <Image
              alt={article.title}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 800px, 100vw"
              src={heroImage}
            />
          </div>
          <div className="mt-10">
            <NewsContentRenderer content={article.content || article.excerpt} />
          </div>
        </article>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <SidebarNewsList items={latestItems} title="Latest News" />
          <SidebarNewsList items={related} title="Related News" />
        </aside>
      </section>
    </main>
  );
}
