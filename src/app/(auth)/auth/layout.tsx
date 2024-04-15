import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full w-full relative bg-[url("/images/netflix-hero.jpeg")] bg-cover bg-no-repeat bg-center'>
      <div className='absolute top-6 left-10 md:left-20 lg:left-48'>
        <Image
          src='/images/netflix-logo.svg'
          width={148}
          height={40}
          alt='netflix-logo'
        />
      </div>
      <main className='h-full w-full bg-black lg:bg-opacity-50'>
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
