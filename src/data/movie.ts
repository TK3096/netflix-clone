import { db } from '@/lib/db'

export const getMovieById = async (id: string) => {
  try {
    const movie = await db.movie.findUnique({
      where: {
        id,
      },
    })

    return movie
  } catch (err) {
    return null
  }
}

export const getRandomMovie = async () => {
  try {
    const count = await db.movie.count()
    const randomIndex = Math.floor(Math.random() * count)
    const movie = await db.movie.findMany({
      skip: randomIndex,
      take: 1,
    })

    return movie[0]
  } catch {
    return null
  }
}

export const getNewTrendingMovies = async () => {
  try {
    const movies = await db.movie.findMany({
      take: 4,
    })

    return movies
  } catch {
    return []
  }
}

export const getMovies = async () => {
  try {
    const movies = await db.movie.findMany()

    return movies
  } catch {
    return []
  }
}

export const getFavoriteMovies = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) return []

    const movies = await db.movie.findMany({
      where: {
        id: {
          in: user.favoriteIds,
        },
      },
    })

    return movies
  } catch {
    return []
  }
}

export const addFavorite = async (userId: string, movieId: string) => {
  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    })

    return true
  } catch {
    return false
  }
}
