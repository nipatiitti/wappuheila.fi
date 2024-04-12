'use client'
import { addProfileReply } from '@/lib/features/reply/reply.action'
import { useRef } from 'react'

export function ReplyForm({ profileId }: { profileId: number }) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      action={addProfileReply}
      onSubmit={() => setTimeout(() => formRef.current?.reset(), 10)}
      ref={formRef}
      name="replyForm"
      className="mt-8 w-full max-w-full"
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
  )
}
