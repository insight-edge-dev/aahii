import { api } from '@/lib/axios'

// ✅ GET LIST
export const getNews = async (page = 1, limit = 10) => {
  const res = await api.get(`/admin/news?page=${page}&limit=${limit}`)
  return res.data
}

// ✅ CREATE
export const createNews = async (data: FormData) => {
  const res = await api.post('/admin/news', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

// ✅ DELETE
export const deleteNews = async (id: string) => {
  const res = await api.delete(`admin/news/${id}`)
  return res.data
}

// ✅ GET BY ID
export const getNewsById = async (id: string) => {
  const res = await api.get(`/admin/news/${id}`)
  return res.data
}

// ✅ UPDATE
export const updateNews = async (id: string, data: FormData) => {
  const res = await api.put(`/admin/news/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}