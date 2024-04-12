import { prisma } from '@/lib/utils/db'

export async function getProfileReplys(profileId: number) {
  return prisma.profileReply.findMany({
    where: {
      profileId,
      deleted: false,
    },
    select: {
      createdAt: true,
      id: true,
      reply: true,
      username: true,
    },
  })
}

export async function countProfileReplys(profileId: number) {
  return prisma.profileReply.count({
    where: {
      profileId,
      deleted: false,
    },
  })
}
