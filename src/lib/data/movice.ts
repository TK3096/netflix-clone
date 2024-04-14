import { db } from '@/lib/db'

export const getRandomMovie = async () => {
  try {
    const total = await db.movie.count()
    const randomIndex = Math.floor(Math.random() * total)

    const movie = await db.movie.findMany({
      take: 1,
      skip: randomIndex,
    })

    return movie[0]
  } catch (err) {
    return null
  }
}
