interface Props {
  data: object
  column: string
  dataType: string
  description: string
}

export default function LeaderboardColumn({
  data,
  column,
  dataType,
  description,
}: Props) {
  return (
    <ul>
      {data[column].map((item) => (
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
