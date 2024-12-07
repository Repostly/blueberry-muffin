'use server'

// TODO: MOVE FLASK CODE TO HERE
export async function uploadVideo(formData: FormData) {
  const file = formData.get('video') as File
  console.log(file)
  
  return { success: true, videoUrl: '/placeholder.svg?height=360&width=640' }
}