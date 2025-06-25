import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export interface INewsletter extends mongoose.Document {
  email: string;
  subscriptionDate: Date;
  isActive: boolean;
}

export const Newsletter = mongoose.model<INewsletter>('Newsletter', newsletterSchema);

export default Newsletter; 