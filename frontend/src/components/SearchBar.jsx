import { useState, useEffect } from 'react'

export default function SearchBar({ value, onChange }) {
  const [local, setLocal] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => onChange(local), 400)
    return () => clearTimeout(t)
  }, [local])

  useEffect(() => { setLocal(value) }, [value])

  return (
    <div className="search-container">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        type="search"
        placeholder="Cerca notizie, fonti…"
        value={local}
        onChange={e => setLocal(e.target.value)}
        aria-label="Cerca notizie"
      />
      {local && (
        <button
          className="search-clear"
          onClick={() => { setLocal(''); onChange('') }}
          aria-label="Cancella ricerca"
        >
          ×
        </button>
      )}
    </div>
  )
}
