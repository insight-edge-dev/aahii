import { api } from "@/lib/axios";

export type InfrastructureCategory =
  | "ON_SITE_DEVELOPMENT"
  | "CONCEPT_PLAN";

export type AdminInfrastructureImage = {
  id: string;
  category: InfrastructureCategory;
  imageUrl: string;
  publicId: string | null;
  caption: string | null;
  altText: string | null;
  sortOrder: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiResult<T> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
};

export async function getInfrastructureImages() {
  const response = await api.get<ApiResult<AdminInfrastructureImage[]>>(
    "/admin/infrastructure",
  );
  return response.data;
}
export async function createInfrastructureImage(data: FormData) {
  const response = await api.post<ApiResult<AdminInfrastructureImage>>(
    "/admin/infrastructure",
    data,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
}

export async function updateInfrastructureImage(
  imageId: string,
  data: FormData,
) {
  const response = await api.put<ApiResult<AdminInfrastructureImage>>(
    `/admin/infrastructure/${imageId}`,
    data,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
}

export async function deleteInfrastructureImage(imageId: string) {
  const response = await api.delete<ApiResult<{ id: string }>>(
    `/admin/infrastructure/${imageId}`,
  );
  return response.data;
}
