import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth/options'

export async function getSession() {
  const session = await getServerSession(authOptions)
  return session
}