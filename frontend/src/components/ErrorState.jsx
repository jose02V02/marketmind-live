export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Errore nel caricamento</h3>
      <p className="error-msg">
        {message || 'Impossibile recuperare le notizie. Verifica la connessione.'}
      </p>
      {onRetry && (
        <button className="btn-retry" onClick={onRetry}>
          Riprova
        </button>
      )}
    </div>
  )
}
