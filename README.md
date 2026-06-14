# UltimaOra Live 📡

Aggregatore intelligente di notizie live in tempo reale. Dashboard dark-mode premium stile Bloomberg.

## Stack

- **Frontend**: React 18 + Vite 5
- **Backend**: Node.js + Express + rss-parser
- **Cache**: in-memory (60s TTL)
- **Fonti**: ANSA, Repubblica, Corriere, Wired IT, Gazzetta, Il Sole 24 Ore, ecc.

## Avvio locale

```bash
# 1. Installa dipendenze
cd backend && npm install
cd ../frontend && npm install

# 2. Avvia backend (porta 3001)
cd backend && npm run dev

# 3. Avvia frontend (porta 5173) — in altro terminale
cd frontend && npm run dev

# 4. Apri http://localhost:5173
```

## Funzionalità MVP

- Dashboard live con aggiornamento ogni 60 secondi
- Breaking news banner con scroll automatico  
- 6 categorie: Ultime Ore, Italia, Mondo, Economia, Tecnologia, Sport
- Ricerca full-text con debounce
- Cache temporanea 60s lato backend
- Pulsante aggiorna con countdown
- Loader skeleton
- Gestione errori
- Responsive mobile
- PWA-ready (manifest.json)

## Deploy

### Render.com (consigliato per backend)
1. Crea Web Service puntando a `backend/`
2. Build command: `npm install`
3. Start command: `node server.js`

### Vercel (frontend)
1. Crea progetto puntando a `frontend/`
2. Framework: Vite
3. Imposta env var `VITE_API_URL` con URL del backend Render

### Variabili d'ambiente backend
- `PORT` (default: 3001)
- `CORS_ORIGIN` (default: *)
