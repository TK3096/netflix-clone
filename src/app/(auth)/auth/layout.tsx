const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full bg-[url('/images/netflix-hero.jpeg')] bg-cover bg-no-repeat bg-center">
      <main className='h-full w-full bg-black lg:bg-opacity-50 flex justify-center items-center'>
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
