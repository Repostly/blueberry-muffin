import connectDB from '@/db/connect';
import User from '@/models/User';

export async function storeTokens(email: string, provider: string, accessToken: string, refreshToken?: string) {
  await connectDB();

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // Assuming token expires in 1 hour

  const update = {
    [`providers.${provider}`]: {
      accessToken,
      refreshToken,
      expiresAt,
    },
  };

  const result = await User.findOneAndUpdate(
    { email }, // Search by email
    { $set: update },
    { new: true, upsert: true }
  );

  if (!result) {
    throw new Error('Failed to update user');
  }

  return result;
}
