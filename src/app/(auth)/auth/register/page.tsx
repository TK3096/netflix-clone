import { AuthCard } from '@/components/auth/AuthCard'
import { RegisterForm } from '@/components/auth/RegisterForm'

const LoginPage = () => {
  return (
    <div className='h-full flex justify-center items-center'>
      <AuthCard
        title='sign up'
        footerLabel='Already have an account?'
        linkLabel='Sign in'
        url='/auth/login'
        providers={['github']}
      >
        <RegisterForm />
      </AuthCard>
    </div>
  )
}

export default LoginPage
