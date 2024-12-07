'use server'

// import { revalidatePath } from 'next/cache';

// TODO: MOVE FLASK CODE TO HERE
export async function submitToSocialMedia(platform: string, data: object) {
    console.log(platform)
    console.log(data)

  return { success: true, message: 'Metadata submitted successfully' };
}
