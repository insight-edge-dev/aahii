"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  ImageOff,
  ImagePlus,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  AdminInfrastructureImage,
  createInfrastructureImage,
  deleteInfrastructureImage,
  getInfrastructureImages,
  InfrastructureCategory,
  updateInfrastructureImage,
} from "../api/infrastructure.api";

const CATEGORY_OPTIONS: Array<{
  value: InfrastructureCategory;
  label: string;
}> = [
  { value: "ON_SITE_DEVELOPMENT", label: "On-site Development" },
  { value: "CONCEPT_PLAN", label: "Concept Plan" },
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

type FormState = {
  category: InfrastructureCategory;
  caption: string;
  altText: string;
  sortOrder: string;
  isFeatured: boolean;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; errors?: { fieldErrors?: Record<string, string[]> } }
      | undefined;
    const fieldError = data?.errors?.fieldErrors
      ? Object.values(data.errors.fieldErrors).flat().find(Boolean)
      : null;
    return data?.message || fieldError || fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

function categoryLabel(category: InfrastructureCategory) {
  return CATEGORY_OPTIONS.find((item) => item.value === category)?.label ?? category;
}

export default function InfrastructureManager() {
  const [images, setImages] = useState<AdminInfrastructureImage[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<InfrastructureCategory>("ON_SITE_DEVELOPMENT");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [editing, setEditing] = useState<AdminInfrastructureImage | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const [form, setForm] = useState<FormState>({
    category: "ON_SITE_DEVELOPMENT",
    caption: "",
    altText: "",
    sortOrder: "0",
    isFeatured: false,
  });

  const visibleImages = useMemo(
    () =>
      images
        .filter((image) => image.category === activeCategory)
        .sort((first, second) => first.sortOrder - second.sortOrder),
    [activeCategory, images],
  );

  async function loadImages() {
    try {
      setLoading(true);
      setLoadError(false);
      const result = await getInfrastructureImages();
      setImages(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setLoadError(true);
      toast.error(getErrorMessage(error, "Failed to load infrastructure images"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadImages();
  }, []);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function nextSortOrder(category: InfrastructureCategory) {
    const orders = images
      .filter((image) => image.category === category)
      .map((image) => image.sortOrder);
    return orders.length ? Math.max(...orders) + 1 : 0;
  }

  function openCreateForm() {
    setEditing(null);
    setFile(null);
    setPreview(null);
    setForm({
      category: activeCategory,
      caption: "",
      altText: "",
      sortOrder: String(nextSortOrder(activeCategory)),
      isFeatured: visibleImages.length === 0,
    });
    setFormOpen(true);
  }

  function openEditForm(image: AdminInfrastructureImage) {
    setEditing(image);
    setFile(null);
    setPreview(image.imageUrl);
    setForm({
      category: image.category,
      caption: image.caption ?? "",
      altText: image.altText ?? "",
      sortOrder: String(image.sortOrder),
      isFeatured: image.isFeatured,
    });
    setFormOpen(true);
  }

  function closeForm() {
    if (saving) return;
    setFormOpen(false);
    setEditing(null);
    setFile(null);
    setPreview(null);
  }

  function selectFile(selectedFile?: File) {
    if (!selectedFile) return;

    if (!ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
      toast.error("Invalid image type. Allowed: JPG, PNG, WEBP");
      return;
    }

    if (selectedFile.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be under 10MB");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  async function saveImage() {
    if (!editing && !file) {
      toast.error("Please select an image");
      return;
    }

    const sortOrder = Number(form.sortOrder);
    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      toast.error("Sort order must be a non-negative whole number");
      return;
    }

    const toastId = toast.loading(
      editing ? "Updating infrastructure image..." : "Uploading image...",
    );

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append(
        "infrastructureData",
        JSON.stringify({
          category: form.category,
          caption: form.caption.trim(),
          altText: form.altText.trim(),
          sortOrder,
          isFeatured: form.isFeatured,
        }),
      );
      if (file) formData.append("image", file);

      const result = editing
        ? await updateInfrastructureImage(editing.id, formData)
        : await createInfrastructureImage(formData);

      if (!result.success) {
        throw new Error(result.message || "Failed to save image");
      }

      toast.success(editing ? "Infrastructure image updated" : "Image uploaded", {
        id: toastId,
      });
      setActiveCategory(form.category);
      setFormOpen(false);
      setEditing(null);
      setFile(null);
      setPreview(null);
      await loadImages();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to save image"), { id: toastId });
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    const toastId = toast.loading("Deleting infrastructure image...");

    try {
      setDeleting(true);
      const result = await deleteInfrastructureImage(deleteId);
      if (!result.success) throw new Error(result.message || "Delete failed");
      setImages((current) => current.filter((image) => image.id !== deleteId));
      setDeleteId(null);
      toast.success("Infrastructure image deleted", { id: toastId });
    } catch (error) {
      toast.error(getErrorMessage(error, "Delete failed"), { id: toastId });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {CATEGORY_OPTIONS.map((category) => (
            <button
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category.value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          onClick={openCreateForm}
          type="button"
        >
          <Plus size={17} /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-sm text-slate-500">
          Loading infrastructure images...
        </div>
      ) : loadError ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 py-16 text-center">
          <p className="text-sm text-red-700">Infrastructure images could not be loaded.</p>
          <button
            className="mt-3 text-sm font-semibold text-blue-700 hover:underline"
            onClick={() => void loadImages()}
            type="button"
          >
            Try again
          </button>
        </div>
      ) : visibleImages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
          <ImagePlus className="mx-auto text-slate-400" size={30} />
          <p className="mt-3 font-medium text-slate-800">No images in this category</p>
          <p className="mt-1 text-sm text-slate-500">Upload the first gallery image to get started.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleImages.map((image) => (
            <article
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              key={image.id}
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                {brokenImages.has(image.id) ? (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    <ImageOff size={32} />
                  </div>
                ) : (
                  <Image
                    alt={image.altText || image.caption || categoryLabel(image.category)}
                    className="object-cover"
                    fill
                    onError={() =>
                      setBrokenImages((current) => new Set(current).add(image.id))
                    }
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src={image.imageUrl}
                  />
                )}
                {image.isFeatured ? (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-amber-950 shadow-sm">
                    <Star fill="currentColor" size={13} /> Featured
                  </span>
                ) : null}
                <span className="absolute right-3 top-3 rounded-full bg-slate-950/75 px-2.5 py-1 text-xs font-semibold text-white">
                  Order {image.sortOrder}
                </span>
              </div>

              <div className="p-4">
                <p className="line-clamp-2 min-h-10 text-sm font-medium text-slate-800">
                  {image.caption || image.altText || "No caption"}
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    aria-label="Edit image"
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => openEditForm(image)}
                    type="button"
                  >
                    <Pencil size={17} />
                  </button>
                  <button
                    aria-label="Delete image"
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    onClick={() => setDeleteId(image.id)}
                    type="button"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {formOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  {editing ? "Edit Infrastructure Image" : "Add Infrastructure Image"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update the gallery image, category, and display order.
                </p>
              </div>
              <button
                aria-label="Close form"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                onClick={closeForm}
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-medium text-slate-600">Image</span>
                <span className="relative flex min-h-56 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50">
                  {preview ? (
                    <Image
                      alt="Infrastructure preview"
                      className="object-contain"
                      fill
                      sizes="640px"
                      src={preview}
                      unoptimized={preview.startsWith("blob:")}
                    />
                  ) : (
                    <span className="flex flex-col items-center text-sm text-slate-500">
                      <ImagePlus size={30} />
                      <span className="mt-2">Choose JPG, PNG, or WEBP under 10MB</span>
                    </span>
                  )}
                  <input
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(event) => selectFile(event.target.files?.[0])}
                    type="file"
                  />
                </span>
              </label>

              <label className="space-y-1">
                <span className="text-xs font-medium text-slate-600">Category</span>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20"
                  onChange={(event) =>
                    setForm({
                      ...form,
                      category: event.target.value as InfrastructureCategory,
                    })
                  }
                  value={form.category}
                >
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-xs font-medium text-slate-600">Sort order</span>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20"
                  min="0"
                  onChange={(event) => setForm({ ...form, sortOrder: event.target.value })}
                  type="number"
                  value={form.sortOrder}
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-medium text-slate-600">Caption</span>
                <textarea
                  className="min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20"
                  maxLength={500}
                  onChange={(event) => setForm({ ...form, caption: event.target.value })}
                  value={form.caption}
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-medium text-slate-600">Alt text</span>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20"
                  maxLength={300}
                  onChange={(event) => setForm({ ...form, altText: event.target.value })}
                  value={form.altText}
                />
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 md:col-span-2">
                <input
                  checked={form.isFeatured}
                  onChange={(event) =>
                    setForm({ ...form, isFeatured: event.target.checked })
                  }
                  type="checkbox"
                />
                Use as the featured image for this category
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                disabled={saving}
                onClick={closeForm}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                disabled={saving}
                onClick={() => void saveImage()}
                type="button"
              >
                {saving ? "Saving..." : editing ? "Save Changes" : "Upload Image"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-950">Delete image?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This removes the image from the public gallery and deletes its Cloudinary asset when applicable.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                disabled={deleting}
                onClick={() => setDeleteId(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                disabled={deleting}
                onClick={() => void confirmDelete()}
                type="button"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
