import { SocialAuthProvider } from '@/types'

import React from 'react'
import Link from 'next/link'

import { SocialAuth } from '@/components/auth/SocialAuth'

interface AuthCardProps {
  children: React.ReactNode
  title: string
  footerLabel: string
  linkLabel: string
  url: string
  providers?: SocialAuthProvider[]
}

export const AuthCard: React.FC<AuthCardProps> = (props: AuthCardProps) => {
  const { title, footerLabel, linkLabel, url, providers, children } = props

  return (
    <div className='bg-black bg-opacity-70 rounded-md px-20 py-14 flex flex-col gap-8'>
      <h1 className='font-bold text-3xl capitalize'>{title}</h1>
      {children}
      <div>
        <p className='text-sm text-muted-foreground'>
          {footerLabel}{' '}
          <Link href={url}>
            <span className='text-white cursor-pointer'>{linkLabel}</span>
          </Link>
        </p>
      </div>
      {providers && providers.length > 0 && (
        <SocialAuth providers={providers} />
      )}
    </div>
  )
}
