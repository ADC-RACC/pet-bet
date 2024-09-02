import express from 'express'

import * as db from '../db/functions/pets'

const router = express.Router()

// GET /api/v1/random
router.get('/random', async (req, res) => {
  try {
    const { count } = req.query
    const pets = await db.getRandomPets(Number(count))
    res.json(pets)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('unknown error')
    }
    res.status(500).json({
      error: `Something went wrong.`,
    })
  }
})

router.patch(
  '/:id/votes', // votes because
  async (req, res) => {
    try {
      const { wins, losses } = req.body // Just editing wins and losses only
      const id = Number(req.params.id)
      const updatedPet = { wins, losses }
      await db.updatePetById(updatedPet, id)
      console.log()
      res.sendStatus(204)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('unknown error')
      }
      res.status(500).json({
        error: `Something went wrong.`,
      })
    }
  },
)

export default router
