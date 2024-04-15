import { AuthCard } from '@/components/auth/AuthCard'
import { LoginForm } from '@/components/auth/LoginForm'

const LoginPage = () => {
  return (
    <div className='h-full flex justify-center items-center'>
      <AuthCard
        title='sign in'
        footerLabel='Don’t have an account?'
        linkLabel='Create an account?'
        url='/auth/register'
        providers={['github']}
      >
        <LoginForm />
      </AuthCard>
    </div>
  )
}

export default LoginPage
