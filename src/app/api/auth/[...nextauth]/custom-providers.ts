export const providers = {
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    type: "oauth",
    authorization: "https://www.tiktok.com/v2/auth/authorize?response_type=code",
    token: "https://open.tiktokapis.com/v2/oauth/token/",
    userinfo: "https://open.tiktokapis.com/v2/user/info/",
    clientId: process.env.TIKTOK_CLIENT_ID,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
    scope: "user.info.basic,video.upload",
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    type: "oauth",
    authorization: "https://accounts.google.com/o/oauth2/v2/auth?response_type=code",
    token: "https://oauth2.googleapis.com/token",
    userinfo: "https://www.googleapis.com/oauth2/v3/userinfo",
    clientId: process.env.YOUTUBE_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
    scope: "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly",
  },
}
