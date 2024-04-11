import * as zod from 'zod'

export const loginSchema = zod.object({
  email: zod.string().email({ message: 'Invalid email' }),
  password: zod
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export const registerSchema = zod.object({
  name: zod.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: zod.string().email({ message: 'Invalid email' }),
  password: zod
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})
