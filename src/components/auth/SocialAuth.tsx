'use client'

import { SocialAuthProvider } from '@/types'

import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

interface SocialAuthProps {
  providers: SocialAuthProvider[]
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

  const allowGithub = providers.includes('github')

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <Separator />

      {allowGithub && (
        <Button
          size='icon'
          className='rounded-full'
          onClick={() => handleClick('github')}
        >
          <FaGithub className='w-10 h-10' />
        </Button>
      )}
    </div>
  )
}
