import type { Movie } from '@prisma/client'

import React from 'react'
import { Info } from 'lucide-react'
import { FaPlay } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

interface BillboardProps {
  movie: Movie
}

export const Billboard: React.FC<BillboardProps> = (props: BillboardProps) => {
  const { movie } = props

  return (
    <div className='relative h-screen md:h-[56.25vw] lg:h-[50vw]'>
      <video
        className='w-full h-full object-cover brightness-[60%]'
        src={movie.videoUrl}
        poster={movie.thumbnailUrl}
        loop
        autoPlay
        muted
      ></video>
      <div className='absolute top-[30%] md:top-[40%] left-10 md:left-20 lg:left-40'>
        <p className='text-white text-1xl md:text-5xl font-bold drop-shadow-xl'>
          {movie.title}
        </p>
        <p className='text-md text-white drop-shadow-xl mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%]'>
          {movie.description}
        </p>

        <div className='flex gap-3'>
          <Button className='pointer mt-3 md:mt-4' size='sm'>
            <FaPlay className='mr-1 w-4 h-4' /> Play
          </Button>
          <Button
            variant='secondary'
            className='pointer mt-3 md:mt-4'
            size='sm'
          >
            <Info size={16} className='mr-1' /> More Info
          </Button>
        </div>
      </div>
    </div>
  )
}
