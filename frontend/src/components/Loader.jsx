export default function Loader({ count = 9 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.05}s` }}>
          <div className="skeleton-img" />
          <div className="skeleton-body">
            <div className="skeleton-line short" />
            <div className="skeleton-line tall" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" style={{ marginTop: 8 }} />
          </div>
        </div>
      ))}
    </div>
  )
}
