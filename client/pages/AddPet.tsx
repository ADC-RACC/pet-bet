import PageTitle from '@/components/PageTitle'
import useAddPet from '@/hooks/use-add-pet'
import { useState, FormEvent, ChangeEvent } from 'react'
import { Button } from '@/components/Button'

function AddPet() {
  const addNewPet = useAddPet()

  const initialFormState = {
    ownerId: '',
    name: '',
    bio: '',
    wins: 0,
    losses: 0,
    imgUrl: '',
  }

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
    await addNewPet.mutate(formState)
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
        ></input>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          onChange={handleChange}
          value={formState.bio}
          placeholder={`Tell us a little bit about ${formState.name}`}
          rows={4}
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
