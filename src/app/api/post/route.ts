'use server'

import { revalidatePath } from 'next/cache';

interface MetadataPayload {
  youtube?: {
    title: string;
    description: string;
    tags: string;
  };
  tiktok?: {
    caption: string;
    hashtags: string;
  };
  instagram?: {
    caption: string;
    hashtags: string;
  };
}

// async function submitToSocialMedia(platform: string, data: object) {
//   try {
//     const response = await fetch('http://127.0.0.1:5000/post', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     const responseData = await response.json();
//     if (!response.ok || !responseData.success) {
//       throw new Error(responseData.error || `${platform} upload failed`);
//     }
//     return responseData;
//   } catch (error) {
//     console.error(`Error submitting to ${platform}:`, error);
//     throw error;
//   }
// }

// export async function postVideo(videoUrl: string, metadata: MetadataPayload) {
//   console.log('Submitting metadata for video:', videoUrl);

//   if (metadata.youtube) {
//     await submitToSocialMedia('YouTube', {
//       video_url: videoUrl,
//       title: metadata.youtube.title,
//       description: metadata.youtube.description,
//       access_token: process.env.YOUTUBE_ACCESS_TOKEN,
//       refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
//       social_media: 'youtube',
//     });
//   }

//   if (metadata.tiktok) {
//     await submitToSocialMedia('TikTok', {
//       video_url: videoUrl,
//       caption: metadata.tiktok.caption,
//       hashtags: metadata.tiktok.hashtags,
//       social_media: 'tiktok',
//     });
//   }

//   if (metadata.instagram) {
//     await submitToSocialMedia('Instagram', {
//       video_url: videoUrl,
//       caption: metadata.instagram.caption,
//       hashtags: metadata.instagram.hashtags,
//       social_media: 'instagram',
//     });
//   }

// TODO: MOVE FLASK CODE TO HERE

  revalidatePath('/');
  return { success: true, message: 'Metadata submitted successfully' };
}
