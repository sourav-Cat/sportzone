import { useEffect, useState } from 'react'
import { getNews, type NewsArticle } from '../api/newsApi'
import NewsCard from '../components/news/NewsCard'

const Cricket = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getNews('cricket')
      .then((data) => setArticles(data.articles))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Cricket News
      </h1>

      {loading && <p>Loading cricket news...</p>}

      {error && (
        <p>Unable to load cricket news. Please try again.</p>
      )}

      {!loading && !error && articles.length === 0 && (
        <p>No cricket news available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Cricket