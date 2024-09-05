import PageTitle from '@/components/PageTitle'
import PageSubTitle from '@/components/PageSubTitle'
import useLeaderboard from '@/hooks/use-leaderboard'
import LeaderboardColumn from '@/components/LeaderboardColumn'

function Leaderboard() {
  // TODO: add commas for large numbers e.g. 1,000,000
  // TODO: switch case to use colors from tailwind config
  // TODO: media queries
  // TODO: overlap of borders
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
            column="losses"
            dataType="losses"
            description="losses"
            data={leaderboard}
          />
        </div>

        <div className="w-72">
          <PageSubTitle
            subtitle="Most "
            subtitleColored="Even Win/Loss"
            color="text-yellow"
          />
          <LeaderboardColumn
            column="winsAndLossesRatio"
            dataType="ratio"
            description="win/loss"
            data={leaderboard}
          />
        </div>
        <div className="w-72">
          <PageSubTitle
            subtitle="Most "
            subtitleColored="Wins"
            color="text-green"
          />
          <LeaderboardColumn
            column="wins"
            dataType="wins"
            description="wins"
            data={leaderboard}
          />
        </div>
      </div>
    </>
  )
}

export default Leaderboard
