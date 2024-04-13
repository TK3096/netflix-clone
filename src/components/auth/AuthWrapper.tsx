import { SocialAuthProvider } from '@/types'

import React from 'react'
import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { SocialAuth } from '@/components/auth/SocialAuth'

interface AuthWrapperProps {
  headerLabel: string
  footerLabel: string
  children: React.ReactNode
  switchFormLabel: string
  swithFormLink: string
  providers?: SocialAuthProvider[]
}

export const AuthWrapper: React.FC<AuthWrapperProps> = (
  props: AuthWrapperProps,
) => {
  const {
    headerLabel,
    footerLabel,
    children,
    switchFormLabel,
    swithFormLink,
    providers,
  } = props

  return (
    <div className='md:w-[500px] rounded-md bg-black p-16 bg-opacity-70 flex flex-col gap-8'>
      <h2 className='text-white text-4xl font-semibold'>{headerLabel}</h2>
      {children}
      {providers && providers.length > 0 && (
        <Separator className='bg-muted-foreground' />
      )}
      {providers && providers.length > 0 && (
        <SocialAuth providers={providers} />
      )}
      <div className='text-sm space-x-1'>
        <span className='text-muted-foreground'>{footerLabel}</span>{' '}
        <Link href={swithFormLink}>
          <span className='text-white '>{switchFormLabel}</span>
        </Link>
      </div>
    </div>
  )
}
