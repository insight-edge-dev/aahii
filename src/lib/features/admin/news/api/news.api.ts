import { api } from "@/lib/axios";

export type AdminNewsQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
};

export const getNews = async (query: AdminNewsQuery = {}) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== "ALL") {
      params.set(key, String(value));
    }
  });

  const res = await api.get(`/admin/news?${params.toString()}`);
  return res.data;
};

export const createNews = async (data: FormData) => {
  const res = await api.post("/admin/news", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteNews = async (id: string) => {
  const res = await api.delete(`/admin/news/${id}`);
  return res.data;
};

export const getNewsById = async (id: string) => {
  const res = await api.get(`/admin/news/${id}`);
  return res.data;
};

export const updateNews = async (id: string, data: FormData) => {
  const res = await api.put(`/admin/news/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
