import { auth } from '@/lib/utils/auth'
import { prisma } from '@/lib/utils/db'
import { unstable_cache } from 'next/cache'

export const getUserProfile = async () => {
  const session = await auth()
  if (!session) return null

  const profile = await prisma.profile.findFirst({
    where: {
      userId: session.user?.id,
    },
  })

  return profile
}

export const getCachedProfiles = unstable_cache(
  async () => {
    return await prisma.profile.findMany({
      select: {
        id: true,
        username: true,
        title: true,
        bio: true,
        contact: true,
        overallsColor: true,
      },
    })
  },
  ['profile', 'all'],
  {
    revalidate: 60,
    tags: ['profile'],
  }
)

export const getCachedProfile = async (id: number) => {
  return await prisma.profile.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      title: true,
      bio: true,
      contact: true,
      overallsColor: true,
    },
  })
}

export const getProfileImage = async (id: number) => {
  const profile = await prisma.profile.findFirst({
    where: {
      id,
    },
    select: {
      image: true,
    },
  })

  return profile?.image
}

export type PublicProfile = {
  id: number
  username: string
  title: string | null
  bio: string | null
  contact: string | null
  overallsColor: string | null
}
