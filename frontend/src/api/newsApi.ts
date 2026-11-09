
import api from './api'

export interface NewsArticle {
  title: string
  description: string | null
  image: string | null
  url: string
  publishedAt: string
  source: {
    name: string
  }
}

export interface NewsResponse {
  category: string
  totalArticles: number
  articles: NewsArticle[]
}

export const getNews = async (
  category: 'cricket' | 'football'
): Promise<NewsResponse> => {
  const response = await api.get('/api/news', {
    params: { category }
  })

  return response.data
}
