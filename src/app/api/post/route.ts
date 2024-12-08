import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

type Data = {
  success: boolean;
  result?: any;
  error?: string;
};

// Define a type for the supported social media platforms
type SocialMediaPlatform = 'youtube' | 'tiktok' | 'instagram';

const lambda = new AWS.Lambda();

const invokeLambdaFunction = async (functionName: string, payload: any) => {
  const params = {
    FunctionName: functionName,
    Payload: JSON.stringify(payload),
  };

  try {
    const response = await lambda.invoke(params).promise();
    if (response.StatusCode === 200) {
      return { success: true, body: JSON.parse(response.Payload as string) };
    } else {
      return { success: false, body: `Lambda invocation failed with status code ${response.StatusCode}` };
    }
  } catch (error) {
    return { success: false, body: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
};

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const data = await request.json();

    // Define required fields
    const requiredFields = ['video_url', 'metadata'];
    const missingFields = requiredFields.filter(field => !(field in data));
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      }, { status: 400 });
    }

    const { video_url, metadata } = data;

    // Prepare a map of social media to Lambda function environment variables
    const lambdaFunctions: Record<SocialMediaPlatform, string | undefined> = {
      youtube: process.env.YOUTUBE_UPLOAD_LAMBDA_FUNCTION,
      tiktok: process.env.TIKTOK_UPLOAD_LAMBDA_FUNCTION,
      instagram: process.env.INSTAGRAM_UPLOAD_LAMBDA_FUNCTION,
    };

    // Collect results for each invocation
    const results = [];

    // Iterate over each platform in the metadata
    for (const [platform, meta] of Object.entries(metadata)) {
      const functionName = lambdaFunctions[platform as SocialMediaPlatform];
      if (!functionName) {
        results.push({ platform, success: false, message: `Lambda function not configured for ${platform}` });
        continue;
      }

      // Validate metadata
      if (!(meta instanceof Object)) {
        results.push({ platform, success: false, message: `Incorrectly shaped metadata for  ${platform}` });
        continue;
      }

      // Prepare payload for Lambda invocation
      const payload = {
        video_url,
        ...meta,
      };

      // Invoke the Lambda function
      const lambdaResponse = await invokeLambdaFunction(functionName, payload);

      if (lambdaResponse.success) {
        results.push({ platform, success: true, result: lambdaResponse.body });
      } else {
        results.push({ platform, success: false, message: lambdaResponse.body });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lambda functions invoked',
      results,
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing the request',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
