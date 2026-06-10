"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AdminTender } from "../hooks/useTenders";
import { TenderForm } from "./TenderForm";

type CreateTenderModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData?: AdminTender | null;
  onSuccess?: () => void;
};

export function CreateTenderModal({
  open,
  setOpen,
  editData,
  onSuccess,
}: CreateTenderModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl"
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
          >
            <TenderForm
              editData={editData}
              onClose={() => setOpen(false)}
              onSuccess={onSuccess}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
