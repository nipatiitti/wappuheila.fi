import { prisma } from '@/lib/utils/db'

export async function getProfileReplys(profileId: number) {
  return prisma.profileReply.findMany({
    where: {
      profileId,
      deleted: false,
    },
  })
}
