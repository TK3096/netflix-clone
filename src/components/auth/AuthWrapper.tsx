import React from 'react'
import Link from 'next/link'

interface AuthWrapperProps {
  headerLabel: string
  footerLabel: string
  children: React.ReactNode
  switchFormLabel: string
  swithFormLink: string
}

export const AuthWrapper: React.FC<AuthWrapperProps> = (
  props: AuthWrapperProps,
) => {
  const { headerLabel, footerLabel, children, switchFormLabel, swithFormLink } =
    props

  return (
    <div className='rounded-md bg-black p-16 bg-opacity-70'>
      <h2 className='text-white text-4xl mb-8 font-semibold'>{headerLabel}</h2>
      {children}
      <div className='flex gap-2 text-sm mt-4'>
        <p className='text-muted-foreground'>{footerLabel}</p>{' '}
        <Link href={swithFormLink}>
          <span className='text-white '>{switchFormLabel}</span>
        </Link>
      </div>
    </div>
  )
}
