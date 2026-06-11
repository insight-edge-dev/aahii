"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteTender, getTenders } from "../api/tenders.api";

export type AdminTenderDocument = {
  id: string;
  kind: "TENDER_DOCUMENT" | "CORRIGENDUM";
  title: string;
  fileUrl: string;
  publicId: string;
  originalName: string;
  sortOrder: number;
};

export type AdminTender = {
  id: string;
  ref: string;
  title: string;
  description: string;
  itemType: string | null;
  publicationDate: string | null;
  preBidMeeting: string | null;
  bidEndDateTime: string | null;
  bidOpeningDateTime: string | null;
  status: "ACTIVE" | "CLOSED" | "CANCELLED";
  archived: boolean;
  isActive: boolean;
  documents: AdminTenderDocument[];
};

export const useTenders = () => {
  const [tenders, setTenders] = useState<AdminTender[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTenders = async () => {
    try {
      setLoading(true);
      const res = await getTenders();
      setTenders(res.data.tenders);
    } catch {
      toast.error("Failed to load tenders");
    } finally {
      setLoading(false);
    }
  };

  const removeTender = async (id: string) => {
    const confirmed = window.confirm("Delete this tender and its documents?");

    if (!confirmed) return;

    const toastId = toast.loading("Deleting tender...");

    try {
      await deleteTender(id);
      toast.success("Tender deleted", { id: toastId });
      fetchTenders();
    } catch {
      toast.error("Failed to delete tender", { id: toastId });
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  return {
    tenders,
    loading,
    fetchTenders,
    removeTender,
  };
};
