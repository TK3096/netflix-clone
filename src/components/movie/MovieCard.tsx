import type { Movie } from '@prisma/client'

import React from 'react'
import Image from 'next/image'
import { FaPlay, FaPlus } from 'react-icons/fa'
import dayjs from 'dayjs'

import { Button } from '@/components/ui/button'

interface MovieCardProps {
  movie: Movie
  isNew?: boolean
}

export const MovieCard: React.FC<MovieCardProps> = (props: MovieCardProps) => {
  const { movie, isNew } = props

  return (
    <div className='relative bg-zinc-900 rounded-md w-full h-[40vw] md:h-[20vw] lg:h-[12vw] group scale-100 hover:scale-125 transition duration-200 hover:z-50'>
      <div className='relative w-full h-full cursor-pointer opacity-100 group-hover:opacity-0 transition duration-150'>
        <Image
          src={movie.thumbnailUrl}
          alt={movie.title}
          fill
          objectFit='cover'
        />
      </div>
      <div className='absolute z-50 top-0 w-full h-[40vw] md:h-[20vw] lg:h-[12vw] invisible group-hover:visible group-hover:-translate-y-[30vw] md:group-hover:-translate-y-[14vw] lg:group-hover:-translate-y-[6vw] transition duration-200'>
        <div className='relative w-full h-full rounded-md overflow-hidden'>
          <Image
            src={movie.thumbnailUrl}
            alt={movie.title}
            fill
            objectFit='cover'
          />
        </div>
        <div className='px-4 py-2 space-y-2'>
          <div className='flex gap-2'>
            <Button size='icon' className='rounded-full w-8 h-8'>
              <FaPlay className='w-4 h-4' />
            </Button>
            <Button
              size='icon'
              className='rounded-full w-8 h-8 bg-transparent border-2 hover:bg-zinc-500'
            >
              <FaPlus className='w-4 h-4 text-white' />
            </Button>
          </div>

          <p className='text-white text-md'>
            {isNew && (
              <span className='text-green-400 font-semibold mr-2'>New</span>
            )}
            {dayjs(movie.releaseDate).year()}
            <span className='ml-2 text-[10px] text-muted-foreground'>
              ({movie.duration} minutes)
            </span>
          </p>

          <p className='text-white text-sm whitespace-nowrap'>
            {movie.genres.join(', ')}
          </p>
        </div>
      </div>
    </div>
  )
}
