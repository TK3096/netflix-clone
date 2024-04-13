'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { registerSchema } from '@/shcemas/auth'

import { createUser, getUserByEmail } from '@/lib/data/user'

export const register = async (data: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(data)

  if (!validateFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, email, password } = validateFields.data
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'User already exists' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const id = await createUser({
    name,
    email,
    hashedPassword,
  })

  if (!id) {
    return { error: 'Failed to create user' }
  }

  return { success: 'Successfuly register' }
}
