import { ProfileCard } from '@/components/ProfileCard'
import { getCachedProfiles, getUserProfile } from '@/lib/features/profile/profile.service'
import { countProfileReplys } from '@/lib/features/reply/reply.service'
import { auth } from '@/lib/utils/auth'
import { FaHeart } from 'react-icons/fa'
import { GiLoveLetter } from 'react-icons/gi'

export default async function Home() {
  const user = await auth()
  const profile = await getUserProfile()
  const profiles = await getCachedProfiles()

  const replyCount = profile ? await countProfileReplys(profile.id) : 0

  const owner = user?.owner || false

  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center">
        <a href="/hakemus" className="relative inline-block px-4 py-2 font-medium group">
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span className="relative text-black group-hover:text-white flex items-center">
            <i className="mr-2">
              <FaHeart />
            </i>
            {profile ? 'Muokkaa hakemusta' : 'Lähetä Hakemus'}
          </span>
        </a>
        {profile && (
          <a href={`/p/${profile.id}`} className="relative inline-block px-4 py-2 font-medium group">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white flex items-center">
              <i className="mr-2">
                <GiLoveLetter />
              </i>
              Lue vastauksia ({replyCount})
            </span>
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} owner={owner} />
        ))}
      </div>
    </>
  )
}
