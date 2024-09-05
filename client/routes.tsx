import { Route, createRoutesFromElements } from 'react-router-dom'

import App from '@/components/layout/App'
import Home from '@/pages/Home'
import Leaderboard from '@/pages/Leaderboard.tsx'
import Pet from '@/pages/PetProfile'
import Random from '@/pages/Random.tsx'
import Owner from '@/pages/Owner'
import AddPet from '@/pages/AddPet'
import NotFound from '@/pages/NotFound'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/pets/:id" element={<Pet />} />
    <Route path="/random" element={<Random />} />
    <Route path="/leaderboard" element={<Leaderboard />} />
    <Route path="/owners/:ownerId" element={<Owner />} />
    <Route path="/add-pet" element={<AddPet />} />
    <Route path="*" element={<NotFound />} />
  </Route>,
)
