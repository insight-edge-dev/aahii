import { api } from "@/lib/axios";

export const fetchVendors = async (status?: string) => {
  const res = await api.get("/admin/vendors", {
    params: { status },
  });
  return res.data;
};

export const approveVendor = async (vendorId: string) => {
  return api.patch(`/admin/vendors/${vendorId}/approve`);
};

export const rejectVendor = async (vendorId: string, reason: string) => {
  return api.patch(`/admin/vendors/${vendorId}/reject`, {
    reason,
  });
};