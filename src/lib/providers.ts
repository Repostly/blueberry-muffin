export const providers = {
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    type: "oauth",
    authorization: "https://www.tiktok.com/v2/auth/authorize",
    token: "https://open.tiktokapis.com/v2/oauth/token/",
    userinfo: "https://open.tiktokapis.com/v2/user/info/",
    clientId: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY,
    clientSecret: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_SECRET,
    scope: "user.info.basic,video.upload",
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    type: "oauth",
    authorization: "https://accounts.google.com/o/oauth2/v2/auth",
    token: "https://oauth2.googleapis.com/token",
    userinfo: "https://www.googleapis.com/oauth2/v3/userinfo",
    clientId: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET,
    scope: "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly",
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    type: "oauth",
    authorization: "https://www.instagram.com/oauth/authorize",
    token: "https://api.instagram.com/oauth/access_token",
    userinfo: "https://www.googleapis.com/oauth2/v3/userinfo",
    clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET,
    scope: "instagram_business_basic,instagram_business_content_publish",
  },
}
