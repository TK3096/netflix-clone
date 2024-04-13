'use client'

import { useSession } from 'next-auth/react'
import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  const session = useSession()

  return (
    <div>
      <div>Homepage</div>
      <div>{JSON.stringify(session.data?.user)}</div>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  )
}

export default HomePage
