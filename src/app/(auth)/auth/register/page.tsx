import { AuthWrapper } from '@/components/auth/AuthWrapper'
import { RegisterForm } from '@/components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthWrapper
      headerLabel='Sign up'
      footerLabel='already have an account?'
      switchFormLabel='Login'
      swithFormLink='/auth/login'
    >
      <RegisterForm />
    </AuthWrapper>
  )
}

export default RegisterPage
