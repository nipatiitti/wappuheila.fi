'use client'

import { addProfileReply } from '@/lib/features/reply/reply.action'
import { ProfileReply } from '@prisma/client'

export function Replies({ profileId, replys }: { profileId: number; replys: ProfileReply[] }) {
  console.log({ replys })
  return (
    <>
      <div className="mt-8 w-full">
        <h2 className="text-lg font-bold">Vastaukset</h2>
        <ul className="mt-2">
          {replys.length ? (
            replys.map((reply) => (
              <li key={reply.id} className="mt-2 p-2 border-2 border-black rounded-none bg-white flex flex-col w-full">
                <h2 className="font-bold">{reply.username}</h2>
                <p className="mt-1 whitespace-pre">{reply.reply}</p>
              </li>
            ))
          ) : (
            <p>Ei vastauksia</p>
          )}
        </ul>
      </div>
      <form
        action={addProfileReply}
        name="replyForm"
        className="mt-8 w-full max-w-full"
        onSubmit={(e) => {
          setTimeout(() => {
            // @ts-ignore
            e.target.reset()
            location.reload()
          }, 200)
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="Nimimerkki..."
          className="w-full p-2 mb-2 border-2 outline-none border-black"
          maxLength={20}
          id="username"
        />
        <textarea
          name="reply"
          placeholder="Viesti..."
          className="w-full h-16 p-2 border-2 border-black rounded-none outline-none"
          maxLength={100}
          id="reply"
        ></textarea>
        <input type="hidden" name="profileId" value={profileId} />
        <button type="submit" className="w-full p-2 mt-2 bg-black text-white font-medium">
          Lähetä vastaus hakemukseen
        </button>
      </form>
    </>
  )
}
