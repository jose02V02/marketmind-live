import { useState, useCallback } from 'react'
import { useNews, useCategories } from './hooks/useNews.js'
import LiveIndicator from './components/LiveIndicator.jsx'
import BreakingBanner from './components/BreakingBanner.jsx'
import SearchBar from './components/SearchBar.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import NewsCard from './components/NewsCard.jsx'
import Loader from './components/Loader.jsx'
import ErrorState from './components/ErrorState.jsx'
import { formatTime } from './utils/dateUtils.js'

export default function App() {
  const [category, setCategory] = useState('ultime')
  const [search, setSearch] = useState('')

  const { articles, breaking, loading, refreshing, error, meta, countdown, refresh, refetch } =
    useNews({ category, search })
  const categories = useCategories()

  const handleCategory = useCallback((cat) => {
    setCategory(cat)
    setSearch('')
  }, [])

  const lastUpdate = meta.cachedAt ? formatTime(meta.cachedAt) : null

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">📡</div>
            <div className="logo-text">
              Ultima<span>Ora</span> Live
            </div>
          </div>

          <div className="header-center" />

          <div className="header-right">
            {lastUpdate && (
              <span className="last-update">Aggiornato alle {lastUpdate}</span>
            )}
            <button
              className={`btn-refresh${refreshing ? ' loading' : ''}`}
              onClick={refresh}
              disabled={refreshing}
              title="Forza aggiornamento"
            >
              <span className="icon">↻</span>
              {refreshing ? 'Aggiornando…' : `${countdown}s`}
            </button>
            <LiveIndicator />
          </div>
        </div>

        <div className="countdown-bar">
          <div className="countdown-fill" key={`${category}-${meta.cachedAt}`} />
        </div>
      </header>

      {breaking.length > 0 && <BreakingBanner items={breaking} />}

      <main className="main-content">
        <div className="toolbar">
          <div className="toolbar-row">
            <CategoryFilter
              categories={categories}
              active={category}
              onSelect={handleCategory}
            />
          </div>
          <div className="toolbar-row">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        <section className="news-section">
          {!loading && !error && (
            <div className="section-header">
              <h1 className="section-title">
                {search
                  ? `Risultati per "${search}"`
                  : (categories.find(c => c.id === category)?.label ?? 'Notizie')}
              </h1>
              <span className="count-badge">
                {meta.total > 0 ? `${meta.total} articoli` : ''}
              </span>
            </div>
          )}

          {loading && <Loader count={9} />}

          {!loading && error && (
            <ErrorState message={error} onRetry={() => refetch()} />
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔎</div>
              <div className="empty-title">Nessun risultato</div>
              <div className="empty-msg">
                {search
                  ? 'Prova con parole chiave diverse.'
                  : 'Nessuna notizia disponibile al momento. Riprova tra poco.'}
              </div>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="news-grid">
              {articles.map((article, i) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  style={{ animationDelay: `${Math.min(i * 0.04, 0.6)}s` }}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>
          UltimaOra Live · Aggiornamento automatico ogni 60 secondi.
          Rispettiamo il copyright: mostriamo solo titoli, estratti e link alle testate originali.
        </p>
      </footer>
    </div>
  )
}
