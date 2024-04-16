'use client'

import type { Movie } from '@prisma/client'

import React, { useEffect, useState, useTransition } from 'react'
import { FaPlay, FaPlus, FaCheck } from 'react-icons/fa'

import { getMovie, getFavoriteMovies, addFavorite } from '@/actions/movie'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import { useModal } from '@/hooks/useModal'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export const MovieInfoModal: React.FC = () => {
  const [isPending, startTransition] = useTransition()

  const [movie, setMovie] = useState<Movie | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const user = useCurrentUser()
  const { type, open, onClose, data } = useModal()

  const isOpen = type === 'movieInfo' && open
  const movieId = data?.movieId

  const handleClose = () => {
    onClose()
  }

  const handleAddFavorite = () => {
    startTransition(async () => {
      try {
        const res = await addFavorite(user?.id!, movieId!)

        if (res?.error) {
          toast(res.error)
        }

        if (res?.success) {
          toast(res.success)
          setIsFavorite(true)
        }
      } catch {
        toast('Something went wrong')
      }
    })
  }

  useEffect(() => {
    const fetchMovie = async (id: string) => {
      const res = await getMovie(id)

      if (res?.success) {
        setMovie(res.success)
      }
    }

    const fetchFavorite = async (userId: string) => {
      const res = await getFavoriteMovies(userId)

      if (res?.success) {
        const existingMovie = res.success.find((m) => m.id === movieId)

        if (existingMovie) {
          setIsFavorite(true)
        }
      }
    }

    if (movieId && user) {
      fetchMovie(movieId)
      fetchFavorite(user.id!)
    }
  }, [movieId, user])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden w-3/4'>
        <div className='bg-neutral-900'>
          <div className='relative'>
            <video
              src={movie?.videoUrl}
              poster={movie?.thumbnailUrl}
              muted
              loop
              autoPlay
              className='w-full h-full'
            ></video>
            <div className='absolute bottom-20 left-10 space-y-6'>
              <p className='text-2xl font-bold drop-shadow-lg'>
                {movie?.title}
              </p>
              <div className='flex items-center gap-4'>
                <Button>
                  <FaPlay className='w-5 h-5 mr-1' /> Play
                </Button>
                {!isFavorite && (
                  <button
                    className='w-10 h-10 rounded-full border-2 border-white bg-transparent hover:bg-zinc-400/50 flex justify-center items-center'
                    onClick={handleAddFavorite}
                  >
                    <FaPlus className='text-white' size={20} />
                  </button>
                )}
                {isFavorite && (
                  <button className='w-10 h-10 rounded-full border-2 border-white bg-transparent hover:bg-zinc-400/50 flex justify-center items-center'>
                    <FaCheck className='text-green-400' size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='space-y-2 px-16 py-8'>
            <p>{movie?.duration} minutes</p>
            <p>{movie?.genres.join(', ')}</p>
            <p>{movie?.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
