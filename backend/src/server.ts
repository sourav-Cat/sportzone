import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

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

app.listen(PORT, () => {
  console.log(`SPORTZONE Backend running on port ${PORT}`)
})