'use client'

import { signIn } from 'next-auth/react'
import { useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    signIn('google', {
      callbackUrl: '/hakemus',
    })
  }, [])

  return (
    <div>
      <h1>Kirjaudu</h1>
    </div>
  )
}
