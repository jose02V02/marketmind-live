import express from 'express'
import { fetchCategory, fetchAll } from '../services/rssService.js'
import { get, set, invalidate, getCachedAt } from '../services/cacheService.js'
import { CATEGORIES } from '../config/feeds.js'

const router = express.Router()

router.get('/categories', (_req, res) => {
  res.json({ categories: CATEGORIES })
})

router.get('/news', async (req, res) => {
  const { category = 'ultime', search = '', page = '1', limit = '30' } = req.query
  const cacheKey = `news:${category}`

  try {
    let articles = get(cacheKey)
    const fromCache = !!articles

    if (!articles) {
      articles = category === 'ultime'
        ? await fetchAll()
        : await fetchCategory(category)
      set(cacheKey, articles)
    }

    let filtered = articles
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      filtered = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q),
      )
    }

    const pageNum = Math.max(1, parseInt(page, 10))
    const limitNum = Math.min(Math.max(1, parseInt(limit, 10)), 100)
    const start = (pageNum - 1) * limitNum
    const paginated = filtered.slice(start, start + limitNum)

    // first 3 breaking news
    const breaking = articles.filter(a => a.isBreaking).slice(0, 3)

    res.json({
      articles: paginated,
      breaking,
      total: filtered.length,
      page: pageNum,
      pages: Math.ceil(filtered.length / limitNum),
      fromCache,
      cachedAt: getCachedAt(cacheKey),
    })
  } catch (err) {
    console.error('[API] Error:', err.message)
    res.status(500).json({ error: 'Errore nel recupero delle notizie', detail: err.message })
  }
})

router.post('/news/refresh', async (req, res) => {
  const { category = 'ultime' } = req.body
  const cacheKey = `news:${category}`
  invalidate(cacheKey)

  try {
    const articles = category === 'ultime'
      ? await fetchAll()
      : await fetchCategory(category)
    set(cacheKey, articles)
    res.json({
      ok: true,
      count: articles.length,
      refreshedAt: new Date().toISOString(),
    })
  } catch (err) {
    res.status(500).json({ error: 'Refresh fallito', detail: err.message })
  }
})

export default router
