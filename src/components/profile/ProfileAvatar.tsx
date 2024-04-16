import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

interface ProfileAvatarProps {
  name: string
  image?: string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = (
  props: ProfileAvatarProps,
) => {
  const { image, name, size = 'lg', onClick } = props

  let boxStyle = ''
  let leftEyeStyle = ''
  let rightEyeStyle = ''
  let mouthStyle = ''
  let hoverStyle = ''

  if (typeof onClick !== 'undefined') {
    hoverStyle = 'group-hover:border-white transition-all duration-200'
  }

  switch (size) {
    case 'sm':
      boxStyle = 'w-[25px] h-[25px]'
      leftEyeStyle = 'w-1 h-1 left-1 top-1'
      rightEyeStyle = 'w-1 h-1 right-1 top-1'
      mouthStyle = ' w-2/4 h-1 bottom-1 border-[3px]'
      break
    case 'lg':
      boxStyle = 'w-[150px] h-[150px]'
      leftEyeStyle = 'w-[18px] h-[18px] left-4 top-6'
      rightEyeStyle = 'w-[18px] h-[18px] right-4 top-6'
      mouthStyle = 'w-2/4 h-5 bottom-10 border-4'
      break
    default:
      boxStyle = 'w-[80px] h-[80px]'
      leftEyeStyle = 'w-3 h-3 left-3 top-5'
      rightEyeStyle = 'w-3 h-3 right-3 top-5'
      mouthStyle = ' w-2/4 h-3 bottom-5 border-[3px]'
  }

  return (
    <div
      className='flex flex-col justify-center items-center gap-2 w-fit group cursor-pointer'
      onClick={onClick}
    >
      <div
        className={cn(
          'bg-gradient-to-b from-blue-500 to-cyan-400 rounded-md overflow-hidden border-2',
          boxStyle,
          hoverStyle,
        )}
      >
        {!image && (
          <div className='h-full w-full relative'>
            <div
              className={cn('absolute bg-white rounded-full', leftEyeStyle)}
            ></div>
            <div
              className={cn('absolute bg-white rounded-full', rightEyeStyle)}
            ></div>
            <div
              className={cn(
                'absolute rounded-tl-0 rounded-tr-0 rounded-bl-[100px] rounded-br-[100px] border-white border-t-transparent left-[40%]',
                mouthStyle,
              )}
            ></div>
          </div>
        )}
        {image && (
          <div className='relative h-full w-full'>
            <Image src={image} alt={name} fill />
          </div>
        )}
      </div>
      {size === 'lg' && (
        <div className='w-[150px] text-center'>
          <p className='truncate text-lg'>{name}</p>
        </div>
      )}
    </div>
  )
}
