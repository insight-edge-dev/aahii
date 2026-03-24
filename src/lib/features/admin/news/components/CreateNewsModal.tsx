'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { NewsForm } from './NewsForm'

export const CreateNewsModal = ({ open, setOpen, editData, onSuccess }: any) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <motion.div className="bg-white w-full max-w-2xl rounded-2xl p-6">
            <NewsForm
              onClose={() => setOpen(false)}
              editData={editData}
              onSuccess={onSuccess}
            />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}