
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Radio, CalendarDays, CheckCircle } from 'lucide-react'
import LiveMatchCard from './LiveMatchCard'
import type { Match, MatchApiResponse } from '../../types/match'

type MatchTab = 'Live' | 'Upcoming' | 'Completed'

interface CricketMatchCenterProps {
  limit?: number
}

function CricketMatchCenter({ limit }: CricketMatchCenterProps) {
  const [activeTab, setActiveTab] = useState<MatchTab>('Live')
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const tabs = [
    { name: 'Live' as MatchTab, icon: Radio },
    { name: 'Upcoming' as MatchTab, icon: CalendarDays },
    { name: 'Completed' as MatchTab, icon: CheckCircle },
  ]

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        setError('')
        setMatches([])

        const statusMap = {
          Live: 'live',
          Upcoming: 'upcoming',
          Completed: 'finished',
        }

        const response = await fetch(
          `http://localhost:5000/api/matches?sport=cricket&status=${statusMap[activeTab]}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch cricket matches')
        }

        const data: MatchApiResponse = await response.json()
        setMatches(data.matches || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [activeTab])

  const displayedMatches = limit ? matches.slice(0, limit) : matches

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <p className="text-green-400 text-sm font-semibold tracking-widest uppercase">
            Cricket Center
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Cricket <span className="text-green-400">Matches</span>
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition ${
                  activeTab === tab.name
                    ? 'bg-green-500 text-black'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            )
          })}
        </div>
      </div>

      {loading && (
        <p className="text-gray-400 text-center py-10">
          Loading cricket matches...
        </p>
      )}

      {error && (
        <p className="text-red-400 text-center py-10">
          {error}
        </p>
      )}

      {!loading && !error && matches.length === 0 && (
        <p className="text-gray-400 text-center py-10">
          No {activeTab.toLowerCase()} cricket matches available.
        </p>
      )}

      {!loading && !error && displayedMatches.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedMatches.map((match, index) => (
            <LiveMatchCard
              key={`${match.home}-${match.away}-${index}`}
              match={match}
              sport="cricket"
            />
          ))}
        </div>
      )}

      {limit && matches.length > limit && (
        <div className="text-center mt-8">
          <Link
            to="/live-scores?sport=cricket"
            className="inline-block bg-slate-800 hover:bg-green-500 hover:text-black text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            View All Cricket Matches →
          </Link>
        </div>
      )}

      <p className="text-gray-500 text-xs mt-5">
        Match data provided by SportScore.
      </p>

    </section>
  )
}

export default CricketMatchCenter
