import { Navbar } from '@/components/navigation/Navbar'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full w-full bg-[url("/images/netflix-hero.jpeg")] bg-cover bg-no-repeat bg-center'>
      <div className='fixed w-full'>
        <Navbar hideMenu />
      </div>
      <main className='h-full w-full bg-black lg:bg-opacity-50'>
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
