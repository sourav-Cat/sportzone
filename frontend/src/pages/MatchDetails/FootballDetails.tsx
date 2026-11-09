
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Trophy,
  Clock,
  RefreshCw,
  Activity,
  Users,
  Shield,
  Goal,
  CircleAlert,
  ArrowLeftRight,
  Shirt
} from 'lucide-react'

interface Player {
  name: string
  number: number
  position: string
  captain: boolean
  rating: string
}

interface Incident {
  time: number
  type: string
  side: 'home' | 'away'
  player?: string
  is_goal?: boolean
  is_card?: boolean
  is_sub?: boolean
  player_in?: string
  player_out?: string
  home_score?: number
  away_score?: number
}

interface Statistic {
  label: string
  home: number
  away: number
  home_pct: number
  away_pct: number
  suffix?: string
}

interface Lineups {
  home_formation: string
  away_formation: string
  home_coach?: string | null
  away_coach?: string | null
  confirmed: boolean
  home_xi: Player[]
  away_xi: Player[]
  home_subs: Player[]
  away_subs: Player[]
}

interface FootballMatch {
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
  incidents?: Incident[]
  stats?: Statistic[]
  lineups?: Lineups | null
}

interface FootballDetailsData {
  sport: string
  match: FootballMatch
  updated: string
}

