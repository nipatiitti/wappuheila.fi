import { getProfile, isOwnProfile } from '@/lib/features/profile/profile.service'
import { getProfileReplys } from '@/lib/features/reply/reply.service'
import { redirect } from 'next/navigation'
import { CSSProperties } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Replies } from './Replies'

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const profile = await getProfile(id)
  const replys = await getProfileReplys(id)
  const ownProfile = await isOwnProfile(id)

  console.log(ownProfile)

  if (!profile) {
    redirect('/')
  }

  const color = profile.overallsColor || 'black'

  return (
    <div
      className="flex flex-col justify-start items-center relative max-w-full"
      style={
        {
          '--color': color,
        } as CSSProperties
      }
    >
      <img
        className="w-full h-64 object-cover bg-opacity-95 rounded-none shadow-md border-2 border-[--color]"
        src={`/api/images/${profile.id}`}
        alt={profile.username}
      />
      <h1 className="mt-2 max-w-full text-lg font-medium opacity-75 break-words">{profile.username}</h1>
      <div className="mt-2 flex items-center">
        <span className="text-xs font-light opacity-50">{profile.contact}</span>
      </div>
      <h2 className="mt-1 max-w-full text-xl font-bold text-ellipsis break-words">{profile.title}</h2>
      <p className="mt-1 max-w-full text-sm font-light text-ellipsis break-words whitespace-pre-wrap">{profile.bio}</p>
      <div className="py-2 mt-3 bg-[#ffebc5] sticky top-0 w-full flex justify-center z-10">
        <a href="/" className="relative inline-block px-4 py-2 font-medium group">
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span className="relative text-black group-hover:text-white flex items-center">
            <i className="mr-2">
              <FaArrowLeft />
            </i>
            Takaisin
          </span>
        </a>
      </div>
      <Replies profileId={id} replys={replys} isOwnProfile={ownProfile} />
    </div>
  )
}
