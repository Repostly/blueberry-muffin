import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import connectDB from '@/db/connect';
import User from '@/models/User';
import { getSession } from '@/auth/session';
import { storeTokens } from '@/lib/token-storage';

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
    const data = await request.json();

    const requiredFields = ['video_url', 'metadata'];
    const missingFields = requiredFields.filter(field => !(field in data));
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      }, { status: 400 });
    }

    const { video_url, metadata } = data;

    const lambdaFunctions: Record<SocialMediaPlatform, string | undefined> = {
      youtube: process.env.YOUTUBE_UPLOAD_LAMBDA_FUNCTION,
      tiktok: process.env.TIKTOK_UPLOAD_LAMBDA_FUNCTION,
      instagram: process.env.INSTAGRAM_UPLOAD_LAMBDA_FUNCTION,
    };

    const session = await getSession()
    if (!session || !session.user || !session.user.email) {
      throw new Error('User not authenticated');
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      }, { status: 404 });
    }

    const results = [];

    for (const [platform, meta] of Object.entries(metadata)) {
      const functionName = lambdaFunctions[platform as SocialMediaPlatform];
      if (!functionName) {
        results.push({ platform, success: false, message: `Lambda function not configured for ${platform}` });
        continue;
      }

      if (!(meta instanceof Object)) {
        results.push({ platform, success: false, message: `Incorrectly shaped metadata for ${platform}` });
        continue;
      }

      const platformData = user.providers?.get(platform as SocialMediaPlatform);
  
      if (!platformData || !platformData.accessToken) {
        results.push({ platform, success: false, message: `No access token found for ${platform}` });
        continue;
      }

      let { accessToken, refreshToken } = platformData;

      const payload = {
        video_url,
        ...meta,
        access_token: accessToken,
        refresh_token: refreshToken,
      };

      try {
        const lambdaResponse = await invokeLambdaFunction(functionName, payload);

        if (lambdaResponse.body.statusCode == 200) {
          results.push({ platform, success: true, result: lambdaResponse.body });
        } else {
          // If Lambda invocation fails, try refreshing the token and retry
          try {
            const newTokens = await refreshToken(platform as SocialMediaPlatform, refreshToken);
            accessToken = newTokens.accessToken;
            refreshToken = newTokens.refreshToken;

            // Update user's tokens in the database
            await storeTokens(user.email, platform, accessToken, refreshToken);

            // Retry Lambda invocation with new access token
            payload.access_token = accessToken;
            payload.refresh_token = refreshToken;
            const retryResponse = await invokeLambdaFunction(functionName, payload);

            if (retryResponse.success) {
              results.push({ platform, success: true, result: retryResponse.body });
            } else {
              results.push({ platform, success: false, message: retryResponse.body });
            }
          } catch (refreshError) {
            results.push({ platform, success: false, message: `Token refresh failed: ${refreshError instanceof Error ? refreshError.message : 'Unknown error'}` });
          }
        }
      } catch (error) {
        results.push({ platform, success: false, message: `Lambda invocation failed: ${error instanceof Error ? error.message : 'Unknown error'}` });
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
