
import { useState } from 'react'
import { Trophy, Radio, CalendarDays, CheckCircle } from 'lucide-react'
import LiveMatchCard from '../../components/cricket/LiveMatchCard'

const tournaments = [
  'International Cricket',
  'Bangladesh Premier League (BPL)',
  'Dhaka Premier League (DPL)',
  'Abu Dhabi T10',
  'Indian Premier League (IPL)',
  'ICC Tournaments',
]
function Cricket() {
  const [activeTab, setActiveTab] = useState('Live')
  const [activeTournament, setActiveTournament] = useState('International Cricket')

  const tabs = [
    { name: 'Live', icon: Radio },
    { name: 'Upcoming', icon: CalendarDays },
    { name: 'Completed', icon: CheckCircle },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-3 mb-3">
          <Trophy className="text-green-400" size={30} />
          <h1 className="text-4xl font-bold">
            Cricket Dashboard
          </h1>
        </div>

        <p className="text-gray-400 mb-10">
          Follow cricket matches, scores and upcoming fixtures.
        </p>
        <section className="mb-10">
  <h2 className="text-2xl font-bold mb-5">
    Cricket <span className="text-green-400">Tournaments</span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {tournaments.map((tournament) => (
      <button
  key={tournament}
  onClick={() => setActiveTournament(tournament)}
  className={`text-left border rounded-xl p-5 transition w-full ${
    activeTournament === tournament
      ? 'bg-green-500/10 border-green-500'
      : 'bg-slate-900 border-slate-800 hover:border-green-500'
  }`}
>
  <h3 className="text-white font-semibold">
    {tournament}
  </h3>

  {activeTournament === tournament && (
    <p className="text-green-400 text-xs mt-2">
      Selected Tournament
    </p>
  )}
</button>
    ))}
  </div>
</section>
<div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8">
  <p className="text-gray-400 text-sm">
    Currently Selected Tournament
  </p>

  <h2 className="text-2xl font-bold text-green-400 mt-2">
    {activeTournament}
  </h2>
</div>

        {/* Match Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">

          {tabs.map((tab) => {
            const Icon = tab.icon

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition ${
                  activeTab === tab.name
                    ? 'bg-green-500 text-black'
                    : 'bg-slate-900 text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            )
          })}

        </div>

        {/* Match Cards */}
   {activeTab === 'Live' && (
  activeTournament === 'International Cricket' ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <LiveMatchCard
        team1="Bangladesh"
        team2="India"
        score1="245/6"
        score2="Yet to bat"
        status="DEMO"
        format="ODI"
      />
    </div>
  ) : (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
      <h2 className="text-xl font-bold text-green-400">
        {activeTournament}
      </h2>
      <p className="text-gray-400 mt-3">
        No match data available yet.
      </p>
    </div>
  )
)}

        {activeTab === 'Upcoming' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-bold text-green-400">
              Upcoming Matches
            </h2>
            <p className="text-gray-400 mt-3">
              Upcoming match fixtures will appear here.
            </p>
          </div>
        )}

        {activeTab === 'Completed' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-bold text-green-400">
              Completed Matches
            </h2>
            <p className="text-gray-400 mt-3">
              Completed match results will appear here.
            </p>
          </div>
        )}

        <p className="text-gray-500 text-xs mt-6">
          Demo data only — Not real-time scores.
        </p>

      </div>

    </main>
  )
}

export default Cricket
