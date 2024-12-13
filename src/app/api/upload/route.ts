import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const config = {
  api: {
    bodyParser: false, // Disallow Next.js default body parsing
  },
};

async function uploadFileToS3(file: File, fileName: string) {
  const fileBuffer = await file.arrayBuffer(); // Convert File to ArrayBuffer
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: `${fileName}-${Date.now()}`,
    Body: Buffer.from(fileBuffer), // Convert ArrayBuffer to Buffer
    ContentType: 'video/mp4',
  };

  try {
    await s3.putObject(params).promise();
    
    // Construct the URL manually
    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    
    console.log('File uploaded successfully at', fileUrl);
    return fileUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('File upload failed');
  }
}


export async function POST(request: NextRequest) {

  try {

    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 })
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    const fileName = await uploadFileToS3(file, file.name)

    return NextResponse.json({ success: true, url: fileName })
  } catch (error) {
    return NextResponse.json({ error })
  }

}