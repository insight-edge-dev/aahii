import { api } from "@/lib/axios";

export const getEvents = async () => {
  const res = await api.get("/admin/events");
  return res.data.data;
};

export const deleteEvent = async (id: string) => {
  return api.delete(`/admin/events/${id}`);
};

export const createEvent = async (formData: FormData) => {
  return api.post("/admin/events", formData);
};

export const updateEvent = async (id: string, data: any) => {
  return api.put(`/admin/events/${id}`, data);
};