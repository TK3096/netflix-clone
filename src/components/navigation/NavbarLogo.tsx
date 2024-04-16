import React from 'react'
import Image from 'next/image'

export const NavbarLogo: React.FC = () => {
  return (
    <Image
      src='/images/netflix-logo.svg'
      width={148}
      height={40}
      alt='netflix-logo'
    />
  )
}
