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
}

export const MovieList: React.FC<MovieListProps> = (props: MovieListProps) => {
  const { title, movies } = props

  return (
    <div className='px-10 md:px-20 lg:px-40 space-y-4'>
      <h1 className='text-xl font-bold capitalize'>{title}</h1>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full overflow-visible'
      >
        <CarouselContent overflowHidden={false}>
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className='md:basis-1/2 lg:basis-1/4 rounded-md'
            >
              <MovieCard movie={movie} isNew />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
