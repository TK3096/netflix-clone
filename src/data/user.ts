import { db } from '@/lib/db'
import { User } from '@prisma/client'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    return user
  } catch (err) {
    return null
  }
}

export const createUser = async (
  data: Omit<Partial<User>, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  try {
    const id = await db.user.create({
      data: {
        ...data,
        name: data.name || '',
      },
    })

    return id
  } catch (err) {
    return null
  }
}
