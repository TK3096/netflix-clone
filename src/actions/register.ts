'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { registerSchema } from '@/shcemas/auth'

import { createUser, getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password, name } = validateFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'User already exist' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const id = await createUser({
    email,
    password: hashedPassword,
    name,
  })

  if (!id) {
    return { error: 'Failed to create user' }
  }

  return { success: 'User created' }
}
