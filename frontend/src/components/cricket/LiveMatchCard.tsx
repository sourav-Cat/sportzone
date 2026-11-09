
import { Radio } from 'lucide-react'
import type { Match } from '../../types/match'
import { Link } from 'react-router-dom'

interface LiveMatchCardProps {
  match: Match
  sport: 'cricket' | 'football'
}

function LiveMatchCard({ match, sport }: LiveMatchCardProps) {
  const matchTime = new Date(match.time).toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const pathParts = match.url.split('/').filter(Boolean)

const slug =
  sport === 'football' && pathParts.length >= 4
    ? pathParts[pathParts.length - 2]
    : pathParts[pathParts.length - 1]

  console.log('SPORT:', sport)
  console.log('MATCH URL:', match.url)
  console.log('MATCH SLUG:', slug)

  return (
    <Link
      to={slug ? `/match/${sport}/${slug}` : '#'}
      onClick={(event) => {
        if (!slug) event.preventDefault()
      }}
      className="block bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-green-500 transition"
    >
      <div className="flex justify-between items-center gap-2 mb-4">
        <span className="text-gray-400 text-xs">
          {match.competition}
        </span>

        <span className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase">
          <Radio size={14} />
          {match.status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={match.home_logo}
              alt={match.home}
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-bold">
              {match.home}
            </span>
          </div>

          <span className="text-green-400 font-bold">
            {match.home_score}
          </span>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={match.away_logo}
              alt={match.away}
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-bold">
              {match.away}
            </span>
          </div>

          <span className="text-green-400 font-bold">
            {match.away_score}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-800 mt-5 pt-4 flex justify-between gap-3">
        <p className="text-gray-400 text-xs">
          {match.status_text}
        </p>

        <p className="text-gray-400 text-xs whitespace-nowrap">
          {matchTime}
        </p>
      </div>
    </Link>
  )
}

export default LiveMatchCard

