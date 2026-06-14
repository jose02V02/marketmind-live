import { useState, useEffect, useCallback, useRef } from 'react'

const API_BASE = '/api'
const REFRESH_INTERVAL = 60000

export function useNews({ category = 'ultime', search = '' } = {}) {
  const [articles, setArticles] = useState([])
  const [breaking, setBreaking] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [meta, setMeta] = useState({ total: 0, cachedAt: null })
  const [countdown, setCountdown] = useState(0)
  const intervalRef = useRef(null)
  const countdownRef = useRef(null)

  const fetchNews = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({ category, limit: '60' })
      if (search.trim()) params.set('search', search.trim())
      const res = await fetch(`${API_BASE}/news?${params}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setArticles(data.articles || [])
      setBreaking(data.breaking || [])
      setMeta({ total: data.total, cachedAt: data.cachedAt })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [category, search])

  const refresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await fetch(`${API_BASE}/news/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      })
      await fetchNews(true)
      resetCountdown()
    } catch (err) {
      setError(err.message)
    } finally {
      setRefreshing(false)
    }
  }, [category, fetchNews])

  const resetCountdown = useCallback(() => {
    setCountdown(REFRESH_INTERVAL / 1000)
  }, [])

  useEffect(() => {
    fetchNews()
    resetCountdown()
    intervalRef.current = setInterval(() => {
      fetchNews(true)
      resetCountdown()
    }, REFRESH_INTERVAL)
    return () => clearInterval(intervalRef.current)
  }, [fetchNews, resetCountdown])

  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setCountdown(c => Math.max(0, c - 1))
    }, 1000)
    return () => clearInterval(countdownRef.current)
  }, [])

  return { articles, breaking, loading, refreshing, error, meta, countdown, refresh, refetch: fetchNews }
}

export function useCategories() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(d => setCategories(d.categories || []))
      .catch(() => {})
  }, [])
  return categories
}