function FootballDetails() {
  const { slug } = useParams()

  const [data, setData] = useState<FootballDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const fetchDetails = async (manual = false) => {
    try {
      if (manual) setRefreshing(true)
      else setLoading(true)

      setError('')

      const response = await fetch(
        `http://localhost:5000/api/matches/details?sport=football&slug=${slug}`
      )

      if (!response.ok) {
        throw new Error('Unable to load football details')
      }

      const result: FootballDetailsData = await response.json()
      setData(result)

    } catch {
      setError('Football match details load করা যাচ্ছে না।')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Football Match Details...
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
        <p>{error || 'Match not found'}</p>
        <Link to="/live-scores?sport=football" className="text-blue-400">
          Back to Football Matches
        </Link>
      </div>
    )
  }

  const match = data.match
  const lineups = match.lineups

  const matchTime = new Date(match.time).toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const getIncidentIcon = (incident: Incident) => {
    if (incident.is_goal) return <Goal size={18} className="text-green-400" />

    if (incident.type.toLowerCase().includes('red')) {
      return <span className="w-3 h-5 bg-red-500 rounded-sm" />
    }

    if (incident.is_card) {
      return <span className="w-3 h-5 bg-yellow-400 rounded-sm" />
    }

    if (incident.is_sub) {
      return <ArrowLeftRight size={18} className="text-blue-400" />
    }

    return <CircleAlert size={18} className="text-gray-400" />
  }

  const renderPlayerList = (players: Player[]) => (
    <div className="divide-y divide-slate-800">
      {players.map((player, index) => (
        <div
          key={`${player.number}-${player.name}-${index}`}
          className="flex items-center justify-between gap-3 py-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-blue-400">
              {player.number}
            </span>

            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {player.name}
                {player.captain && (
                  <span className="ml-2 text-yellow-400 text-xs">C</span>
                )}
              </p>

              <p className="text-xs text-gray-500">
                {player.position || 'Position unavailable'}
              </p>
            </div>
          </div>

          {player.rating && player.rating !== '0.0' && (
            <span className="text-xs text-green-400 font-bold">
              {player.rating}
            </span>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/live-scores?sport=football"
          className="inline-flex items-center gap-2 text-blue-400 mb-7"
        >
          <ArrowLeft size={18} />
          Back to Football
        </Link>

        {/* Match Header */}
        <section className="bg-gradient-to-br from-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-6 md:p-10">

          <div className="flex justify-center items-center gap-2 text-blue-400">
            <Trophy size={18} />
            <span className="font-semibold text-sm">
              {match.competition}
            </span>
          </div>

          <div className="flex justify-center mt-5">
            <span className="bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-xs font-bold uppercase">
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

              <p className="text-blue-400 text-4xl md:text-6xl font-extrabold mt-3">
                {match.home_score}
              </p>
            </div>

            <span className="text-gray-500 font-bold">VS</span>

            <div className="text-center">
              <img
                src={match.away_logo}
                alt={match.away}
                className="w-16 h-16 md:w-24 md:h-24 object-contain mx-auto"
              />

              <h2 className="font-bold text-lg md:text-2xl mt-4">
                {match.away}
              </h2>

              <p className="text-blue-400 text-4xl md:text-6xl font-extrabold mt-3">
                {match.away_score}
              </p>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-8 pt-5 flex flex-wrap justify-center gap-5 text-gray-400 text-xs">
            <span className="flex items-center gap-2">
              <Clock size={15} />
              {matchTime}
            </span>
            <span>Football</span>
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">

          <div className="flex justify-between items-center gap-3 mb-6">
            <h2 className="text-xl font-bold">
              <span className="text-blue-400">Match</span> Timeline
            </h2>

            <button
              onClick={() => fetchDetails(true)}
              disabled={refreshing}
              className="flex items-center gap-2 text-blue-400 text-sm disabled:opacity-50"
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {match.incidents && match.incidents.length > 0 ? (
            <div className="space-y-3">
              {[...match.incidents]
                .sort((a, b) => a.time - b.time)
                .map((incident, index) => (
                  <div
                    key={`${incident.time}-${index}`}
                    className={`flex items-center gap-3 rounded-xl p-4 ${
                      incident.side === 'home'
                        ? 'bg-blue-500/5'
                        : 'bg-slate-950'
                    }`}
                  >
                    <span className="w-10 text-sm font-bold text-gray-400">
                      {incident.time}'
                    </span>

                    <span className="w-8 flex justify-center">
                      {getIncidentIcon(incident)}
                    </span>

                    <div className="flex-1 min-w-0">
                      {incident.is_sub ? (
                        <>
                          <p className="text-sm text-green-400">
                            {incident.player_in}
                          </p>
                          <p className="text-xs text-red-400 mt-1">
                            {incident.player_out} off
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium">
                          {incident.player || incident.type}
                        </p>
                      )}

                      <p className="text-xs text-gray-500 mt-1">
                        {incident.type}
                      </p>
                    </div>

                    {incident.is_goal && (
                      <span className="text-sm font-bold text-green-400">
                        {incident.home_score} - {incident.away_score}
                      </span>
                    )}

                    <span className="text-xs text-gray-500">
                      {incident.side === 'home' ? match.home : match.away}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No match events available currently.
            </p>
          )}
        </section>

        {/* Statistics */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">

          <h2 className="text-xl font-bold mb-6">
            <Activity className="inline text-blue-400 mr-2" size={20} />
            Match Statistics
          </h2>

          {match.stats && match.stats.length > 0 ? (
            <div className="space-y-6">
              {match.stats.map((stat, index) => (
                <div key={`${stat.label}-${index}`}>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-white">
                      {stat.home}{stat.suffix || ''}
                    </span>

                    <span className="text-gray-400 text-center">
                      {stat.label}
                    </span>

                    <span className="font-bold text-white">
                      {stat.away}{stat.suffix || ''}
                    </span>
                  </div>

                  <div className="flex h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="bg-blue-500"
                      style={{ width: `${stat.home_pct}%` }}
                    />

                    <div
                      className="bg-slate-600"
                      style={{ width: `${stat.away_pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{match.home}</span>
                    <span>{match.away}</span>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Match statistics are not available currently.
            </p>
          )}
        </section>

        {/* Team Lineups */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">

          <h2 className="text-xl font-bold mb-5">
            <Users className="inline text-blue-400 mr-2" size={20} />
            Team Lineups
          </h2>

          {lineups ? (
            <>
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <p className="font-bold">{match.home}</p>
                  <p className="text-sm text-blue-400 mt-1">
                    Formation: {lineups.home_formation}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">{match.away}</p>
                  <p className="text-sm text-blue-400 mt-1">
                    Formation: {lineups.away_formation}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Home Team */}
                <div className="bg-slate-950 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shirt size={18} className="text-blue-400" />
                    <h3 className="font-bold">{match.home} - Starting XI</h3>
                  </div>

                  {renderPlayerList(lineups.home_xi || [])}
                </div>

                {/* Away Team */}
                <div className="bg-slate-950 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shirt size={18} className="text-blue-400" />
                    <h3 className="font-bold">{match.away} - Starting XI</h3>
                  </div>

                  {renderPlayerList(lineups.away_xi || [])}
                </div>

                {/* Home Substitutes */}
                <div className="bg-slate-950 rounded-xl p-4">
                  <h3 className="font-bold mb-3 text-blue-400">
                    {match.home} - Substitutes
                  </h3>
                  {renderPlayerList(lineups.home_subs || [])}
                </div>

                {/* Away Substitutes */}
                <div className="bg-slate-950 rounded-xl p-4">
                  <h3 className="font-bold mb-3 text-blue-400">
                    {match.away} - Substitutes
                  </h3>
                  {renderPlayerList(lineups.away_subs || [])}
                </div>

              </div>

              <p className="text-xs text-gray-500 mt-4">
                {lineups.confirmed
                  ? 'Lineups confirmed'
                  : 'Lineups not confirmed'}
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">
              Team lineups are not available currently.
            </p>
          )}

        </section>

        {/* Match Information */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">

          <h2 className="text-xl font-bold mb-5">
            <Shield className="inline text-blue-400 mr-2" size={20} />
            Match Information
          </h2>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
              <span className="text-gray-400">Competition</span>
              <span className="text-right">{match.competition}</span>
            </div>

            <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
              <span className="text-gray-400">Home Team</span>
              <span className="text-right">{match.home}</span>
            </div>

            <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
              <span className="text-gray-400">Away Team</span>
              <span className="text-right">{match.away}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Match Status</span>
              <span className="text-blue-400">{match.status_text}</span>
            </div>

          </div>
        </section>

        <p className="text-center text-gray-600 text-xs mt-8">
          Match data provided by SportScore.
        </p>

      </div>
    </main>
  )
}

export default FootballDetails
