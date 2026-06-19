import { api } from "@/lib/axios";

export const getVacancies = async () => {
  const res = await api.get("/admin/vacancies");
  return res.data;
};

export const createVacancy = async (data: FormData) => {
  const res = await api.post("/admin/vacancies", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateVacancy = async (id: string, data: FormData) => {
  const res = await api.put(`/admin/vacancies/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteVacancy = async (id: string) => {
  const res = await api.delete(`/admin/vacancies/${id}`);
  return res.data;
};
