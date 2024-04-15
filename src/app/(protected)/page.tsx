'use client'

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const HomePage = () => {
  const user = useCurrentUser()

  return (
    <div>
      {JSON.stringify(user)}
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  )
}

export default HomePage
