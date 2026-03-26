'use client'

import { motion } from 'framer-motion'

export const StatCard = ({ title, value, icon: Icon, color }: any) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex justify-between items-start"
        >
            <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                    {title}
                </p>

                <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                    {value}
                </h2>

                <p className="text-sm text-green-500 mt-2">
                    Live data
                </p>
            </div>

            <div className="p-3 bg-blue-100 rounded-xl">
                <Icon className="text-blue-600" size={20} />
            </div>
        </motion.div>
    )
}