const store = new Map()
const DEFAULT_TTL = 60 * 1000 // 60 seconds

export function get(key) {
  const entry = store.get(key)
  if (!entry) return null
  if (Date.now() - entry.ts > DEFAULT_TTL) {
    store.delete(key)
    return null
  }
  return entry.data
}

export function set(key, data) {
  store.set(key, { data, ts: Date.now() })
}

export function invalidate(key) {
  if (key) {
    store.delete(key)
  } else {
    store.clear()
  }
}

export function getCachedAt(key) {
  const entry = store.get(key)
  return entry ? new Date(entry.ts).toISOString() : null
}
