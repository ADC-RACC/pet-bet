interface Props {
  title: string
}

function PageTitle({ title }: Props) {
  return (
    <>
      <div className="text-center">
        <h1 className="mb-4 mt-2 font-title text-4xl font-bold tracking-wide text-primary md:text-5xl xl:text-6xl">
          {title}
        </h1>
      </div>
    </>
  )
}

export default PageTitle
