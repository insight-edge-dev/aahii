import { notFound } from "next/navigation";

import NewsForm from "@/lib/features/admin/news/components/NewsForm";
import { getNewsById } from "@/lib/features/news/services/news.service";

type PageProps = {
  params: Promise<{
    newsId: string;
  }>;
};

export default async function EditNewsPage({ params }: PageProps) {
  const { newsId } = await params;
  const result = await getNewsById(newsId);

  if (!result.success || !result.data) {
    notFound();
  }

  const news = result.data;

  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Newsroom CMS
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-950">
          Edit News Article
        </h1>
      </div>
      <NewsForm
        editData={{
          ...news,
          publishedAt: news.publishedAt.toISOString(),
        }}
      />
    </div>
  );
}
