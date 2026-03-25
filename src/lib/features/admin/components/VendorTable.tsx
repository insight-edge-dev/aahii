'use client'

import { motion } from 'framer-motion'

const vendors = [
    { name: 'Lumina Medical', status: 'Pending' },
    { name: 'BioPath Labs', status: 'Review' },
    { name: 'Zenith Care', status: 'Pending' },
    { name: 'Nova Surgical', status: 'Approved' },
]

const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-700'
        case 'Review':
            return 'bg-blue-100 text-blue-700'
        case 'Approved':
            return 'bg-green-100 text-green-700'
        default:
            return 'bg-gray-100 text-gray-600'
    }
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 2)
}

export const VendorTable = () => {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Recent Vendor Requests
                </h2>

                <button className="text-sm text-blue-600 font-medium hover:underline">
                    View All →
                </button>
            </div>

            {/* Table */}
            <div className="space-y-3">
                {vendors.map((v, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -2 }}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow-sm transition bg-white"
                    >

                        {/* Left: Avatar + Name */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-medium text-sm">
                                {getInitials(v.name)}
                            </div>

                            <p className="font-medium text-gray-800">
                                {v.name}
                            </p>
                        </div>

                        {/* Status */}
                        <span
                            className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                                v.status
                            )}`}
                        >
                            {v.status}
                        </span>

                        {/* Action */}
                        <button className="text-blue-600 text-sm font-medium hover:underline">
                            View
                        </button>
                    </motion.div>
                ))}
            </div>

        </div>
    )
}