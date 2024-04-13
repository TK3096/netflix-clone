import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

import { DEFAULT_LOGIN_REDIRECT, authRoutes, apiAuthPrefix } from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (!isLoggedIn) return

    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (!isLoggedIn) {
    let callbaclUrl = nextUrl.pathname

    if (nextUrl.search) {
      callbaclUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbaclUrl)

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    )
  }

  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
