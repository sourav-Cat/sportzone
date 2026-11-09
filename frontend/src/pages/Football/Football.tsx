
import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import FootballMatchCenter from '../../components/football/FootballMatchCenter'
import { getNews, type NewsArticle } from '../../api/newsApi'
import NewsCard from '../../components/news/NewsCard'

function Football() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getNews('football')
      .then((data) => setArticles(data.articles))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-3 mb-3">
          <Trophy className="text-green-400" size={30} />
          <h1 className="text-4xl font-bold">
            Football
          </h1>
        </div>

        <p className="text-gray-400 mb-8">
          Follow football matches, live scores and latest news.
        </p>

        {/* Football Matches */}
        <FootballMatchCenter />

        {/* Football News */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6">
            Latest <span className="text-green-400">Football News</span>
          </h2>

          {loading && (
            <p className="text-gray-400">Loading football news...</p>
          )}

          {error && (
            <p className="text-red-400">
              Unable to load football news.
            </p>
          )}

          {!loading && !error && articles.length === 0 && (
            <p className="text-gray-400">
              No football news available.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}

export default Football
