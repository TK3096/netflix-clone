import type { Movie } from '@prisma/client'

import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { MovieCard } from '@/components/movie/MovieCard'

interface MovieListProps {
  title: string
  movies: Movie[]
  favoriteIds: string[]
  isNew?: boolean
}

export const MovieList: React.FC<MovieListProps> = (props: MovieListProps) => {
  const { title, movies, isNew = false, favoriteIds } = props

  return (
    <div className='px-10 md:px-20 lg:px-40 space-y-4'>
      <h1 className='text-xl font-bold capitalize'>{title}</h1>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent overflowHidden={false}>
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className='md:basis-1/2 lg:basis-1/4 rounded-md'
            >
              <MovieCard
                movie={movie}
                isNew={isNew}
                isFavorite={favoriteIds.includes(movie.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant='ghost' />
        <CarouselNext variant='ghost' />
      </Carousel>
    </div>
  )
}
