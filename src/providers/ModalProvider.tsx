'use client'

import { useEffect, useState } from 'react'

import { MovieInfoModal } from '@/components/modal/MovieInfoModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <MovieInfoModal />
    </>
  )
}
