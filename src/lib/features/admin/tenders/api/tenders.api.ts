import { api } from "@/lib/axios";

export const getTenders = async (page = 1, limit = 20) => {
  const res = await api.get(`/admin/tenders?page=${page}&limit=${limit}`);
  return res.data;
};

export const createTender = async (data: FormData) => {
  const res = await api.post("/admin/tenders", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const updateTender = async (id: string, data: FormData) => {
  const res = await api.put(`/admin/tenders/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const deleteTender = async (id: string) => {
  const res = await api.delete(`/admin/tenders/${id}`);
  return res.data;
};
