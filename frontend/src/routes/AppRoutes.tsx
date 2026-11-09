
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Home from '../pages/Home/Home'
import Cricket from '../pages/Cricket/Cricket'
import Football from '../pages/Football/Football'
import News from '../pages/News/News'
import LiveScores from '../pages/LiveScores/LiveScores'
import MatchDetails from '../pages/MatchDetails/MatchDetails'

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/football" element={<Football />} />
        <Route path="/live-scores" element={<LiveScores />} />
        <Route path="/news" element={<News />} />
        <Route path="/match/:sport/:slug" element={<MatchDetails />} />
      </Routes>
    </>
  )
}
export default AppRoutes
