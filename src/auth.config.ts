import type { NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { loginSchema } from '@/shcemas/auth'

import { getUserByEmail } from '@/lib/data/user'

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validateFields = loginSchema.safeParse(credentials)

        if (!validateFields.success) {
          return null
        }

        const { email, password } = validateFields.data
        const user = await getUserByEmail(email)

        if (!user || !user.hashedPassword) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        )

        if (!passwordMatch) {
          return null
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
