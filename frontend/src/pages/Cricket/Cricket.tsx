
import { useState } from 'react'
import { Trophy, Radio, CalendarDays, CheckCircle } from 'lucide-react'
import LiveMatchCard from '../../components/cricket/LiveMatchCard'

function Cricket() {
  const [activeTab, setActiveTab] = useState('Live')

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
