'use client'

import React, { useState, useEffect } from 'react'

import { NavbarLogo } from '@/components/navigation/NavbarLogo'
import { NavbarMenu } from '@/components/navigation/NavbarMenu'
import { NavbarAction } from '@/components/navigation/NavbarAction'

import { cn } from '@/lib/utils'

interface NavbarProps {
  hideMenu?: boolean
}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { hideMenu = false } = props

  const [changeBackground, setChangeBackground] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setChangeBackground(window.scrollY >= 66)
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        'pt-6 pb-3 px-10 md:px-20 lg:px-40 flex items-center gap-4 w-full transition duration-200',
        changeBackground && 'bg-neutral-900',
      )}
    >
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
