import { AuthWrapper } from '@/components/auth/AuthWrapper'
import { RegisterForm } from '@/components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthWrapper
      headerLabel='Sign up'
      footerLabel='Already have an account?'
      switchFormLabel='Go to sign in'
      swithFormLink='/auth/login'
      providers={['github']}
    >
      <RegisterForm />
    </AuthWrapper>
  )
}

export default RegisterPage
