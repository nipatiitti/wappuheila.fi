import { ProfileCard } from '@/components/ProfileCard'
import { getCachedProfiles, getUserProfile } from '@/lib/features/profile/profile.service'
import { FaHeart } from 'react-icons/fa'

export default async function Home() {
  const profile = await getUserProfile()
  const profiles = await getCachedProfiles()

  return (
    <>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </>
  )
}
