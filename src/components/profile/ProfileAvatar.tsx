'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

interface ProfileAvatarProps {
  name: string
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = (
  props: ProfileAvatarProps,
) => {
  const { name } = props

  const router = useRouter()

  const [mounted, setMounted] = useState(false)

  const randomGradient = Math.floor(Math.random() * 4)

  const gradientColors = [
    'from-blue-500 to-cyan-400',
    'from-emerald-600 to-emerald-300',
    'from-indigo-500 to-indigo-300',
    'from-pink-600 to-pink-300',
  ]

  const handleClick = () => {
    router.push('/')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className='w-[150px] h-[150px] rounded-md bg-zinc-500/40 animate-pulse' />
    )
  }

  return (
    <div
      className={cn(
        'w-[150px] h-[150px] rounded-md text-center cursor-pointer border-2 border-transparent hover:border-white transition-all duration-200',
        gradientColors[randomGradient],
      )}
      onClick={handleClick}
    >
      <div className='w-full h-full relative bg-gradient-to-b'>
        <div className='absolute w-3/4 px-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col'>
          <div className='flex justify-between'>
            <div className='bg-white rounded-full w-5 h-5' />
            <div className='bg-white rounded-full w-5 h-5' />
          </div>
          <div className='self-end mt-5 w-16 h-5 rounded-tl-0 rounded-tr-0 rounded-bl-[100px] rounded-br-[100px] border-transparent border-4 border-b-white' />
        </div>
      </div>
      <p className='text-md mt-4'>{name}</p>
    </div>
  )
}
