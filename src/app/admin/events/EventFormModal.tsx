"use client";

import { useState } from "react";
import { X, ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { createEvent } from "./api";
import toast from "react-hot-toast";

export default function EventFormModal({ onClose, refresh }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [coverImage, setCoverImage] = useState<any>(null);
  const [coverPreview, setCoverPreview] = useState("");

  const [images, setImages] = useState<any[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const MAX_IMAGES = 10;

  /* ================= COVER ================= */
  const handleCover = (file: any) => {
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  /* ================= MULTI IMAGES ================= */
  const handleImages = (files: any) => {
    const fileArray = Array.from(files);

    if (images.length + fileArray.length > MAX_IMAGES) {
      toast.error(`Max ${MAX_IMAGES} images allowed`);
      return;
    }

    const newPreviews = fileArray.map((file: any) =>
      URL.createObjectURL(file)
    );

    setImages((prev) => [...prev, ...fileArray]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  /* ================= REMOVE ================= */
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
    toast.success("Image removed");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!title || !description || !eventDate) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "eventData",
        JSON.stringify({
          title,
          description,
          eventDate,
        })
      );

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      images.forEach((img) => {
        formData.append("images", img);
      });

      await createEvent(formData);

      toast.success("Event created successfully");

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-5 shadow-xl animate-in fade-in zoom-in-95">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Create Event
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* INPUTS */}
        <input
          placeholder="Event Title"
          className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Event Description"
          className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setEventDate(e.target.value)}
        />

        {/* COVER */}
        <div>
          <p className="text-sm mb-2 text-gray-600">Cover Image</p>

          {coverPreview ? (
            <div className="relative w-full h-40 rounded-xl overflow-hidden">
              <Image src={coverPreview} alt="cover" fill className="object-cover" />

              <button
                onClick={() => {
                  setCoverImage(null);
                  setCoverPreview("");
                  toast("Cover removed");
                }}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
              >
                <Trash size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50">
              <ImagePlus className="mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">
                Upload Cover Image
              </span>
              <input type="file" hidden onChange={(e) => handleCover(e.target.files?.[0])} />
            </label>
          )}
        </div>

        {/* GALLERY */}
        <div>
          <p className="text-sm mb-2 text-gray-600">
            Gallery Images ({images.length}/{MAX_IMAGES})
          </p>

          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-gray-50 mb-3">
            <ImagePlus className="mb-1 text-gray-400" />
            <span className="text-xs text-gray-500">
              Upload up to 10 images
            </span>
            <input type="file" multiple hidden onChange={(e) => handleImages(e.target.files)} />
          </label>

          <div className="grid grid-cols-3 gap-2">
            {previews.map((src, i) => (
              <div key={i} className="relative w-full h-20 rounded-lg overflow-hidden">
                <Image src={src} alt="preview" fill className="object-cover" />

                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                >
                  <Trash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>

      </div>
    </div>
  );
}