import { deleteReply } from '@/lib/features/reply/reply.action'
import { getRelativeTimeString } from '@/lib/utils/timestamps'
import { ReplyForm } from './ReplyForm'

export async function Replies({
  profileId,
  replys,
  isOwnProfile,
}: {
  profileId: number
  replys: { reply: string; username: string; id: number; createdAt: Date }[]
  isOwnProfile: boolean
}) {
  return (
    <>
      <div className="mt-8 w-full">
        <h2 className="text-lg font-bold">Vastaukset</h2>
        <ul className="mt-2">
          {replys.length ? (
            replys.map((reply) => (
              <li
                key={reply.id}
                className="mt-2 p-2 border-2 border-black rounded-none bg-white flex flex-col w-full relative"
              >
                <div className="flex flex-col items-end absolute top-2 right-2">
                  <span className=" text-gray-500 text-xs">{getRelativeTimeString(reply.createdAt)}</span>
                  {isOwnProfile && (
                    <form action={deleteReply}>
                      <input type="hidden" name="replyId" value={reply.id} />
                      <button type="submit" className="ml-2 text-red-500 text-xs">
                        Poista
                      </button>
                    </form>
                  )}
                </div>
                <h2 className="font-bold">{reply.username}</h2>
                <p className="mt-1 whitespace-pre-wrap break-words max-w-full">{reply.reply}</p>
              </li>
            ))
          ) : (
            <p>Ei vastauksia</p>
          )}
        </ul>
      </div>
      <ReplyForm profileId={profileId} />
    </>
  )
}
