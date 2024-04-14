import { Menu } from '@/types'
import Link from 'next/link'

import React from 'react'

interface NavbarMenuProps {
  menus: Menu[]
}

export const NavbarMenu: React.FC<NavbarMenuProps> = (
  props: NavbarMenuProps,
) => {
  const { menus } = props

  return (
    <div className='flex items-center gap-4'>
      {menus.map((menu) => (
        <div key={menu.label} className='cursor-pointer'>
          <Link href={menu.url}>{menu.label}</Link>
        </div>
      ))}
    </div>
  )
}
