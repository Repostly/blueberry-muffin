import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth/options'
import connectDB from '@/db/connect'
import User from '@/models/User'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    await connectDB()
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const connections = user.providers || {}
    return NextResponse.json(connections)
  } catch (error) {
    console.error('Error fetching user connections:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

