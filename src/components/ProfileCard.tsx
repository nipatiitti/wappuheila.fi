'use client'

import { adminDeleteProfile } from '@/lib/features/profile/profile.actions'
import { PublicProfile } from '@/lib/features/profile/profile.service'
import { CSSProperties, useState } from 'react'
import { FaEnvelopeOpen } from 'react-icons/fa'
import { TbRotate360 } from 'react-icons/tb'

export function ProfileCard({ profile, owner }: { profile: PublicProfile; owner: boolean }) {
  const color = profile.overallsColor || 'black'

  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative m-2"
      onClick={() => setFlipped(!flipped)}
      style={
        {
          '--color': color,
        } as CSSProperties
      }
    >
      {owner && (
        <form action={adminDeleteProfile} className="absolute top-2 right-2 z-50">
          <input type="hidden" name="profileId" value={profile.id} />
          <button type="submit" className="text-xs text-red-500">
            Poista
          </button>
        </form>
      )}
      <div
        className="flex flex-col h-full items-start relative justify-start p-4 z-10 bg-white border-2 border-[--color] rounded-none shadow-md bg-opacity-95"
        style={
          flipped
            ? {
                transform: 'rotateY(180deg)',
                transition: 'transform 0.5s ease-in',
                backfaceVisibility: 'hidden',
              }
            : {
                transform: 'rotateY(0deg)',
                transition: 'transform 0.5s ease-in',
                backfaceVisibility: 'hidden',
              }
        }
      >
        <h1 className="mt-2 max-w-full text-lg font-medium opacity-75 break-words">{profile.username}</h1>
        <h2 className="mt-1 max-w-full text-xl font-bold text-ellipsis break-words">{profile.title}</h2>
        <p className="mt-1 max-w-full text-sm font-light text-ellipsis break-words whitespace-pre-wrap overflow-hidden max-h-32 line-clamp-6">
          {profile.bio}
        </p>
        <div className="mt-2 flex items-center">
          <span className="text-xs font-light opacity-50">{profile.contact}</span>
        </div>
        <div className="flex flex-1 gap-4 w-full justify-center items-end mt-2">
          <button className="relative inline-block px-4 py-2 font-medium group">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white flex items-center">
              <TbRotate360 />
            </span>
          </button>
          <a
            href={`/p/${profile.id}`}
            onClick={(e) => e.stopPropagation()}
            className="relative inline-block px-4 py-2 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white flex items-center">
              <FaEnvelopeOpen />
            </span>
          </a>
        </div>
      </div>
      <img
        className="border-2 border-[--color] rounded-none shadow-md"
        src={`/api/images/${profile.id}`}
        alt={profile.username}
        loading="lazy"
        style={
          flipped
            ? {
                transform: 'rotateY(0deg)',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease-in',
                zIndex: 0,
              }
            : {
                transform: 'rotateY(180deg)',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease-in',
                zIndex: 0,
              }
        }
      />
    </div>
  )
}
