import PageTitle from '@/components/PageTitle'
import useAddPet from '@/hooks/use-add-pet'
import { useState, FormEvent, ChangeEvent } from 'react'
import { Button } from '@/components/Button'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

function AddPet() {
  const addNewPet = useAddPet()

  const { user } = useAuth0()
  const navigate = useNavigate()

  const initialFormState = {
    ownerId: '',
    name: '',
    bio: '',
    wins: 0,
    losses: 0,
    imgUrl: '',
  }
  // console.log(user)
  const [formState, setFormState] = useState(initialFormState)

  const handleChange = (
    evt: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    await addNewPet.mutate({ ...formState, ownerId: `${user?.sub}` })
    navigate(`/owners/${user?.sub}`)
  }

  const handleClear = () => {
    setFormState(initialFormState)
  }

  return (
    <>
      <PageTitle title="Add A Pet" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={formState.name}
          className="border-solid border-2 border-black rounded-sm"
        ></input>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          onChange={handleChange}
          value={formState.bio}
          placeholder={
            formState.name === ''
              ? 'Tell us a little bit about your pet'
              : `Tell us a little bit about ${formState.name}`
          }
          rows={4}
          className="border-solid border-2 border-black rounded-sm"
        ></textarea>
        <Button onClick={handleSubmit}>Add</Button>
        <Button
          onClick={handleClear}
          variant="white"
          textColor="black"
          border="border"
        >
          Clear
        </Button>
      </form>
    </>
  )
}

export default AddPet
