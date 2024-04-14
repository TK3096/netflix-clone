import { Menu } from '@/types'

import React from 'react'
import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

interface HamburgerMenuProps {
  menus: Menu[]
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = (
  props: HamburgerMenuProps,
) => {
  const { menus } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center cursor-pointer'>
          Browse
          <ChevronDown size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' side='bottom'>
        {menus.map((menu) => (
          <DropdownMenuItem key={menu.label}>
            <Link href={menu.url}>{menu.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
