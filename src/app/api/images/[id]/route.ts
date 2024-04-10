import { getProfileImage } from '@/lib/features/profile/profile.service'

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) => {
  const id = parseInt(params.id)

  const image = await getProfileImage(id)
  if (!image) {
    return new Response(null, { status: 404 })
  }

  // The image is stored as a base64 encoded string
  const base64 = image.split(',')[1]
  const buffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
  const mime = image.split(';')[0].split(':')[1]
  return new Response(buffer, {
    headers: {
      'Content-Type': mime,
    },
  })
}
