'use server'

// import { revalidatePath } from 'next/cache'

// export async function uploadVideo(formData: FormData) {
//   const file = formData.get('video') as File
  
//   // Create a new FormData object for the backend request
//   const backendFormData = new FormData()
//   backendFormData.append('file', file)
//   backendFormData.append('filename', file.name)

//   // Send to backend
//   const response = await fetch('http://127.0.0.1:5000/upload', {
//     method: 'POST',
//     body: backendFormData
//   })

//   const data = await response.json()
  
//   if (!data.success) {
//     throw new Error(data.error || 'Upload failed')
//   }

//   revalidatePath('/')
//   return { success: true, videoUrl: data.url || '/placeholder.svg?height=360&width=640' }
// }

// TODO: MOVE FLASK CODE TO HERE