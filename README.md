# UltimaOra Live 📡

Aggregatore intelligente di notizie live in tempo reale. Dashboard dark-mode premium stile Bloomberg.

## Stack

| Layer | Tecnologie |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Backend | Node.js + Express 4 |
| Parsing RSS | rss-parser |
| Cache | In-memory (60s TTL) |
| Deploy | Render (backend) + Vercel (frontend) |

## Fonti

ANSA · Repubblica · Corriere della Sera · TGCom24 · Il Sole 24 Ore · Wired Italia · Tom's Hardware IT · Gazzetta dello Sport · Corriere dello Sport

## Avvio locale

```bash
# 1. Installa dipendenze
cd backend && npm install
cd ../frontend && npm install

# 2. Avvia backend (porta 3001)
cd backend && npm run dev

# 3. In un altro terminale, avvia frontend (porta 5173)
cd frontend && npm run dev

# 4. Apri http://localhost:5173
```

## Funzionalità MVP

- ⚡ Dashboard live con aggiornamento ogni 60 secondi
- 🔴 Breaking news banner con scroll automatico
- 📂 6 categorie: Ultime Ore, Italia, Mondo, Economia, Tecnologia, Sport
- 🔍 Ricerca full-text con debounce 400ms
- 💾 Cache in-memory 60s lato backend
- ↻ Pulsante aggiorna con countdown visivo
- 💀 Skeleton loader
- ⚠️ Gestione errori con retry
- 📱 Responsive mobile-first
- 📲 PWA-ready (manifest.json + favicon SVG)

## Struttura progetto

```
marketmind-live/
├── backend/
│   ├── config/feeds.js          # URL feed RSS per categoria
│   ├── routes/news.js           # Endpoint /api/news e /api/categories
│   ├── services/
│   │   ├── cacheService.js      # Cache in-memory con TTL
│   │   └── rssService.js        # Fetch e parsing feed RSS
│   └── server.js                # Entry point Express
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── manifest.json        # PWA manifest
│   └── src/
│       ├── components/          # Header, Card, Banner, Loader, ecc.
│       ├── hooks/useNews.js     # Data fetching + auto-refresh
│       ├── utils/dateUtils.js   # Formattazione date in italiano
│       ├── App.jsx
│       ├── index.css            # Design system dark-mode
│       └── main.jsx
├── package.json                 # Script monorepo
└── vercel.json                  # Config deploy
```

## Deploy

### Backend → Render.com

1. Crea un nuovo **Web Service** su render.com
2. Collega il repo, imposta Root Directory: `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Copia l'URL pubblico (es. `https://ultimaora-api.onrender.com`)

### Frontend → Vercel

1. Importa il repo su vercel.com
2. Root Directory: `frontend`
3. Framework: **Vite**
4. Aggiungi variabile d'ambiente: `VITE_API_URL=https://tuo-backend.onrender.com`
5. In `vite.config.js` aggiorna il proxy con l'URL del backend in produzione

### Variabili d'ambiente backend

| Variabile | Default | Descrizione |
|-----------|---------|-------------|
| `PORT` | `3001` | Porta del server |
| `CORS_ORIGIN` | `*` | Origini CORS permesse |

## Upgrade futuri

### PWA completa
- Aggiungere `service-worker.js` con Workbox per offline support
- Cache dei feed per lettura offline
- Push notifications per breaking news

### Monetizzazione
1. **Google AdSense** — banner tra le card
2. **Abbonamento premium** — rimozione ads + notifiche push
3. **API as a Service** — accesso programmatico ai feed aggregati
4. **Newsletter sponsorizzata** — digest giornaliero con sponsor

### Roadmap da MVP a prodotto

| Fase | Feature |
|------|---------|
| v1.1 | Preferiti / bookmark locali |
| v1.2 | Notifiche push browser per breaking news |
| v1.3 | Account utente + feed personalizzati |
| v2.0 | App mobile React Native |
| v2.1 | AI summary degli articoli con Claude API |
| v2.2 | TTS — ascolta le notizie |
| v3.0 | Multi-lingua (EN, ES, FR) |
