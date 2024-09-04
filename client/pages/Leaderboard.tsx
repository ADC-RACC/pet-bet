import PageTitle from '@/components/PageTitle'
import PageSubTitle from '@/components/PageSubTitle'
import useLeaderboard from '@/hooks/use-leaderboard'

function Leaderboard() {
  const { data: leaderboard, isError, isPending } = useLeaderboard()

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>There was an error</p>
  return (
    <>
      <PageTitle title="The Big 5" />
      <div className="flex">
        <div>
          <PageSubTitle
            subtitle="Most "
            subtitleColored="Losses"
            color="text-red"
          />
          <h2>Losses</h2>
          <ul>
            {leaderboard.losses.map((losses) => (
              <li
                key={losses.id}
                className="border-solid border-border border-2"
              >
                <p>{losses.name}.</p>
                <p>{losses.losses} evil points.</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>
            Most <span>Even Win/Loss</span>!
          </h2>
          <ul>
            {leaderboard.winsAndLossesRatio.map((winLoss) => (
              <li
                key={winLoss.id}
                className="border-solid border-border border-2"
              >
                <p>{winLoss.name}.</p>
                <p>{winLoss.ratio} good/evil ratio.</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>
            Most <span>Wins</span>!
          </h2>
          <ul>
            {leaderboard.wins.map((wins) => (
              <li key={wins.id} className="border-solid border-border border-2">
                <p>{wins.name}.</p>
                <p>{wins.wins} good points.</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Leaderboard
