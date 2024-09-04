import PageTitle from '@/components/PageTitle'
import useLeaderboard from '@/hooks/use-leaderboard'
import { useNavigate } from 'react-router-dom'

function Leaderboard() {
  const { data: leaderboard, isError, isPending } = useLeaderboard()

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>There was an error</p>
  return (
    <>
      <PageTitle title="Leaderboard" />
      <div>
        <h2>
          Most <span>Losses</span>!
        </h2>
        <ul>
          {leaderboard.losses.map((losses) => (
            <li key={losses.id}>
              <p>{losses.name}.</p>
              <p>{losses.losses} evil points.</p>
            </li>
          ))}
        </ul>
        <h2>
          Most <span>Even Win/Loss</span>!
        </h2>
        <ul>
          {leaderboard.winsAndLossesRatio.map((winLoss) => (
            <li key={winLoss.id}>
              <p>{winLoss.name}.</p>
              <p>{winLoss.ratio} good/evil ratio.</p>
            </li>
          ))}
        </ul>
        <h2>
          Most <span>Wins</span>!
        </h2>
        <ul>
          {leaderboard.wins.map((wins) => (
            <li key={wins.id}>
              <p>{wins.name}.</p>
              <p>{wins.wins} good points.</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Leaderboard
