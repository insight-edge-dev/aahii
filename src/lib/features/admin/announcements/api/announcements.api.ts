import { api } from "@/lib/axios";
import type { AnnouncementPayload } from "@/lib/features/announcements/announcement.types";

export const getAnnouncements = async () => {
  const res = await api.get("/admin/announcements");
  return res.data;
};

export const getAnnouncementById = async (id: string) => {
  const res = await api.get(`/admin/announcements/${id}`);
  return res.data;
};

export const createAnnouncement = async (data: AnnouncementPayload) => {
  const res = await api.post("/admin/announcements", data);
  return res.data;
};

export const updateAnnouncement = async (
  id: string,
  data: AnnouncementPayload,
) => {
  const res = await api.put(`/admin/announcements/${id}`, data);
  return res.data;
};

export const deleteAnnouncement = async (id: string) => {
  const res = await api.delete(`/admin/announcements/${id}`);
  return res.data;
};
