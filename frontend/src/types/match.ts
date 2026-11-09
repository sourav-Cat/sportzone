
export interface Match {
  home: string
  away: string
  home_logo: string
  away_logo: string
  home_score: string
  away_score: string
  status: string
  status_text: string
  time: string
  competition: string
  competition_logo: string
  url: string
}

export interface MatchApiResponse {
  sport: string
  date: string
  count: number
  matches: Match[]
}
