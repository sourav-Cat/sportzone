
import { Radio } from 'lucide-react'

interface LiveMatchCardProps {
  team1: string
  team2: string
  score1: string
  score2: string
  status: string
  format: string
}

function LiveMatchCard({
  team1,
  team2,
  score1,
  score2,
  status,
  format,
}: LiveMatchCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-green-500 transition">

      <div className="flex items-center justify-between mb-5">
        <span className="text-gray-400 text-sm">{format}</span>

        <span className="flex items-center gap-2 text-red-400 text-sm font-bold">
          <Radio size={16} />
          {status}
        </span>
      </div>

      <div className="space-y-4">

        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-lg">{team1}</span>
          <span className="text-green-400 font-bold">{score1}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-lg">{team2}</span>
          <span className="text-green-400 font-bold">{score2}</span>
        </div>

      </div>

      <div className="border-t border-slate-800 mt-5 pt-4">
        <p className="text-gray-400 text-xs">
          Match information
        </p>
      </div>

    </div>
  )
}

export default LiveMatchCard
