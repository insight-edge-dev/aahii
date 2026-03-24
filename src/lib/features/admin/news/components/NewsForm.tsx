'use client'

import { useEffect, useState } from 'react'
import { createNews, updateNews } from '../api/news.api'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'

export const NewsForm = ({ onClose, editData, onSuccess }: any) => {
  const isEdit = !!editData

  const [type, setType] = useState<'PRESS' | 'INTERNAL'>('PRESS')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    source: '',
    content: '',
    link: '',
    publishedAt: '',
    featured: false,
    isActive: true,
  })

  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  /* ================= PREFILL ================= */

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || '',
        excerpt: editData.excerpt || '',
        source: editData.source || '',
        content: editData.content || '',
        link: editData.link || '',
        publishedAt: editData.publishedAt?.slice(0, 10) || '',
        featured: editData.featured || false,
        isActive: editData.isActive ?? true,
      })

      setType(editData.type || 'PRESS')
      setPreview(editData.coverImage || null)
    }
  }, [editData])

  /* ================= VALIDATION ================= */

  const validate = () => {
    if (!form.title || form.title.length < 5) {
      toast.error('Title must be at least 5 characters')
      return false
    }

    if (!form.excerpt || form.excerpt.length < 10) {
      toast.error('Excerpt must be at least 10 characters')
      return false
    }

    if (type === 'PRESS') {
      if (!form.link) {
        toast.error('Link required for PRESS')
        return false
      }
      if (!form.source) {
        toast.error('Source required for PRESS')
        return false
      }
    }

    if (type === 'INTERNAL' && !form.content) {
      toast.error('Content required for INTERNAL')
      return false
    }

    return true
  }

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!validate()) return

    const toastId = toast.loading(
      isEdit ? 'Updating news...' : 'Creating news...'
    )

    try {
      setLoading(true)

      const newsData = {
        title: form.title,
        excerpt: form.excerpt,
        type,
        publishedAt: form.publishedAt,
        featured: form.featured,
        isActive: form.isActive,

        ...(type === 'PRESS' && {
          source: form.source,
          link: form.link,
        }),

        ...(type === 'INTERNAL' && {
          content: form.content,
        }),
      }

      const fd = new FormData()
      fd.append('newsData', JSON.stringify(newsData))

      if (image) {
        fd.append('coverImage', image)
      }

      let res

      if (isEdit) {
        if (!editData?.id) {
          toast.error('Invalid news ID', { id: toastId })
          return
        }
        res = await updateNews(editData.id, fd)
      } else {
        res = await createNews(fd)
      }

      console.log('SUCCESS:', res)

      toast.success(
        isEdit
          ? 'News updated successfully '
          : 'News created successfully ',
        { id: toastId }
      )

      onSuccess?.()
      onClose?.()

    } catch (err: any) {

      toast.error(
        err?.response?.data?.message || 'Something went wrong ',
        { id: toastId }
      )
    } finally {
      setLoading(false)
    }
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? 'Edit News' : 'Create News'}
        </h2>

        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500">Title</label>
        <input
          placeholder="Enter news title"
          className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* Excerpt */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500">Excerpt</label>
        <textarea
          placeholder="Short summary..."
          className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
      </div>

      {/* Type */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500">Type</label>
        <select
          className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option value="PRESS">PRESS</option>
          <option value="INTERNAL">INTERNAL</option>
        </select>
      </div>

      {/* PRESS */}
      {type === 'PRESS' && (
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Source (e.g. Indian Express)"
            className="border border-gray-200 px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          />
          <input
            placeholder="External Link"
            className="border border-gray-200 px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
        </div>
      )}

      {/* INTERNAL */}
      {type === 'INTERNAL' && (
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Content</label>
          <textarea
            placeholder="Full article content..."
            className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
      )}

      {/* Date */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500">Published Date</label>
        <input
          type="date"
          className="w-full border border-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={form.publishedAt}
          onChange={(e) =>
            setForm({ ...form, publishedAt: e.target.value })
          }
        />
      </div>

      {/* Upload */}
      <label className="block">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center cursor-pointer hover:border-blue-500 transition">
          {!preview ? (
            <>
              <p className="text-sm text-gray-600">
                Click to upload image
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG, WEBP (Max 500KB)
              </p>
            </>
          ) : (
            <div className="space-y-2">
              <img
                src={preview}
                className="h-32 mx-auto rounded-lg object-cover"
              />
              <p className="text-xs text-blue-600">
                Click to change image
              </p>
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            if (file.size > 500 * 1024) {
              toast.error('Max image size is 500KB')
              return
            }

            setImage(file)
            setPreview(URL.createObjectURL(file))
          }}
        />
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-gray-300 py-2 rounded-xl hover:bg-gray-50 transition text-gray-700"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading
            ? 'Saving...'
            : isEdit
              ? 'Update News'
              : 'Create News'}
        </button>
      </div>

    </div>
  )
}