import type { Metadata } from 'next'

import { SessionProvider } from 'next-auth/react'
import { Open_Sans } from 'next/font/google'

import { auth } from '@/auth'

import { Toaster } from '@/components/ui/sonner'

import { ModalProvider } from '@/providers/ModalProvider'

import { cn } from '@/lib/utils'

import './globals.css'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={cn(font.className, 'dark')}>
          {children}
          <ModalProvider />
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  )
}
