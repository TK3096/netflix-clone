'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'
import bcrypt from 'bcryptjs'

import { signIn } from '@/auth'

import { loginSchema } from '@/shcemas/auth'

import { getUserByEmail } from '@/data/user'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string,
) => {
  const validateFields = loginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validateFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.password) {
    return { error: 'User not found' }
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password)

  if (!isValidPassword) {
    return { error: 'Invalid password' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })

    return { success: 'Logged in' }
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin': {
          return { error: 'Invalid credentials' }
        }
        default: {
          return { error: 'Something went wrong' }
        }
      }
    }
  }
}
