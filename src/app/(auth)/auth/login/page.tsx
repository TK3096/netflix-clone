import { AuthWrapper } from '@/components/auth/AuthWrapper'
import { LoginForm } from '@/components/auth/LoginForm'

const LoginPage = () => {
  return (
    <AuthWrapper
      headerLabel='Sign in'
      footerLabel='Dont have an account?'
      switchFormLabel='Create an account?'
      swithFormLink='/auth/register'
    >
      <LoginForm />
    </AuthWrapper>
  )
}

export default LoginPage
