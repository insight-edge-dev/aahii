'use client'

import { useState } from 'react'
import { useNews } from '../hooks/useNews'
import { Trash2, Pencil } from 'lucide-react'
import { CreateNewsModal } from './CreateNewsModal'

export const NewsTable = () => {
  const { news, removeNews, fetchNews } = useNews()
  const [editItem, setEditItem] = useState(null)

  return (
    <div className="space-y-3">

      {news.map((item) => (
        <div
          key={item.id}
          className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_120px_92px]"
        >

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-950">{item.title}</p>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">{item.excerpt}</p>
          </div>

          <div className="text-sm font-medium uppercase tracking-wide text-slate-600">{item.type}</div>

          <div className="flex justify-end gap-3">
            <button
              aria-label={`Edit ${item.title}`}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setEditItem(item)}
              type="button"
            >
              <Pencil size={18} />
            </button>
            <button
              aria-label={`Delete ${item.title}`}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              onClick={() => removeNews(item.id)}
              type="button"
            >
              <Trash2 size={18} />
            </button>
          </div>

        </div>
      ))}

      <CreateNewsModal
        open={!!editItem}
        setOpen={() => setEditItem(null)}
        editData={editItem}
        onSuccess={fetchNews}
      />
    </div>
  )
}
