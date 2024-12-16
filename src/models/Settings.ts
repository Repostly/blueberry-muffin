import mongoose, { Schema, Document, Model } from 'mongoose';

const ProviderDefaultSchema = new Schema(
  {
    title: { type: String }, // For platforms like YouTube
    description: { type: String }, // For platforms like YouTube
    tags: { type: [String] }, // Array of tags for YouTube or TikTok
    caption: { type: String }, // For platforms like TikTok
  },
  { _id: false } // Prevent automatic `_id` field for subdocuments
);

// Define the TypeScript interface for Provider Defaults
export interface ProviderDefaults {
  title?: string;
  description?: string;
  tags?: string[];
  caption?: string;
}

// Define the TypeScript interface for the User model
export interface ISettings extends Document {
  provider_defaults: Map<string, ProviderDefaults>;
}

// Create the User schema
const SettingsSchema = new Schema<ISettings>(
  {
    provider_defaults: {
      type: Map,
      of: ProviderDefaultSchema,
      default: {}
    }
  }
);

// Create and export the User model
const Settings: Model<ISettings> = mongoose.models.User || mongoose.model<ISettings>('Settings', SettingsSchema);
export default Settings;
