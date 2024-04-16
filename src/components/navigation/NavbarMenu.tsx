import { Menu } from '@/types'

import React from 'react'
import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NavbarMenuItem } from './NavbarMenuItem'

const MENUS: Menu[] = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'TV Shows',
    url: '/tv-shows',
  },
  {
    label: 'Movies',
    url: '/movies',
  },
  {
    label: 'New & Popular',
    url: '/new-popular',
  },
  {
    label: 'My List',
    url: '/my-list',
  },
]

export const NavbarMenu: React.FC = () => {
  return (
    <>
      <div className='block lg:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex gap-1 cursor-pointer'>
              Browse <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {MENUS.map((menu) => (
              <DropdownMenuItem key={menu.label} asChild>
                <NavbarMenuItem url={menu.url}>{menu.label}</NavbarMenuItem>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='hidden lg:flex items-center gap-4'>
        {MENUS.map((menu) => (
          <NavbarMenuItem key={menu.label} url={menu.url}>
            {menu.label}
          </NavbarMenuItem>
        ))}
      </div>
    </>
  )
}
