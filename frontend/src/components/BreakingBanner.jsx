export default function BreakingBanner({ items }) {
  if (!items || items.length === 0) return null

  const doubled = [...items, ...items]

  return (
    <div className="breaking-banner">
      <div className="breaking-inner">
        {doubled.map((item, i) => (
          <div key={`${item.id}-${i}`} className="breaking-item">
            <span className="breaking-sep">◆</span>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
              [{item.source}]
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
