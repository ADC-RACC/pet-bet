import express from 'express'
import { getPetsByOwnerId } from '../db/functions/pets'

const router = express.Router()

// GET 'api/v1/owners/:ownerId/pets'
router.get('/:ownerId/pets', async (req, res) => {
  try {
    const pets = await getPetsByOwnerId(req.params.ownerId)
    if (pets.length) {
      res.json(pets)
    } else {
      res.status(404).json({ error: 'No pets found for this owner' })
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
