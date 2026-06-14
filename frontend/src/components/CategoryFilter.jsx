export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="categories" role="tablist" aria-label="Categorie">
      {categories.map(cat => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={active === cat.id}
          className={`cat-btn${active === cat.id ? ' active' : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className="cat-icon">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  )
}
