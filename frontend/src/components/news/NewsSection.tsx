
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNews, type NewsArticle } from '../../api/newsApi'
import NewsCard from './NewsCard'

function NewsSection() {
  const [cricketNews, setCricketNews] = useState<NewsArticle[]>([])
  const [footballNews, setFootballNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const fetchNews = async () => {
      try {
        const results = await Promise.allSettled([
          getNews('cricket'),
          getNews('football')
        ])

        if (!active) return

        if (results[0].status === 'fulfilled') {
          setCricketNews(results[0].value.articles)
        }

        if (results[1].status === 'fulfilled') {
          setFootballNews(results[1].value.articles)
        }

        if (
          results[0].status === 'rejected' &&
          results[1].status === 'rejected'
        ) {
          setError('Unable to load sports news. Please try again later.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchNews()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          Latest Sports <span className="text-green-400">News</span>
        </h2>

        <Link to="/news" className="text-green-400 hover:underline">
          View All
        </Link>
      </div>

      {loading && (
        <p className="text-gray-400">Loading sports news...</p>
      )}

      {error && (
        <p className="text-red-400">{error}</p>
      )}

      {!loading && (
        <>
          {/* Cricket News */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">
              Cricket <span className="text-green-400">News</span>
            </h3>

            {cricketNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cricketNews.slice(0, 3).map((article, index) => (
                  <NewsCard key={`${article.url}-${index}`} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No cricket news available.</p>
            )}
          </div>

          {/* Football News */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Football <span className="text-blue-400">News</span>
            </h3>

            {footballNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {footballNews.slice(0, 3).map((article, index) => (
                  <NewsCard key={`${article.url}-${index}`} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No football news available.</p>
            )}
          </div>
        </>
      )}

    </section>
  )
}

export default NewsSection
