'use client'

import React from 'react'
import { Bell, Search, ChevronDown } from 'lucide-react'
import { logout } from '@/actions/logout'

import { useCurrentUser } from '@/hooks/useCurrentUser'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ProfileAvatar } from '@/components/profile/ProfileAvatar'

export const ActionMenu: React.FC = () => {
  const user = useCurrentUser()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className='flex items-center gap-4'>
      <Search size={16} className='cursor-pointer' />
      <Bell size={16} className='cursor-pointer' />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex items-center cursor-pointer'>
            <ProfileAvatar name={user?.name!} size='sm' image={user?.image!} />
            <ChevronDown size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <div className='flex gap-2 items-center'>
              <ProfileAvatar
                name={user?.name!}
                size='sm'
                image={user?.image!}
              />
              {user?.name!}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
