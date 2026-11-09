
import { Link } from 'react-router-dom'
import { Trophy, Activity, Newspaper } from 'lucide-react'
import NewsSection from '../../components/news/NewsSection'
import CricketMatchCenter from '../../components/cricket/CricketMatchCenter.tsx'
import FootballMatchCenter from '../../components/football/FootballMatchCenter.tsx'

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

      {/* Cricket Matches */}
      <CricketMatchCenter limit={6}/>

      {/* Football Matches */}
      <FootballMatchCenter limit={6} />

      {/* Sports News */}
      <NewsSection />

    </main>
  )
}

export default Home
