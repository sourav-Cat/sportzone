
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Trophy, Activity } from 'lucide-react'
import CricketMatchCenter from '../../components/cricket/CricketMatchCenter'
import FootballMatchCenter from '../../components/football/FootballMatchCenter'

type SportTab = 'Cricket' | 'Football'

function LiveScores() {
  const [searchParams] = useSearchParams()

  const initialSport: SportTab =
    searchParams.get('sport') === 'football' ? 'Football' : 'Cricket'

  const [activeSport, setActiveSport] = useState<SportTab>(initialSport)

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        <div className="flex items-center gap-2 text-green-400 mb-4">
          <Activity size={20} />
          <span className="text-sm font-semibold tracking-widest uppercase">
            All Sports Coverage
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold">
          Live <span className="text-green-400">Scores</span>
        </h1>

        <p className="text-gray-400 mt-4">
          Follow all cricket and football matches in one place.
        </p>

        <div className="flex gap-3 mt-8">

          <button
            onClick={() => setActiveSport('Cricket')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
              activeSport === 'Cricket'
                ? 'bg-green-500 text-black'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Trophy size={18} />
            Cricket
          </button>

          <button
            onClick={() => setActiveSport('Football')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
              activeSport === 'Football'
                ? 'bg-green-500 text-black'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Activity size={18} />
            Football
          </button>

        </div>
      </section>

      {activeSport === 'Cricket' && <CricketMatchCenter />}

      {activeSport === 'Football' && <FootballMatchCenter />}

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <Link
          to="/"
          className="text-gray-400 hover:text-green-400 transition"
        >
          ← Back to Home
        </Link>
      </div>

    </main>
  )
}

export default LiveScores
