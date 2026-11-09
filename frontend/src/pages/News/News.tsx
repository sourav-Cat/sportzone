
import { useEffect, useState } from 'react'
import { getNews, type NewsArticle } from '../../api/newsApi'
import NewsCard from '../../components/news/NewsCard'

function News() {
  const [cricketNews, setCricketNews] = useState<NewsArticle[]>([])
  const [footballNews, setFootballNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
const newsPerPage = 6

  useEffect(() => {
    Promise.all([
      getNews('cricket'),
      getNews('football'),
    ])
      .then(([cricket, football]) => {
        setCricketNews(cricket.articles)
        setFootballNews(football.articles)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  // Search Filter Logic
  const filteredCricketNews = cricketNews.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFootballNews = footballNews.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const currentCricketNews = filteredCricketNews.slice(
  (currentPage - 1) * newsPerPage,
  currentPage * newsPerPage
)

const currentFootballNews = filteredFootballNews.slice(
  (currentPage - 1) * newsPerPage,
  currentPage * newsPerPage
)

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-8">
        Loading latest sports news...
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 text-red-400 p-8">
        Unable to load sports news.
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Latest Sports <span className="text-green-400">News</span>
        </h1>

        <p className="text-gray-400 mb-12">
          All the latest cricket and football updates in one place.
        </p>

        {/* Search News */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search cricket or football news..."
            value={searchQuery}
           onChange={(e) => {
  setSearchQuery(e.target.value)
  setCurrentPage(1)
}}
            className="w-full md:w-1/2 px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-400"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {['All', 'Cricket', 'Football'].map((category) => (
            <button
              key={category}
              onClick={() => {
  setActiveCategory(category)
  setCurrentPage(1)
}}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeCategory === category
                  ? 'bg-green-500 text-black'
                  : 'bg-slate-900 text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cricket News */}
        {(activeCategory === 'All' || activeCategory === 'Cricket') && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Cricket <span className="text-green-400">News</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCricketNews.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))}
            </div>

            {filteredCricketNews.length === 0 && (
              <p className="text-gray-400">
                No cricket news found.
              </p>
            )}
            <div className="flex items-center justify-center gap-4 mt-8">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-5 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-40"
  >
    Previous
  </button>

  <span className="text-gray-400">
    Page {currentPage} of {Math.max(1, Math.ceil(filteredCricketNews.length / newsPerPage))}
  </span>

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, Math.ceil(filteredCricketNews.length / newsPerPage))
      )
    }
    disabled={currentPage >= Math.ceil(filteredCricketNews.length / newsPerPage)}
    className="px-5 py-2 rounded-lg bg-green-500 text-black disabled:opacity-40"
  >
    Next
  </button>
</div>
          </section>
        )}

        {/* Football News */}
        {(activeCategory === 'All' || activeCategory === 'Football') && (
          <section>
            <h2 className="text-3xl font-bold mb-6">
              Football <span className="text-green-400">News</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentFootballNews.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))}
            </div>

            {filteredFootballNews.length === 0 && (
              <p className="text-gray-400">
                No football news found.
              </p>
            )}
            <div className="flex items-center justify-center gap-4 mt-8">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-5 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-40"
  >
    Previous
  </button>

  <span className="text-gray-400">
    Page {currentPage} of {Math.max(1, Math.ceil(filteredFootballNews.length / newsPerPage))}
  </span>

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, Math.ceil(filteredFootballNews.length / newsPerPage))
      )
    }
    disabled={currentPage >= Math.ceil(filteredFootballNews.length / newsPerPage)}
    className="px-5 py-2 rounded-lg bg-green-500 text-black disabled:opacity-40"
  >
    Next
  </button>
</div>
          </section>
        )}

      </div>
    </main>
  )
}

export default News
