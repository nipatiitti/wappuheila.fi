'use server'

import { userAction } from '@/lib/utils/auth'
import { prisma } from '@/lib/utils/db'
import { validate } from '@/lib/utils/validate'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const maxFileSize = 1024 * 1024 * 2 // 2MB

// Comes from a form-data
const ProfileDTO = z.object({
  username: z.string().max(25),
  bio: z.string().max(410),
  title: z.string().max(65),
  contact: z.string().max(110),
  overallsColor: z.string().max(7),
})

export async function upsertProfile(data: FormData) {
  const { user } = await userAction()
  const profile = validate(ProfileDTO, data) as z.infer<typeof ProfileDTO> & { image?: string }

  const image = data.get('image') as File

  if (image && image.size > maxFileSize) {
    throw new Error('Image is too large')
  }

  // Image in utf-8
  const base64DataUrl = image
    ? `data:${image.type};base64,${Buffer.from(await image.arrayBuffer()).toString('base64')}`
    : ''

  if (base64DataUrl !== '') {
    profile.image = base64DataUrl
  }

  await prisma.profile.upsert({
    where: {
      userId: user?.id,
    },
    create: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      ...profile,
    },
    update: {
      ...profile,
    },
  })

  revalidateTag('profile')
  return redirect('/')
}

export async function deleteProfile() {
  const { user } = await userAction()

  await prisma.profile.delete({
    where: {
      userId: user?.id,
    },
  })

  revalidateTag('profile')
  return redirect('/')
}

const AdminDeleteProfileDTO = z.object({
  profileId: z.coerce.number(),
})

export async function adminDeleteProfile(data: FormData) {
  const { owner } = await userAction()
  if (!owner) {
    throw new Error('Unauthorized')
  }

  const { profileId } = validate(AdminDeleteProfileDTO, data)

  await prisma.profile.delete({
    where: {
      id: profileId,
    },
  })

  revalidatePath('/')
}
