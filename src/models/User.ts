import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Provider schema
const ProviderSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresAt: Date,
  },
  { _id: false } // Prevent automatic generation of an `_id` field for this subdocument
);

// Define the TypeScript interface for Provider data
interface ProviderData {
  accessToken: string;
  refreshToken: string;
  expiresAt?: Date;
}

// Define the TypeScript interface for the User model
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  providers: Map<string, ProviderData>;
  settings: mongoose.Types.ObjectId;
  analytics: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    providers: {
      type: Map,
      of: ProviderSchema, // Use the ProviderSchema for the `providers` field
      default: {},
    },
    settings: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Settings',
    },
    analytics: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Analytics',
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create and export the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
