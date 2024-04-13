'use client'

import { SocialAuthProvider } from '@/types'

import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

interface SocialAuthProps {
  providers?: SocialAuthProvider[]
}

export const SocialAuth: React.FC<SocialAuthProps> = (
  props: SocialAuthProps,
) => {
  const { providers } = props

  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl') || undefined

  const handleClick = (provider: SocialAuthProvider) => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT })
  }

  const allowGithubProvider = providers?.find(
    (provider) => provider === 'github',
  )

  return (
    <div className='flex justify-center items-center w-full'>
      {allowGithubProvider && (
        <Button
          size='icon'
          className='rounded-full'
          onClick={() => handleClick('github')}
        >
          <FaGithub className='h-10 w-10' />
        </Button>
      )}
    </div>
  )
}
