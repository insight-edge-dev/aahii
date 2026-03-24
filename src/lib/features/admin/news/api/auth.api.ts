import { api } from "@/lib/axios";

export const adminLogin = async (email: string, password: string) => {
  const res = await api.post("/admin/login", {
    email,
    password,
  });

  return res.data;
};