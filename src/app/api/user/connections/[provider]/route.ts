import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/db/connect'
import User from '@/models/User'
import { getSession } from '@/auth/session'

type Params = Promise<{
  provider: string
}>

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  // Ensure params are awaited
  const { provider } = await params; // Await params here to avoid the sync access error

  const session = await getSession()
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    // Connect to the database
    await connectDB()

    // Find the user by email
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if the provider exists in the user's connections
    if (!user.providers || !user.providers.get(provider)) {
      return NextResponse.json({ error: `No connection found for ${provider}` }, { status: 404 })
    }

    // Delete the provider from the user's providers
    await user.providers.delete(provider)

    // Save the updated user
    await user.save({ validateModifiedOnly: true });

    return NextResponse.json({ success: true, message: `Successfully disconnected ${provider} connection` })
  } catch (error) {
    console.error('Error disconnecting user connection:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
