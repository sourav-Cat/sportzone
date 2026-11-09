
import type { NewsArticle } from '../../api/newsApi'

interface NewsCardProps {
  article: NewsArticle
}

function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-green-500 transition">

      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-slate-800 flex items-center justify-center text-gray-500">
          No Image Available
        </div>
      )}

      <div className="p-5">

        <p className="text-green-400 text-xs font-semibold uppercase">
          {article.source.name}
        </p>

        <h3 className="text-lg font-bold mt-3 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-400 text-sm mt-3 line-clamp-3">
          {article.description || 'Read the full story for more details.'}
        </p>

        <div className="flex items-center justify-between mt-5">

          <span className="text-gray-500 text-xs">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 text-sm font-semibold hover:underline"
          >
            Read More →
          </a>

        </div>
      </div>
    </article>
  )
}

export default NewsCard
