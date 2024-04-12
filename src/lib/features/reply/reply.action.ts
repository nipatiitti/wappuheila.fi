'use server'

import { userAction } from '@/lib/utils/auth'
import { prisma } from '@/lib/utils/db'
import { validate } from '@/lib/utils/validate'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Comes from a form-data
const ReplyDTO = z.object({
  reply: z.string().max(210),
  username: z.string().max(25),
  profileId: z.coerce.number(),
})

export async function addProfileReply(data: FormData) {
  const { reply, username, profileId } = validate(ReplyDTO, data)

  if (!reply || !username || !profileId) {
    return
  }

  await prisma.profileReply.create({
    data: {
      profileId,
      reply,
      username,
      deleted: false,
    },
  })

  revalidatePath(`/p/${profileId}`)
  return true
}

const deleteReplyDTO = z.object({
  replyId: z.coerce.number(),
})

export async function deleteReply(data: FormData) {
  const { replyId } = validate(deleteReplyDTO, data)

  // make sure the reply exists, and the user is allowed to delete it
  const { user } = await userAction()
  const userProfile = await prisma.profile.findFirst({
    where: {
      userId: user?.id,
    },
  })

  if (!userProfile) {
    return
  }

  // If the reply isn't addressed to the users profile, abort this action
  const reply = await prisma.profileReply.findFirst({
    where: {
      id: replyId,
      profileId: userProfile?.id,
    },
  })

  if (!reply) {
    return
  }

  await prisma.profileReply.update({
    where: {
      id: replyId,
    },
    data: {
      deleted: true,
    },
  })

  revalidatePath(`/p/${userProfile.id}`)
  return true
}
