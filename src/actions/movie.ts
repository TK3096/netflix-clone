'use server'

import {
  addFavorite as _addFavorite,
  getMovieById,
  getFavoriteMovies as _getFavoriteMovies,
} from '@/data/movie'

export const addFavorite = async (userId: string, movieId: string) => {
  const result = await _addFavorite(userId, movieId)

  if (!result) {
    return { error: 'Fail to add favorite' }
  }

  return { success: 'Successfully added favorite' }
}

export const getMovie = async (id: string) => {
  const movie = await getMovieById(id)

  if (!movie) {
    return { error: 'Movie not found' }
  }

  return { success: movie }
}

export const getFavoriteMovies = async (userId: string) => {
  const movies = await _getFavoriteMovies(userId)

  if (!movies) {
    return { error: 'Movies not found' }
  }

  return { success: movies }
}
