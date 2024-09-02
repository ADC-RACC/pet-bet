import * as Path from 'node:path'
import express from 'express'

import petRoutes from './routes/petRoutes'
import ownerRoutes from './routes/ownerRoutes'

const server = express()
server.use(express.json())

server.use('/api/v1/pets', petRoutes)
server.use('/api/v1/owners', ownerRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
