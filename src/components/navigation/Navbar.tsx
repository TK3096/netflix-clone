import React from 'react'

import { NavbarLogo } from '@/components/navigation/NavbarLogo'
import { NavbarMenu } from '@/components/navigation/NavbarMenu'
import { NavbarAction } from '@/components/navigation/NavbarAction'

interface NavbarProps {
  hideMenu?: boolean
}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { hideMenu = false } = props

  return (
    <nav className='pt-6 pb-3 px-10 md:px-20 lg:px-40 flex items-center gap-4 w-full'>
      <NavbarLogo />
      {!hideMenu && (
        <>
          <NavbarMenu />
          <div className='ml-auto'>
            <NavbarAction />
          </div>
        </>
      )}
    </nav>
  )
}
