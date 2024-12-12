import { NextRequest, NextResponse } from 'next/server'
import { providers } from '@/lib/providers'
import { storeTokens } from '@/lib/token-storage'
import { getSession } from '@/auth/session';

export async function GET(request: NextRequest, { params }: { params: { provider: string } }) {
  // Ensure params are awaited
  const { provider } = await params; // Await params here to avoid the sync access error

  const providerConfig = providers[provider as keyof typeof providers]
  if (!providerConfig) {
    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
  }

  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`/connect?error=${error}`)
  }

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  if (!providerConfig.clientId || !providerConfig.clientSecret) {
    throw new Error('Missing clientId or clientSecret');
  }

  try {
    const tokenResponse = await fetch(providerConfig.token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: providerConfig.clientId,
        client_secret: providerConfig.clientSecret,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/${providerConfig.id}`,
        grant_type: 'authorization_code',
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token')
    }

    if (!tokenData.refresh_token) {
      console.warn('No refresh token received. User may have already granted permission.')
    }

    // Get the user session
    const session = await getSession()
    if (!session || !session.user || !session.user.email) {
      throw new Error('User not authenticated');
    }

    // Store the tokens in the database
    await storeTokens(session.user.email, provider, tokenData.access_token, tokenData.refresh_token)

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/connect?success=true`)
  } catch (error) {
    console.error('Error in OAuth callback:', error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/connect?error=AuthenticationFailed`)
  }
}
