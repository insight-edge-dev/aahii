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
        <div key={item.id} className="p-4 border rounded-xl grid grid-cols-[1fr_100px_100px]">

          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-gray-500">{item.excerpt}</p>
          </div>

          <div>{item.type}</div>

          <div className="flex gap-3 justify-end">
            <Pencil onClick={() => setEditItem(item)} />
            <Trash2 onClick={() => removeNews(item.id)} />
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