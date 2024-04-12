import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full w-full bg-[url('/images/netflix-hero.jpeg')] bg-cover bg-no-repeat bg-center">
      <div className='text-white absolute top-5 left-10'>
        <Image
          src='/images/netflix-logo.svg'
          alt='logo'
          width={160}
          height={160}
        />
      </div>
      <main className='h-full w-full bg-black lg:bg-opacity-50 flex justify-center items-center'>
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
