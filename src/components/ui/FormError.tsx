import React from 'react'

import { TriangleAlertIcon } from 'lucide-react'

interface FormErrorProps {
  message: string
}

export const FormError: React.FC<FormErrorProps> = (props: FormErrorProps) => {
  const { message } = props

  return (
    <div className='flex items-center gap-2 bg-rose-200 rounded-md p-2'>
      <TriangleAlertIcon size={25} className='text-rose-700' />
      <p className='text-rose-700 text-sm'>{message}</p>
    </div>
  )
}
