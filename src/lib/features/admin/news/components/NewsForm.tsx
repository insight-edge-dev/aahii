"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Archive, Eye, ImagePlus, Save, Send } from "lucide-react";

import { createNews, updateNews } from "../api/news.api";

type NewsStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type AdminNewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string | null;
  source?: string | null;
  category?: string | null;
  link?: string | null;
  coverImage?: string | null;
  featuredImageUrl?: string | null;
  publishedAt: string | Date;
  featured: boolean;
  status: NewsStatus;
  metaTitle?: string | null;
  metaDescription?: string | null;
  facebookCaption?: string | null;
  linkedinCaption?: string | null;
  twitterCaption?: string | null;
  socialCaption?: string | null;
  socialHashtags?: string | null;
};

type NewsFormProps = {
  editData?: AdminNewsItem | null;
};

function toDateInput(value?: string | Date | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const editorSnippets = [
  { label: "H2", value: "\n\n## Section heading\n\n" },
  { label: "H3", value: "\n\n### Subheading\n\n" },
  { label: "Quote", value: "\n\n> Important quote or institutional statement.\n\n" },
  { label: "List", value: "\n\n- First point\n- Second point\n- Third point\n\n" },
  { label: "Image", value: "\n\n![Image caption](https://example.com/image.jpg)\n\n" },
  { label: "Link", value: "[Link text](https://example.com)" },
];

export default function NewsForm({ editData }: NewsFormProps) {
  const router = useRouter();
  const isEdit = !!editData;
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    editData?.featuredImageUrl || editData?.coverImage || null,
  );
  const [form, setForm] = useState({
    title: editData?.title ?? "",
    slug: editData?.slug ?? "",
    category: editData?.category ?? editData?.source ?? "",
    source: editData?.source ?? "AAHII",
    status: editData?.status ?? "DRAFT" as NewsStatus,
    featured: editData?.featured ?? false,
    excerpt: editData?.excerpt ?? "",
    content: editData?.content ?? "",
    link: editData?.link ?? "",
    publishedAt: toDateInput(editData?.publishedAt) || new Date().toISOString().slice(0, 10),
    metaTitle: editData?.metaTitle ?? "",
    metaDescription: editData?.metaDescription ?? "",
    facebookCaption: editData?.facebookCaption ?? "",
    linkedinCaption: editData?.linkedinCaption ?? "",
    twitterCaption: editData?.twitterCaption ?? "",
    socialCaption: editData?.socialCaption ?? "",
    socialHashtags: editData?.socialHashtags ?? "",
  });

  const suggestedSlug = useMemo(() => slugify(form.title), [form.title]);

  function appendSnippet(value: string) {
    setForm((current) => ({
      ...current,
      content: `${current.content}${value}`,
    }));
  }

  function validate() {
    if (form.title.trim().length < 5) return "Title must be at least 5 characters";
    if (!form.category.trim()) return "Category is required";
    if (form.excerpt.trim().length < 10) return "Excerpt must be at least 10 characters";
    if (form.content.trim().length < 20) return "Full article content is required";
    if (!form.publishedAt) return "Publish date is required";
    return null;
  }

  async function handleSubmit(statusOverride?: NewsStatus) {
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    const nextStatus = statusOverride ?? form.status;
    const toastId = toast.loading(isEdit ? "Updating news..." : "Creating news...");

    try {
      setLoading(true);
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || suggestedSlug,
        category: form.category.trim(),
        source: form.source.trim() || "AAHII",
        status: nextStatus,
        featured: form.featured,
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        link: form.link.trim(),
        publishedAt: form.publishedAt,
        type: "INTERNAL",
        isActive: nextStatus === "PUBLISHED",
        metaTitle: form.metaTitle.trim(),
        metaDescription: form.metaDescription.trim(),
        facebookCaption: form.facebookCaption.trim(),
        linkedinCaption: form.linkedinCaption.trim(),
        twitterCaption: form.twitterCaption.trim(),
        socialCaption: form.socialCaption.trim(),
        socialHashtags: form.socialHashtags.trim(),
      };

      const fd = new FormData();
      fd.append("newsData", JSON.stringify(payload));
      if (image) fd.append("featuredImage", image);

      const result =
        isEdit && editData
          ? await updateNews(editData.id, fd)
          : await createNews(fd);

      if (!result.success) {
        throw new Error(result.message || "Failed to save news");
      }

      toast.success(nextStatus === "PUBLISHED" ? "News published" : "News saved", {
        id: toastId,
      });
      router.push("/admin/news");
      router.refresh();
    } catch (caughtError) {
      toast.error(caughtError instanceof Error ? caughtError.message : "Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Basic Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="space-y-1 md:col-span-2">
              <span className="text-xs font-medium text-slate-500">Title</span>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
              />
            </label>
            <label className="space-y-1">
              <span className="text-xs font-medium text-slate-500">Slug</span>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder={suggestedSlug || "auto-generated"}
                value={form.slug}
                onChange={(event) => setForm({ ...form, slug: event.target.value })}
              />
            </label>
            <label className="space-y-1">
              <span className="text-xs font-medium text-slate-500">Category</span>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Research, Institute Update, Media"
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
              />
            </label>
            <label className="space-y-1">
              <span className="text-xs font-medium text-slate-500">Status</span>
              <select
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
                value={form.status}
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value as NewsStatus })
                }
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
              <input
                checked={form.featured}
                type="checkbox"
                onChange={(event) => setForm({ ...form, featured: event.target.checked })}
              />
              Featured story
            </label>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Content</h2>
          <label className="mt-5 block space-y-1">
            <span className="text-xs font-medium text-slate-500">Excerpt</span>
            <textarea
              className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
              value={form.excerpt}
              onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
            />
          </label>

          <div className="mt-4 rounded-xl border border-slate-200">
            <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-2">
              {editorSnippets.map((item) => (
                <button
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700"
                  key={item.label}
                  onClick={() => appendSnippet(item.value)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <textarea
              className="min-h-[360px] w-full resize-y rounded-b-xl px-4 py-3 font-mono text-sm leading-6 outline-none"
              placeholder="Write the full article. Use toolbar snippets for headings, quotes, lists, links, and images."
              value={form.content}
              onChange={(event) => setForm({ ...form, content: event.target.value })}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">SEO</h2>
          <div className="mt-5 grid gap-4">
            <input
              className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Meta title"
              value={form.metaTitle}
              onChange={(event) => setForm({ ...form, metaTitle: event.target.value })}
            />
            <textarea
              className="min-h-24 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Meta description"
              value={form.metaDescription}
              onChange={(event) => setForm({ ...form, metaDescription: event.target.value })}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Social Distribution</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <textarea className="min-h-24 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Facebook caption" value={form.facebookCaption} onChange={(event) => setForm({ ...form, facebookCaption: event.target.value })} />
            <textarea className="min-h-24 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="LinkedIn caption" value={form.linkedinCaption} onChange={(event) => setForm({ ...form, linkedinCaption: event.target.value })} />
            <textarea className="min-h-24 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Twitter/X caption" value={form.twitterCaption} onChange={(event) => setForm({ ...form, twitterCaption: event.target.value })} />
            <textarea className="min-h-24 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="General social caption" value={form.socialCaption} onChange={(event) => setForm({ ...form, socialCaption: event.target.value })} />
            <input className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 md:col-span-2" placeholder="#AAHII #HealthcareInnovation" value={form.socialHashtags} onChange={(event) => setForm({ ...form, socialHashtags: event.target.value })} />
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Media</h2>
          <label className="mt-5 block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-4 text-center hover:border-blue-400">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="Featured image preview" className="mx-auto aspect-video w-full rounded-xl object-cover" src={preview} />
            ) : (
              <div className="flex min-h-40 flex-col items-center justify-center text-slate-500">
                <ImagePlus size={32} />
                <p className="mt-3 text-sm font-medium">Upload featured image</p>
                <p className="mt-1 text-xs">JPG, PNG, WEBP under 2MB</p>
              </div>
            )}
            <input
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                  toast.error("Image must be under 2MB");
                  return;
                }
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Publishing</h2>
          <label className="mt-5 block space-y-1">
            <span className="text-xs font-medium text-slate-500">Publish Date</span>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20"
              type="date"
              value={form.publishedAt}
              onChange={(event) => setForm({ ...form, publishedAt: event.target.value })}
            />
          </label>

          <div className="mt-5 grid gap-2">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50" disabled={loading} onClick={() => handleSubmit("DRAFT")} type="button">
              <Save size={16} /> Save Draft
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50" disabled={loading} onClick={() => handleSubmit("PUBLISHED")} type="button">
              <Send size={16} /> Publish
            </button>
            {isEdit ? (
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50" disabled={loading} onClick={() => handleSubmit("ARCHIVED")} type="button">
                <Archive size={16} /> Archive
              </button>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Eye size={16} /> Preview Card
          </div>
          <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-slate-950">
            {form.title || "News title preview"}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
            {form.excerpt || "Article excerpt will appear here."}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-blue-700">
            {form.category || "Category"}
          </p>
        </section>
      </aside>
    </div>
  );
}
