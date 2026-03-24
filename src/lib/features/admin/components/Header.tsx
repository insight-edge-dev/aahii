'use client'

import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'

export const Header = () => {
    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm"
        >
            <h1 className="font-semibold text-lg">Dashboard</h1>

            <div className="flex items-center gap-4">
                <Bell className="text-gray-500" />

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    <div className="text-sm">
                        <p className="font-medium">Admin User</p>
                        <p className="text-gray-500 text-xs">System Architect</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}