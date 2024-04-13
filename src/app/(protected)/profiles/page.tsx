'use client'

import { useCurrentUser } from '@/hooks/useCurrentUser'

import { ProfileAvatar } from '@/components/profile/ProfileAvatar'

const ProfilesPage = () => {
  const user = useCurrentUser()

  if (!user) {
    return null
  }

  return (
    <div className='h-full flex flex-col justify-center items-center gap-4'>
      <h2 className='text-4xl font-semibold'>Who is watching?</h2>
      <ProfileAvatar name={user.name!} />
    </div>
  )
}

export default ProfilesPage
