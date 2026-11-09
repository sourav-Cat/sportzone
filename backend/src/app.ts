import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import newsRouter from './routes/news.js'
import matchesRouter from './routes/matches.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/news', newsRouter)
app.use('/api/matches', matchesRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'SPORTZONE API is running!'
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'SPORTZONE Backend is healthy'
  })
})

export default app