
import { Router } from 'express'

const router = Router()

// Match Details API
router.get('/details', async (req, res) => {
  try {
    const sport =
      typeof req.query.sport === 'string'
        ? req.query.sport
        : 'cricket'

    const slug =
      typeof req.query.slug === 'string'
        ? req.query.slug
        : ''

    if (!['cricket', 'football'].includes(sport)) {
      return res.status(400).json({
        message: 'Invalid sport.'
      })
    }

    if (!slug) {
      return res.status(400).json({
        message: 'Match slug is required.'
      })
    }

    const params = new URLSearchParams({
      sport,
      slug
    })

    const response = await fetch(
      `https://sportscore.com/api/widget/match/?${params}`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'SPORTZONE/1.0'
        }
      }
    )

    const responseText = await response.text()

    if (!response.ok) {
      console.error(
        'SportScore Details Error:',
        sport,
        response.status,
        responseText
      )

      return res.status(response.status).json({
        message: 'Unable to fetch match details.',
        sport,
        status: response.status,
        details: responseText
      })
    }

    const data = JSON.parse(responseText)

    return res.json(data)

  } catch (error) {
    console.error('Match Details API Error:', error)

    return res.status(500).json({
      message: 'Unable to fetch match details.'
    })
  }
})


// Cricket and Football Fixtures API
router.get('/', async (req, res) => {
  try {
    const sport =
      typeof req.query.sport === 'string'
        ? req.query.sport
        : 'cricket'

    const allowedSports = ['cricket', 'football']

    if (!allowedSports.includes(sport)) {
      return res.status(400).json({
        message: 'Invalid sport. Use cricket or football.'
      })
    }

    const status =
      typeof req.query.status === 'string'
        ? req.query.status
        : undefined

    if (
      status &&
      !['live', 'upcoming', 'finished'].includes(status)
    ) {
      return res.status(400).json({
        message: 'Invalid status.'
      })
    }

    const params = new URLSearchParams({
      sport,
      limit: '50'
    })

    if (status) {
      params.set('status', status)
    }

    if (typeof req.query.date === 'string') {
      params.set('date', req.query.date)
    }

    const apiKey = process.env.SPORTSCORE_API_KEY

    const response = await fetch(
      `https://sportscore.com/api/v1/fixtures/?${params}`,
      {
        headers: apiKey
          ? { 'X-Api-Key': apiKey }
          : {}
      }
    )

    if (!response.ok) {
      const details = await response.text()

      return res.status(response.status).json({
        message: 'SportScore API request failed',
        details
      })
    }

    const data = await response.json()

    return res.json(data)

  } catch (error) {
    console.error('Matches API Error:', error)

    return res.status(500).json({
      message: 'Unable to fetch matches'
    })
  }
})

export default router
