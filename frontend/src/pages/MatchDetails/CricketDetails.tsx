
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Radio,
  Trophy,
  Activity,
  Clock,
  RefreshCw
} from 'lucide-react'

interface CricketMatch {
  home: string
  away: string
  home_logo: string
  away_logo: string
  home_score: string
  away_score: string
  status: string
  status_text: string
  competition: string
  time: string
  incidents?: unknown[]
  stats?: unknown[]
  lineups?: unknown
  tracker?: {
    id: string
    profile: string
    sport: string
  }
}

interface CricketDetailsData {
  sport: string
  match: CricketMatch
  updated: string
}

function CricketDetails() {
  const { slug } = useParams()

  const [data, setData] = useState<CricketDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const fetchDetails = async (manual = false) => {
    try {
      if (manual) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      setError('')

      const response = await fetch(
        `http://localhost:5000/api/matches/details?sport=cricket&slug=${slug}`
      )

      if (!response.ok) {
        throw new Error('Unable to load cricket details')
      }

      const result: CricketDetailsData = await response.json()
      setData(result)

    } catch {
      setError('Cricket match details load করা যাচ্ছে না।')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Automatic refresh every 15 seconds
  useEffect(() => {
    fetchDetails()

    const interval = setInterval(() => {
      fetchDetails(true)
    }, 15000)

    return () => clearInterval(interval)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Cricket Scorecard...
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
        <p>{error || 'Match not found'}</p>

        <button
          onClick={() => fetchDetails(true)}
          className="text-green-400"
        >
          Try Again
        </button>

        <Link
          to="/live-scores?sport=cricket"
          className="text-green-400"
        >
          Back to Cricket Matches
        </Link>
      </div>
    )
  }

  const match = data.match

  const matchTime = new Date(match.time).toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/live-scores?sport=cricket"
          className="inline-flex items-center gap-2 text-green-400 mb-7"
        >
          <ArrowLeft size={18} />
          Back to Cricket
        </Link>

        {/* Cricket Match Header */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 md:p-10">

          <div className="flex justify-center items-center gap-2 text-green-400">
            <Trophy size={18} />

            <span className="font-semibold text-sm">
              {match.competition}
            </span>
          </div>

          <div className="flex justify-center mt-5">
            <span className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-xs font-bold uppercase">
              <Radio size={14} />
              {match.status}
            </span>
          </div>

          <p className="text-center text-gray-400 text-sm mt-3">
            {match.status_text}
          </p>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-8 mt-10">

            <div className="text-center">
              <img
                src={match.home_logo}
                alt={match.home}
                className="w-16 h-16 md:w-24 md:h-24 object-contain mx-auto"
              />

              <h2 className="font-bold text-lg md:text-2xl mt-4">
                {match.home}
              </h2>

              <p className="text-green-400 text-3xl md:text-5xl font-extrabold mt-3">
                {match.home_score}
              </p>
            </div>

            <span className="text-gray-500 font-bold">
              VS
            </span>

            <div className="text-center">
              <img
                src={match.away_logo}
                alt={match.away}
                className="w-16 h-16 md:w-24 md:h-24 object-contain mx-auto"
              />

              <h2 className="font-bold text-lg md:text-2xl mt-4">
                {match.away}
              </h2>

              <p className="text-green-400 text-3xl md:text-5xl font-extrabold mt-3">
                {match.away_score}
              </p>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-8 pt-5 flex flex-wrap justify-center gap-5 text-gray-400 text-xs">

            <span className="flex items-center gap-2">
              <Clock size={15} />
              {matchTime}
            </span>

            <span className="flex items-center gap-2">
              <Activity size={15} />
              Cricket
            </span>

          </div>
        </section>

        {/* Scorecard */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">

          <div className="flex justify-between items-center gap-3 mb-5">

            <h2 className="text-xl font-bold">
              <span className="text-green-400">Cricket</span> Scorecard
            </h2>

            <button
              onClick={() => fetchDetails(true)}
              disabled={refreshing}
              className="flex items-center gap-2 text-green-400 text-sm hover:text-green-300 disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={refreshing ? 'animate-spin' : ''}
              />

              Refresh
            </button>

          </div>

          <div className="bg-slate-950 rounded-xl p-4">

            <p className="text-gray-400 text-sm">
              Current Match Status
            </p>

            <p className="text-white font-bold mt-2">
              {match.status_text}
            </p>

            <p className="text-green-400 text-2xl font-bold mt-3">
              {match.home_score} : {match.away_score}
            </p>

          </div>

          <p className="text-gray-500 text-xs mt-4">
            Detailed batting and bowling scorecards will appear when
            provided by the match data API.
          </p>

        </section>

        {/* Match Events */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">

          <h2 className="text-xl font-bold mb-5">
            Match Events
          </h2>

          {match.incidents && match.incidents.length > 0 ? (
            <div className="space-y-3">

              {match.incidents.map((incident, index) => (
                <pre
                  key={index}
                  className="whitespace-pre-wrap break-words text-sm text-gray-300 bg-slate-950 rounded-lg p-4"
                >
                  {typeof incident === 'object'
                    ? JSON.stringify(incident, null, 2)
                    : String(incident)}
                </pre>
              ))}

            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No match events available currently.
            </p>
          )}

        </section>

        {/* Cricket Statistics */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">

          <h2 className="text-xl font-bold mb-5">
            Match Statistics
          </h2>

          {match.stats && match.stats.length > 0 ? (
            <div className="space-y-3">

              {match.stats.map((stat, index) => (
                <pre
                  key={index}
                  className="whitespace-pre-wrap break-words text-sm text-gray-300 bg-slate-950 rounded-lg p-4"
                >
                  {typeof stat === 'object'
                    ? JSON.stringify(stat, null, 2)
                    : String(stat)}
                </pre>
              ))}

            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No statistics available currently.
            </p>
          )}

        </section>

        <p className="text-center text-gray-600 text-xs mt-8">
          Match data provided by SportScore.
        </p>

      </div>
    </main>
  )
}

export default CricketDetails
