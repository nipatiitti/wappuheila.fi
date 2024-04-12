'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl font-bold text-red-500">{error.message}</h1>
      <button onClick={reset} className="mt-4 p-2 bg-black text-white font-medium">
        Yritä uudelleen
      </button>
    </div>
  )
}
