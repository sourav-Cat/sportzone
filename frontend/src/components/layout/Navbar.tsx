
import { NavLink, Link } from 'react-router-dom'
import { Trophy, Moon } from 'lucide-react'

function Navbar() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-green-400'
      : 'text-gray-300 hover:text-green-400 transition'

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <Trophy className="text-green-400" size={28} />
          <span className="text-2xl font-bold text-white">
            SPORT<span className="text-green-400">ZONE</span>
          </span>
        </Link>

        <div className="flex items-center gap-6 font-medium">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>

          <NavLink to="/cricket" className={navClass}>
            Cricket
          </NavLink>

          <NavLink to="/football" className={navClass}>
            Football
          </NavLink>

          <NavLink to="/live-scores" className={navClass}>
            Live Scores
          </NavLink>

          <NavLink to="/news" className={navClass}>
            News
          </NavLink>
        </div>

        <button className="text-gray-300 hover:text-green-400">
          <Moon size={22} />
        </button>

      </div>
    </nav>
  )
}

export default Navbar
