import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

export const NavbarLogo: React.FC = () => {
  return (
    <Link href='/'>
      <Image
        src='/images/netflix-logo.svg'
        alt='Logo'
        width={120}
        height={100}
      />
    </Link>
  )
}
