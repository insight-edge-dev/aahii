import axios from 'axios'

export const api = axios.create({
  baseURL: '/api', // keep empty if same app
  withCredentials: true,
})

// 🔥 Attach token (if exists)
/*api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})*/