import express from 'express'
import cors from 'cors'
import newsRouter from './routes/news.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'UltimaOra Live', ts: new Date().toISOString() })
})

app.use('/api', newsRouter)

app.listen(PORT, () => {
  console.log(`\n✅  UltimaOra Live backend → http://localhost:${PORT}`)
  console.log(`📡  API ready at http://localhost:${PORT}/api/news\n`)
})

export default app
