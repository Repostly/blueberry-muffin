import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the TypeScript interface for the User model
export interface IAnalytics extends Document {
  total_videos: number;
  total_views: number;
  total_connections: number;
}

// Create the User schema
const AnalyticsSchema = new Schema<IAnalytics>(
  {
    total_videos: {
      type: Number,
      default: 0,
    },
    total_views: {
      type: Number,
      default: 0,
    },
    total_connections: {
      type: Number,
      default: 0,
    }
  }
);

// Create and export the User model
const Analytics: Model<IAnalytics> = mongoose.models.User || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
export default Analytics;
