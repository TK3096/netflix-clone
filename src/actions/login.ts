'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

import { signIn } from '@/auth'

import { loginSchema } from '@/shcemas/auth'

import { getUserByEmail } from '@/lib/data/user'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const login = async (
  data: z.infer<typeof loginSchema>,
  callbackUrl?: string,
) => {
  const validateFields = loginSchema.safeParse(data)

  if (!validateFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validateFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.hashedPassword || !existingUser.email) {
    return { error: 'User not found' }
  }

  const matchPassowrd = await bcrypt.compare(
    password,
    existingUser.hashedPassword,
  )

  if (!matchPassowrd) {
    return { error: 'Invalid password' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })

    return { success: 'Successful login' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }

    throw error
  }
}
