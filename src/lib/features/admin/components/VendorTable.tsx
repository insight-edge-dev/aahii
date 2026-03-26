'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/axios' // your axios instance

const getStatusStyle = (status: string) => {
    switch (status) {
        case 'PENDING':
            return 'bg-yellow-100 text-yellow-700'
        case 'REVIEW':
            return 'bg-blue-100 text-blue-700'
        case 'APPROVED':
            return 'bg-green-100 text-green-700'
        default:
            return 'bg-gray-100 text-gray-600'
    }
}

const getInitials = (name: string) => {
    return name
        ?.split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 2)
}

export const VendorTable = () => {
    const [vendors, setVendors] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const res = await api.get('/admin/vendors')
                setVendors(res.data.data.slice(0, 4)) // latest 4
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchVendors()
    }, [])

    if (loading) {
        return (
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
                <p className="text-sm text-gray-500">Loading vendors...</p>
            </div>
        )
    }
const avatarColors = [
  "bg-red-100 text-red-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-yellow-100 text-yellow-700",
  "bg-purple-100 text-purple-600",
  "bg-pink-100 text-pink-600",
  "bg-indigo-100 text-indigo-600",
  "bg-teal-100 text-teal-600",
];
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Recent Vendor Requests
                </h2>

                <button
                    onClick={() => router.push('/admin/vendors')}
                    className="text-sm text-blue-600 font-medium hover:underline"
                >
                    View All →
                </button>
            </div>

            {/* List */}
            <div className="space-y-3">
                {vendors.map((v, i) => (
                    <motion.div
                        key={v.id}
                        whileHover={{ y: -2 }}
                        className="flex items-center p-4 rounded-xl border border-gray-100 hover:shadow-sm transition bg-white"
                    >

                        {/* LEFT */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${avatarColors[i % avatarColors.length]}`}>
                                {getInitials(v.entityName)}
                            </div>

                            <p className="font-medium text-gray-800 truncate">
                                {v.entityName}
                            </p>
                        </div>

                        {/* STATUS (FIXED WIDTH) */}
                        <div className="w-[110px] flex justify-center">
                            <span
                                className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap ${getStatusStyle(
                                    v.status
                                )}`}
                            >
                                {v.status}
                            </span>
                        </div>

                        {/* ACTION */}
                        <div className="w-[70px] flex justify-end">
                            <button
                                onClick={() => router.push(`/admin/vendors/${v.id}`)}
                                className="text-blue-600 text-sm font-medium hover:underline"
                            >
                                View
                            </button>
                        </div>

                    </motion.div>
                ))}
            </div>
        </div>
    )
}