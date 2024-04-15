'use client'

import { useRouter } from 'next/navigation'

import { useCurrentUser } from '@/hooks/useCurrentUser'

import { ProfileAvatar } from '@/components/profile/ProfileAvatar'

const ProfilesPage = () => {
  const router = useRouter()

  const user = useCurrentUser()

  const handleClick = () => {
    router.push('/')
  }

  return (
    <div className='h-full w-full flex flex-col justify-center items-center gap-5'>
      <h2 className='text-3xl font-bold'>Who is watching?</h2>
      <ProfileAvatar
        name={user?.name!}
        image={user?.image!}
        onClick={handleClick}
      />
    </div>
  )
}

export default ProfilesPage
