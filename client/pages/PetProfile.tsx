import useProfile from '@/hooks/use-profile'
import { useParams } from 'react-router-dom'

function PetProfile() {
  const { id } = useParams()
  const { data, isPending, isError, error } = useProfile(Number(id))

  if (isPending) {
    return <p>Loading ...</p>
  }
  if (isError) {
    console.error(error.message)
    return <p>Error!</p>
  }
  if (data === null) {
    return 'PLACEHOLDER NULL ERROR'
  }
  return (
    <>
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
        <div className="w-96 h-96 bg-gray-300 flex items-center justify-center">
          <img
            src={data.imgUrl}
            alt="Profile of pet"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-bold tracking-wide">{data.name}</h1>
          <p className="text-xl text-gray-700">{data.bio}</p>
          <div className="text-2xl">
            <p>
              <span className="font-semibold">Win/Loss Ratio: </span>
              {(data.wins / data.losses).toFixed(3)}
            </p>
            <p>{data.wins.toLocaleString()} wins</p>
            <p>{data.losses.toLocaleString()} losses</p>
          </div>
          <div>
            <a
              href="/owners-profile"
              className="text-blue-600 underline text-xl"
            >
              Owner&apos;s profile
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default PetProfile
