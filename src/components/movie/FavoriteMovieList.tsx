import type { Movie } from '@prisma/client'

import React from 'react'
import { MovieCard } from './MovieCard'

interface FavoriteMovieListProps {
  movies: Movie[]
}

export const FavoriteMovieList: React.FC<FavoriteMovieListProps> = (
  props: FavoriteMovieListProps,
) => {
  const { movies } = props

  return (
    <div className='h-full'>
      <h1 className='text-2xl font-bold'>My List</h1>
      <div className='grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} hideAction />
        ))}
      </div>
    </div>
  )
}
