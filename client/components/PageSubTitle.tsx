interface Props {
  subtitle: string
  subtitleColored: string
  color: string
}

function PageTitle({ subtitle, subtitleColored, color }: Props) {
  return (
    <>
      <h2 className="mb-4 mt-2 font-title text-2xl font-bold tracking-wide text-primary md:text-3xl xl:text-4xl">
        {subtitle}
        <span className={`${color}`}>{subtitleColored}</span>
      </h2>
    </>
  )
}

export default PageTitle
