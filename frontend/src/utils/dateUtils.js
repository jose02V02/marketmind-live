export function timeAgo(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)

  if (diff < 60) return 'Ora'
  if (diff < 3600) return `${Math.floor(diff / 60)} min fa`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h fa`
  const d = date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' })
  return d
}

export function formatTime(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTime(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleString('it-IT', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
