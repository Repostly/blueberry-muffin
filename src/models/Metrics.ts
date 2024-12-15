import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the TypeScript interface for the User model
export interface IMetrics extends Document {
  total_videos: number;
  total_time_saved: number;
  total_views_garnered: number
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
const MetricsSchema = new Schema<IMetrics>(
  {
    total_videos: {
      type: Number,
      required: true,
    },
    total_time_saved: {
      type: Number,
      required: true,
    },
    total_views_garnered: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create and export the User model
const Metrics: Model<IMetrics> = mongoose.models.Metrics || mongoose.model<IMetrics>('Metrics', MetricsSchema);
export default Metrics;
