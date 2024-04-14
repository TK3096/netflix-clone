'use client'

import React from 'react'
import { Movie } from '@prisma/client'
import { Info } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface BillboardProps {
  movie: Movie
}

export const Billboard: React.FC<BillboardProps> = (props: BillboardProps) => {
  const { movie } = props

  return (
    <div className='relative h-[56.25vh]'>
      <video
        className='w-full h-full object-cover'
        poster={movie.thumbnailUrl}
        src={movie.videoUrl}
        loop
        autoPlay
        muted
      ></video>
      <div className='absolute top-[40%] md:top-[30%] ml-4 md:ml-16'>
        <p className='text-white text-xl md:text-5xl lg:text-6xl md:w-[50%] font-bold drop-shadow-xl'>
          {movie.title}
        </p>
        <p className='text-white mt-3 mb-3 md:mt-8 w-full md:w-[80%] drop-shadow-xl'>
          {movie.description}
        </p>
        <Button variant='secondary' className='font-bold'>
          <Info size={16} className='mr-2' />
          More Info
        </Button>
      </div>
    </div>
  )
}
