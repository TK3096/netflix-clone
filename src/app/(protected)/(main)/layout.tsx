import { Navbar } from '@/components/navigation/Navbar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <div className='fixed w-full z-50'>
        <Navbar />
      </div>
      <main className='h-full'>{children}</main>
    </div>
  )
}

export default MainLayout
