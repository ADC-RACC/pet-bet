import useProfile from '@/hooks/use-profile'
import { Link, useParams } from 'react-router-dom'

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
    return (
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4 text-gray-700">
          Woofsies! The goodest pet you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-black rounded-full hover:bg-blue-600 transition"
        >
          Go back home
        </Link>
      </div>
    )
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
            <p>{data.wins} wins</p>
            <p>{data.losses} losses</p>
          </div>
          <div>
            <Link
              className="text-blue-600 underline text-xl"
              to={`/owners/${data.ownerId}`}
            >
              Owner Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default PetProfile
