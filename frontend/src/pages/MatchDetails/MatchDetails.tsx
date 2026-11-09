
import { useParams } from 'react-router-dom'
import CricketDetails from './CricketDetails'
import FootballDetails from './FootballDetails'

function MatchDetails() {
  const { sport } = useParams()

  if (sport === 'cricket') {
    return <CricketDetails />
  }

  if (sport === 'football') {
    return <FootballDetails />
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <p>Invalid sport type.</p>
    </div>
  )
}

export default MatchDetails
