import React from 'react'

import { CheckCircle2Icon } from 'lucide-react'

interface FormSuccessProps {
  message: string
}

export const FormSuccess: React.FC<FormSuccessProps> = (
  props: FormSuccessProps,
) => {
  const { message } = props

  return (
    <div className='flex items-center gap-2 bg-emerald-200 rounded-md p-2'>
      <CheckCircle2Icon size={25} className='text-emerald-700' />
      <p className='text-emerald-700 text-sm'>{message}</p>
    </div>
  )
}
