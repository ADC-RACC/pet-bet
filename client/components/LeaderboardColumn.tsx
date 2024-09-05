import {
  LeaderboardLoss,
  LeaderboardRatio,
  LeaderboardWin,
} from '@models/leaderboard'

interface Props {
  column: LeaderboardRatio[] | LeaderboardWin[] | LeaderboardLoss[]
  dataType: 'ratio' | 'wins' | 'losses'
  description: string
}

export default function LeaderboardColumn({
  column,
  dataType,
  description,
}: Props) {
  return (
    <ul>
      {column.map((item) => (
        <li
          key={item.id}
          className="border-solid border-border border-2 pt-3 pb-3 pl-3 rounded-sm"
        >
          <p className="font-bold text-xl">{item.name}</p>
          <p>
            {dataType === 'ratio' ? item[dataType].toFixed(3) : item[dataType]}{' '}
            {description}
          </p>
        </li>
      ))}
    </ul>
  )
}
