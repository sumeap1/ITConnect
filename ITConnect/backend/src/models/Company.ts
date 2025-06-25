import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  businessNumber: {
    type: String,
    required: [true, 'Business number (NIPT) is required'],
    unique: true,
    trim: true
  },
  website: {
    type: String,
    required: [true, 'Company website is required'],
    trim: true
  },
  location: {
    type: String,
    required: false,
    trim: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  requiresManualVerification: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  verificationTokenExpires: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
companySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
companySchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if company is fully verified
companySchema.methods.isFullyVerified = function(): boolean {
  return this.isEmailVerified && this.isVerified && (!this.requiresManualVerification || this.isVerified);
};

const Company = mongoose.model('Company', companySchema);
import { Request, Response } from 'express';

export const getCompaniesWithOpenJobs = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find({}).select("name website linkedin");
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: "Gabim gjatë marrjes së kompanive." });
  }
};

export default Company; 