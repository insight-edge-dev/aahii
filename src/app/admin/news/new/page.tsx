import NewsForm from "@/lib/features/admin/news/components/NewsForm";

export default function CreateNewsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Newsroom CMS
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-950">
          Create News Article
        </h1>
      </div>
      <NewsForm />
    </div>
  );
}
