import Parser from 'rss-parser'
import { FEEDS, ALL_FEEDS } from '../config/feeds.js'

const parser = new Parser({
  timeout: 12000,
  headers: {
    'User-Agent': 'UltimaOraLive/1.0 (+https://ultimaora.live) NewsAggregator',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['enclosure', 'enclosure'],
    ],
  },
})

function stripHtml(html) {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(str, max = 200) {
  if (!str || str.length <= max) return str
  const cut = str.lastIndexOf(' ', max)
  return str.slice(0, cut > 0 ? cut : max) + '…'
}

function extractImage(item) {
  if (item.enclosure?.url && item.enclosure.type?.startsWith('image')) return item.enclosure.url
  if (item.mediaContent?.$?.url) return item.mediaContent.$.url
  if (item.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url
  return null
}

function isBreaking(item, feedName) {
  const title = (item.title || '').toLowerCase()
  const keywords = ['breaking', 'urgente', 'ultime notizie', 'flash', 'allerta', 'allarme', 'terremoto', 'attentato', 'esplosione']
  return keywords.some(k => title.includes(k))
}

async function fetchFeed(feedConfig) {
  try {
    const feed = await parser.parseURL(feedConfig.url)
    return feed.items.slice(0, 25).map((item, idx) => {
      const rawExcerpt = item.contentSnippet || item.content || item.summary || ''
      return {
        id: item.guid || item.link || `${feedConfig.name}-${idx}`,
        title: stripHtml(item.title || 'Senza titolo').trim(),
        excerpt: truncate(stripHtml(rawExcerpt)),
        link: item.link || '#',
        source: feedConfig.name,
        category: feedConfig.category,
        publishedAt: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        image: extractImage(item),
        isBreaking: isBreaking(item, feedConfig.name),
      }
    })
  } catch (err) {
    console.error(`[RSS] ❌ ${feedConfig.name}: ${err.message}`)
    return []
  }
}

export async function fetchCategory(category) {
  const feedList = FEEDS[category] || []
  const results = await Promise.allSettled(feedList.map(fetchFeed))
  const articles = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)

  const seen = new Set()
  return articles
    .filter(a => {
      if (!a.link || seen.has(a.link)) return false
      seen.add(a.link)
      return true
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
}

export async function fetchAll() {
  const results = await Promise.allSettled(ALL_FEEDS.map(fetchFeed))
  const articles = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)

  const seen = new Set()
  return articles
    .filter(a => {
      if (!a.link || seen.has(a.link)) return false
      seen.add(a.link)
      return true
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
}
