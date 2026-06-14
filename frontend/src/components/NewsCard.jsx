import { timeAgo } from '../utils/dateUtils.js'

const CATEGORY_LABELS = {
  ultime: 'Ultime',
  italia: 'Italia',
  mondo: 'Mondo',
  economia: 'Economia',
  tecnologia: 'Tech',
  sport: 'Sport',
}

export default function NewsCard({ article, style }) {
  const { title, excerpt, link, source, category, publishedAt, image, isBreaking } = article

  const cardClass = [
    'news-card',
    isBreaking ? 'breaking' : '',
    category === 'tecnologia' ? 'tecnologia' : '',
  ].filter(Boolean).join(' ')

  return (
    <article className={cardClass} style={style}>
      {image && (
        <img
          className="card-image"
          src={image}
          alt={title}
          loading="lazy"
          onError={e => { e.target.style.display = 'none' }}
        />
      )}
      <div className="card-body">
        <div className="card-meta">
          <span className="card-source">{source}</span>
          <span className="card-time">{timeAgo(publishedAt)}</span>
        </div>

        {isBreaking && (
          <div>
            <span className="card-badge-breaking">⚡ Breaking</span>
          </div>
        )}

        <h2 className="card-title">{title}</h2>

        {excerpt && <p className="card-excerpt">{excerpt}</p>}

        <div className="card-footer">
          <a
            className="card-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Leggi su ${source}`}
          >
            Leggi l'articolo →
          </a>
          <span className="card-cat-badge">{CATEGORY_LABELS[category] || category}</span>
        </div>
      </div>
    </article>
  )
}
