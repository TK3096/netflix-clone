import { Movie } from '@prisma/client'

import { Billboard } from '@/components/home/Billboard'

import { getRandomMovie } from '@/lib/data/movice'

const HomePage = async () => {
  const movie = await getRandomMovie()

  if (!movie) return null

  return <Billboard movie={movie} />
}

export default HomePage
