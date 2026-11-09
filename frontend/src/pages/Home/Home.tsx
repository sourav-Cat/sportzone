
import { Link } from 'react-router-dom'
import { Trophy, Activity, Newspaper } from 'lucide-react'
import LiveMatchCard from '../../components/cricket/LiveMatchCard'

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">

          <div className="flex items-center gap-2 text-green-400 mb-6">
            <Activity size={20} />
            <span className="font-semibold tracking-widest uppercase text-sm">
              Your Ultimate Sports Destination
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            EVERY MATCH.
            <br />
            EVERY SCORE.
            <br />
            <span className="text-green-400">EVERY MOMENT.</span>
          </h1>

          <p className="text-gray-400 text-lg mt-6 leading-relaxed">
            Stay updated with live cricket scores, football updates,
            match statistics and the latest sports news.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/cricket"
              className="flex items-center gap-2 bg-green-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-400"
            >
              <Trophy size={20} />
              Explore Cricket
            </Link>

            <Link
              to="/news"
              className="flex items-center gap-2 border border-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-800"
            >
              <Newspaper size={20} />
              Latest News
            </Link>

          </div>
        </div>
      </section>

      {/* Live Cricket Matches */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            Live Cricket <span className="text-green-400">Matches</span>
          </h2>

          <Link
            to="/cricket"
            className="text-green-400 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <LiveMatchCard
            team1="Bangladesh"
            team2="India"
            score1="245/6"
            score2="Yet to bat"
            status="DEMO"
            format="ODI"
          />

          <LiveMatchCard
            team1="Australia"
            team2="England"
            score1="180/4"
            score2="Yet to bat"
            status="DEMO"
            format="T20"
          />

          <LiveMatchCard
            team1="Pakistan"
            team2="Sri Lanka"
            score1="120/3"
            score2="Yet to bat"
            status="DEMO"
            format="TEST"
          />

        </div>

        <p className="text-gray-500 text-xs mt-4">
          Demo data only — Not real-time scores.
        </p>

      </section>

    </main>
  )
}

export default Home
