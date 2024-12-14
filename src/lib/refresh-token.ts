import { providers } from '@/lib/providers'
import User, { IUser } from '@/models/User';

async function refreshTikTokToken(refreshToken: string) {
  const response = await fetch(providers.tiktok.token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_key: providers.tiktok.clientId!,
      client_secret: providers.tiktok.clientSecret!,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function refreshYouTubeToken(refreshToken: string) {
  const response = await fetch(providers.youtube.token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: providers.youtube.clientId!,
      client_secret: providers.youtube.clientSecret!,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function refreshToken(user: IUser, platform: string) {
  const platformData = user.providers?.get(platform);
  if (!platformData || !platformData.refreshToken) {
    throw new Error(`No refresh token found for ${platform}`);
  }

  try {
    let tokens;
    if (platform === 'tiktok') {
      tokens = await refreshTikTokToken(platformData.refreshToken);
    } else if (platform === 'youtube') {
      tokens = await refreshYouTubeToken(platformData.refreshToken);
    } else {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const newAccessToken = tokens.access_token;
    const newRefreshToken = tokens.refresh_token || platformData.refreshToken;

    // Update the user document with the new tokens
    await User.findOneAndUpdate(
      { _id: user._id, 'providers.platform': platform },
      { 
        $set: { 
          'providers.$.accessToken': newAccessToken,
          'providers.$.refreshToken': newRefreshToken
        } 
      }
    );

    return newAccessToken;
  } catch (error) {
    console.error(`Error refreshing token for ${platform}:`, error);
    throw error;
  }
}

