'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

import { NavbarLogo } from '@/components/navigation/NavbarLogo'
import { NavbarMenu } from '@/components/navigation/NavbarMenu'
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu'
import { ActionMenu } from '@/components/navigation/ActionMenu'

const MENUS = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Series',
    url: '/series',
  },
  {
    label: 'Films',
    url: '/films',
  },
  {
    label: 'New & Popular',
    url: '/new-popular',
  },
  {
    label: 'My List',
    url: '/my-list',
  },
  {
    label: 'Browse by language',
    url: '/browse-by-language',
  },
]

export const Navbar: React.FC = () => {
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.screenY)

      if (window.scrollY >= 66) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        'px-5 md:px-10 lg:px-20 py-3 flex gap-4 items-center transition-colors duration-150 shadow-xl bg-neutral-900',
        showBackground && 'bg-black',
      )}
    >
      <NavbarLogo />
      <div className='hidden md:block'>
        <NavbarMenu menus={MENUS} />
      </div>
      <div className='block md:hidden'>
        <HamburgerMenu menus={MENUS} />
      </div>
      <div className='ml-auto'>
        <ActionMenu />
      </div>
    </nav>
  )
}
