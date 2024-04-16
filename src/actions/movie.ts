'use server'

import { addFavorite as _addFavorite } from '@/data/movie'

export const addFavorite = async (userId: string, movieId: string) => {
  const result = await _addFavorite(userId, movieId)

  if (!result) {
    return { error: 'Fail to add favorite' }
  }

  return { success: 'Successfully added favorite' }
}
