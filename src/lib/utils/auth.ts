import 'server-only'

import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { redirect } from 'next/navigation'
import { prisma } from './db'

declare module 'next-auth' {
  interface Session {
    owner?: boolean
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) session.user.id = user.id

      if (user.email === process.env.ADMIN_EMAIL) {
        session.owner = true
      }

      return session
    },
  },
  trustHost: true,
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
})

/**
 * Make sure the action can obly be run by an admin
 * @returns Current user session
 */
export const userAction = async () => {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}

/**
 * Make sure the user exists
 * @returns Current user session
 */
export const userExists = async () => {
  const session = await auth()

  if (!session) {
    redirect('/kirjaudu')
  }

  return session
}
