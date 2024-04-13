import { AlertCircle } from 'lucide-react'

import { AuthWrapper } from '@/components/auth/AuthWrapper'

const AuthErrorPage = () => {
  return (
    <AuthWrapper
      headerLabel='Oops! Something went wrong'
      footerLabel='Back to'
      switchFormLabel='login'
      swithFormLink='/auth/login'
    >
      <div className='w-full flex justify-center items-center'>
        <AlertCircle size={72} className='text-destructive' />
      </div>
    </AuthWrapper>
  )
}

export default AuthErrorPage
