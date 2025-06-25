import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const developerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  experience: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], // kjo është shembull
    required: true
  },  
  education: {
    degree: String,
    institution: String,
    graduationYear: Number
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  portfolio: {
    type: String
  },
  github: {
    type: String
  },
  linkedin: {
    type: String
  },
  resume: {
    type: String
  },
  preferredRoles: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String,
    default: ""
  }
});

// Hash password before saving
developerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
developerSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export interface IDeveloper extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  skills: string[];
  experience: string;
  education?: {
    degree?: string;
    institution?: string;
    graduationYear?: number;
  };
  location: string;
  bio: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  resume?: string;
  preferredRoles?: string[];
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  experiences: [
    {
      position: String,
      company: String,
      period: String,
      description: string;
    }
  ];
  verificationToken: string;
  cvUrl: { type: String },
}

developerSchema.virtual("fullName").get(function (this: any) {
  return `${this.firstName} ${this.lastName}`;
});

developerSchema.virtual("technologies").get(function () {
  return this.skills;
});

developerSchema.set("toJSON", { virtuals: true });
developerSchema.set("toObject", { virtuals: true });


export const Developer = mongoose.model<IDeveloper>('Developer', developerSchema);

export default Developer; 