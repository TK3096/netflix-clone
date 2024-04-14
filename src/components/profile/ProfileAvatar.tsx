'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { cn } from '@/lib/utils'

interface ProfileAvatarProps {
  name: string
  image?: string
  size?: 'sm' | 'md'
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = (
  props: ProfileAvatarProps,
) => {
  const { name, size = 'md', image } = props

  const router = useRouter()

  const [mounted, setMounted] = useState(false)

  const avatarSize = size === 'sm' ? 'w-[30px] h-[30px]' : 'w-[150px] h-[150px]'
  const eyeSize = size === 'sm' ? 'w-1 h-1' : 'w-5 h-5'

  let simleStyle = 'w-16 h-6 mt-5 border-4'

  if (size === 'sm') {
    simleStyle = 'w-[10px] h-[10px] mt-0 border-2'
  }

  const handleClick = () => {
    router.push('/')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn('rounded-md bg-zinc-500/40 animate-pulse', avatarSize)}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-md overflow-hidden text-center cursor-pointer border-2 border-transparent from-blue-500 to-cyan-400',
        avatarSize,
        size !== 'sm' && 'hover:border-white transition-all duration-200',
      )}
      onClick={handleClick}
    >
      {!image && (
        <div className='w-full h-full relative bg-gradient-to-b'>
          <div className='absolute w-3/4 px-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col'>
            <div className='flex justify-between'>
              <div className={cn('bg-white rounded-full', eyeSize)} />
              <div className={cn('bg-white rounded-full', eyeSize)} />
            </div>
            <div
              className={cn(
                'self-end rounded-tl-0 rounded-tr-0 rounded-bl-[100px] rounded-br-[100px] border-transparent border-b-white',
                simleStyle,
              )}
            />
          </div>
        </div>
      )}
      {image && <Image src={image} alt={name} width={150} height={150} />}
      {size !== 'sm' && <p className='text-md mt-4'>{name}</p>}
    </div>
  )
}
