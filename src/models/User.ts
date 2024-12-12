import mongoose from 'mongoose';

const ProviderSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: String,
  expiresAt: Date,
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  providers: {
    type: Map,
    of: ProviderSchema,
    default: {},
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
