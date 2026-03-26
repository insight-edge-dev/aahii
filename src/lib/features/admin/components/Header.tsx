'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

export const Header = () => {
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get('/admin/auth/me')
        setAdmin(res.data.data)
      } catch (err) {
        console.error('Admin fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAdmin()
  }, [])

  const getInitial = () => {
    if (!admin?.name) return 'A'
    return admin.name.charAt(0).toUpperCase()
  }

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm"
    >
      {/* LEFT */}
      <h1 className="font-semibold text-lg text-gray-900">
        Dashboard
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {loading ? (
          <div className="w-32 h-8 bg-gray-200 animate-pulse rounded-md" />
        ) : (
          <div className="flex items-center gap-3">

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              {getInitial()}
            </div>

            {/* Info */}
            <div className="text-sm leading-tight">
              <p className="font-medium text-gray-900">
                {admin?.name}
              </p>
              <p className="text-xs text-gray-500">
                {admin?.role}
              </p>
            </div>

          </div>
        )}

      </div>
    </motion.div>
  )
}