import type { NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import bcrypt from 'bcryptjs'

import { loginSchema } from '@/shcemas/auth'

import { getUserByEmail } from '@/data/user'

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validateFields = loginSchema.safeParse(credentials)

        if (!validateFields.success) {
          return null
        }

        const { email, password } = validateFields.data
        const user = await getUserByEmail(email)

        if (!user || !user.password) {
          return null
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
          return null
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
