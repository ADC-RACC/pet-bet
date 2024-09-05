import PageTitle from '@/components/PageTitle'
import PageSubTitle from '@/components/PageSubTitle'
import useLeaderboard from '@/hooks/use-leaderboard'
import LeaderboardColumn from '@/components/LeaderboardColumn'

function Leaderboard() {
  // TODO: add commas for large numbers e.g. 1,000,000
  // TODO: media queries
  const { data: leaderboard, isError, isPending } = useLeaderboard()

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>There was an error</p>
  return (
    <>
      <PageTitle title="The Big 5" />
      <div className="flex justify-between">
        <div className="w-72 ">
          <PageSubTitle
            subtitle="Most "
            subtitleColored="Losses"
            color="text-red"
          />
          <LeaderboardColumn
            column={leaderboard.losses}
            dataType="losses"
            description="losses"
          />
        </div>

        <div className="w-72">
          <PageSubTitle
            subtitle="Most "
            subtitleColored="Even Win/Loss"
            color="text-yellow"
          />
          <LeaderboardColumn
            column={leaderboard.winsAndLossesRatio}
            dataType="ratio"
            description="win/loss"
          />
        </div>
        <div className="w-72">
          <PageSubTitle
            subtitle="Most "
            subtitleColored="Wins"
            color="text-green"
          />
          <LeaderboardColumn
            column={leaderboard.wins}
            dataType="wins"
            description="wins"
          />
        </div>
      </div>
    </>
  )
}

export default Leaderboard
