
import { Router } from 'express'
const newsCache: Record<
  string,
  { data: any; timestamp: number }
> = {}

const CACHE_DURATION = 15 * 60 * 1000

const router = Router()

router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.GNEWS_API_KEY

    if (!apiKey) {
      return res.status(500).json({
        message: 'GNews API Key not found'
      })
    }

    const category =
      typeof req.query.category === 'string'
        ? req.query.category
        : 'cricket'

    let searchQuery = ''

    if (category === 'cricket') {
      searchQuery = 'cricket OR BPL OR "Bangladesh cricket"'
    } else if (category === 'football') {
      searchQuery = '"association football" OR soccer OR "Premier League" OR "La Liga" OR "Champions League"'
    } else {
      return res.status(400).json({
        message: 'Invalid category. Use cricket or football.'
      })
    }
    const cached = newsCache[category]

if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
  console.log(`Cache HIT: ${category}`)
  return res.json(cached.data)
}

console.log(`Cache MISS: ${category}`)
    const params = new URLSearchParams({
        
      q: searchQuery,
      lang: 'en',
      max: '10',
      sortby: 'publishedAt',
      nullable: 'description,image'
    })

    const response = await fetch(
      `https://gnews.io/api/v4/search?${params}`,
      {
        headers: {
          'X-Api-Key': apiKey
        }
      }
    )

   if (!response.ok) {
  const errorDetails = await response.text()

  return res.status(response.status).json({
    message: 'GNews API request failed',
    status: response.status,
    details: errorDetails
  })
}

  const data = await response.json()

const result = {
  category,
  totalArticles: data.totalArticles,
  articles: data.articles
}

newsCache[category] = {
  data: result,
  timestamp: Date.now()
}

return res.json(result)

  } catch (error) {
    console.error('News API Error:', error)

    return res.status(500).json({
      message: 'Unable to fetch news'
    })
  }
})

export default router
