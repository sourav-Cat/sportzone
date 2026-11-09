
import { Link } from 'react-router-dom'
import { Trophy, Moon, Sun } from 'lucide-react'

function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <Trophy className="text-green-400" size={28} />
          <span className="text-2xl font-bold text-white">
            SPORT<span className="text-green-400">ZONE</span>
          </span>
        </Link>

        <div className="flex items-center gap-6 text-gray-300 font-medium">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/cricket" className="hover:text-green-400">Cricket</Link>
          <Link to="/football" className="hover:text-green-400">Football</Link>
          <Link to="/live-scores" className="hover:text-green-400">Live Scores</Link>
          <Link to="/news" className="hover:text-green-400">News</Link>
        </div>

        <button className="text-gray-300 hover:text-green-400">
          <Moon size={22} />
        </button>

      </div>
    </nav>
  )
}

export default Navbar
