'use client'

import { useState } from 'react'
import { CreateNewsModal } from '@/lib/features/admin/news/components/CreateNewsModal'
import { NewsTable } from '@/lib/features/admin/news/components/NewsTable'

export default function Page() {
  const [open, setOpen] = useState(false)
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="space-y-6">

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Add News
      </button>

      <NewsTable key={refresh} />

      <CreateNewsModal
        open={open}
        setOpen={setOpen}
        onSuccess={() => setRefresh(prev => prev + 1)}
      />
    </div>
  )
}