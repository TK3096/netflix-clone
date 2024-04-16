import React from 'react'
import Link from 'next/link'

interface NavbarMenuItemProps {
  children: React.ReactNode
  url: string
}

export const NavbarMenuItem: React.FC<NavbarMenuItemProps> = (
  props: NavbarMenuItemProps,
) => {
  const { children, url } = props

  return (
    <Link href={url}>
      <div className='cursor-pointer'>{children}</div>
    </Link>
  )
}
