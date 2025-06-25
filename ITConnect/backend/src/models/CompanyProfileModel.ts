// src/models/CompanyProfileModel.ts

import mongoose, { Schema, Document } from "mongoose";

interface Manager {
  name: string;
  position: string;
  photoUrl?: string;
  linkedInUrl?: string;
}

export interface ICompanyProfile extends Document {
  companyId: mongoose.Types.ObjectId; // lidhje me kompaninë që është regjistruar
  companyName: string;
  logoUrl?: string;
  shortBio: string;
  mission: string;
  values: string;
  location: string;
  businessNumber: string;

  website?: string;
  linkedIn?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
  };

  technologies: string[];
  interestFields: string[];

  managers?: Manager[];

  documents?: {
    logoFile?: string;
    teamPhotos?: string[];
  };
}

const ManagerSchema = new Schema<Manager>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  photoUrl: { type: String },
  linkedInUrl: { type: String },
});

const CompanyProfileSchema = new Schema<ICompanyProfile>(
  {
    companyId: { type: Schema.Types.ObjectId, required: true, ref: "Company", unique: true },
    companyName: { type: String, required: true },
    logoUrl: { type: String },
    shortBio: { type: String, required: true },
    mission: { type: String, required: true },
    values: { type: String, required: true },
    location: { type: String, required: true },
    businessNumber: { type: String, required: true },

    website: { type: String },
    linkedIn: { type: String },
    socialMedia: {
      instagram: { type: String },
      facebook: { type: String },
    },

    technologies: [{ type: String }],
    interestFields: [{ type: String }],

    managers: [ManagerSchema],

    documents: {
      logoFile: { type: String },
      teamPhotos: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICompanyProfile>("CompanyProfile", CompanyProfileSchema);
