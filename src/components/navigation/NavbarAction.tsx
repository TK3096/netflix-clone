'use client'

import React from 'react'
import { Search, Bell, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useCurrentUser } from '@/hooks/useCurrentUser'

import { logout } from '@/actions/logout'

import { ProfileAvatar } from '@/components/profile/ProfileAvatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const NavbarAction: React.FC = () => {
  const router = useRouter()

  const user = useCurrentUser()

  const handleClikProfile = () => {
    router.push('/profiles')
  }

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className='flex items-center gap-4'>
      <Search className='cursor-pointer' size={20} />
      <Bell className='cursor-pointer' size={20} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex items-center gap-1 cursor-pointer'>
            <ProfileAvatar name={user?.name!} image={user?.image!} size='sm' />
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <div
              className='flex items-center gap-1'
              onClick={handleClikProfile}
            >
              <ProfileAvatar
                name={user?.name!}
                image={user?.image!}
                size='sm'
              />
              <p>{user?.name!}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
