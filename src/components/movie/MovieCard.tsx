'use client'

import type { Movie } from '@prisma/client'

import React, { useTransition, useState } from 'react'
import Image from 'next/image'
import { FaPlay, FaPlus, FaCheck } from 'react-icons/fa'
import dayjs from 'dayjs'
import { useCurrentUser } from '@/hooks/useCurrentUser'

import { addFavorite } from '@/actions/movie'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface MovieCardProps {
  movie: Movie
  isNew?: boolean
  isFavorite?: boolean
  hideAction?: boolean
}

export const MovieCard: React.FC<MovieCardProps> = (props: MovieCardProps) => {
  const { movie, isNew = false, isFavorite = false, hideAction = false } = props

  const [isPending, startTransition] = useTransition()
  const [added, setAdded] = useState(isFavorite)

  const user = useCurrentUser()

  const handleAddFavorite = () => {
    startTransition(async () => {
      try {
        const res = await addFavorite(user?.id!, movie.id)

        if (res?.error) {
          toast.error(res.error)
        }

        if (res?.success) {
          setAdded(true)
          toast.success(res.success)
        }
      } catch (error) {
        toast.error('Something went wrong')
      }
    })
  }

  return (
    <div className='relative bg-zinc-900 rounded-md w-full h-[40vw] md:h-[20vw] lg:h-[12vw] group scale-100 hover:scale-125 transition duration-200 hover:z-50'>
      <div className='relative w-full h-full cursor-pointer opacity-100 group-hover:opacity-0 transition duration-150'>
        <Image
          src={movie.thumbnailUrl}
          alt={movie.title}
          fill
          className='object-cover'
        />
      </div>
      <div className='absolute z-50 top-0 w-full h-[40vw] md:h-[20vw] lg:h-[12vw] invisible group-hover:visible group-hover:-translate-y-[30vw] md:group-hover:-translate-y-[14vw] lg:group-hover:-translate-y-[6vw] transition duration-200'>
        <div className='relative w-full h-full rounded-md overflow-hidden'>
          <Image
            src={movie.thumbnailUrl}
            alt={movie.title}
            fill
            className='object-cover'
          />
        </div>
        <div className='px-4 py-2 space-y-2'>
          <div className='flex gap-2'>
            <Button size='icon' className='rounded-full w-8 h-8'>
              <FaPlay className='w-4 h-4' />
            </Button>
            {!added && !hideAction && (
              <Button
                onClick={handleAddFavorite}
                size='icon'
                className='rounded-full w-8 h-8 bg-transparent border-2 hover:bg-zinc-500'
              >
                <FaPlus className='w-4 h-4 text-white' />
              </Button>
            )}
            {added && !hideAction && (
              <Button
                size='icon'
                className='rounded-full w-8 h-8 bg-transparent border-2 bg-neutral-800 hover:bg-neutral-800'
              >
                <FaCheck className='w-4 h-4 text-green-400' />
              </Button>
            )}
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
