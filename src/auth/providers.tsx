export const TikTokProvider = {
  id: "tiktok",
  name: "TikTok",
  type: "oauth",
  version: "2.0",
  scope: "user.info.basic,video.upload",
  authorization: {
    url: "https://www.tiktok.com/v2/auth/authorize",
    params: { response_type: "code" }
  },
  token: "https://open.tiktokapis.com/v2/oauth/token/",
  userinfo: "https://open.tiktokapis.com/v2/user/info/",
  profile(profile: any) {
    return {
      id: profile.user.open_id,
      name: profile.user.display_name,
      image: profile.user.avatar_url
    }
  },
  clientId: process.env.TIKTOK_CLIENT_ID,
  clientSecret: process.env.TIKTOK_CLIENT_SECRET
}

export const YouTubeProvider = {
  id: "youtube",
  name: "YouTube",
  type: "oauth",
  version: "2.0",
  scope: "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly",
  params: { access_type: "offline", prompt: "consent" },
  authorization: {
    url: "https://accounts.google.com/o/oauth2/v2/auth",
    params: { response_type: "code" }
  },
  token: "https://oauth2.googleapis.com/token",
  userinfo: "https://www.googleapis.com/oauth2/v3/userinfo",
  profile(profile: any) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture
    }
  },
  clientId: process.env.YOUTUBE_CLIENT_ID,
  clientSecret: process.env.YOUTUBE_CLIENT_SECRET
}