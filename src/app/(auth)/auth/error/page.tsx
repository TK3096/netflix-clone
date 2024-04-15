import { AuthCard } from '@/components/auth/AuthCard'
import { AlertCircle } from 'lucide-react'

const AuthErrorPage = () => {
  return (
    <div className='flex justify-center items-center'>
      <AuthCard
        title='Oops! Something went wrong'
        footerLabel='Back to'
        linkLabel='login'
        url='/auth/login'
      >
        <div className='w-full flex justify-center items-center'>
          <AlertCircle size={72} className='text-destructive' />
        </div>
      </AuthCard>
    </div>
  )
}

export default AuthErrorPage
