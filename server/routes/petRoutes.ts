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

//Updating wins and losses
router.patch('/:id/votes', async (req, res) => {
  try {
    const { wins, losses } = req.body
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.sendStatus(404)
      return
    }
    const updatedPet = { wins, losses }
    await db.updatePetById(updatedPet, id)
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
})

export default router

// GET /api/v1/pets/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderBoardData = await db.getLeaderBoardData()
    res.json(leaderBoardData)
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

// Getting Pet by Id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const pets = await db.getPetbyId(id)
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
