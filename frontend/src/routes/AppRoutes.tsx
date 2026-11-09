
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Home from '../pages/Home/Home'
import Cricket from '../pages/Cricket/Cricket'

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/football" element={<h1>Football Page</h1>} />
        <Route path="/live-scores" element={<h1>Live Scores Page</h1>} />
        <Route path="/news" element={<h1>Sports News Page</h1>} />
      </Routes>
    </>
  )
}
export default AppRoutes
