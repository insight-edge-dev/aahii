'use client'

import { useEffect, useState } from 'react'
import { getNews, deleteNews } from '../api/news.api'

export const useNews = () => {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchNews = async () => {
    try {
      setLoading(true)
      const res = await getNews()
      setNews(res.data.news)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const removeNews = async (id: string) => {
    await deleteNews(id)
    fetchNews()
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return { news, loading, fetchNews, removeNews }
}