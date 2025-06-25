// src/controllers/companyProfile.controller.ts

import { Request, Response } from "express";
import CompanyProfile from "../models/CompanyProfileModel";
import Company from "../models/Company";
import mongoose from "mongoose";

/**
 * Create or Update a company profile
 */
export const createOrUpdateCompanyProfile = async (req: Request, res: Response) => {
  try {
    let { companyId } = req.body;
    if (!companyId) return res.status(400).json({ message: "companyId is required" });
    if (typeof companyId === "string") companyId = new mongoose.Types.ObjectId(companyId);
    const profileData = { ...req.body, companyId };

    const existingProfile = await CompanyProfile.findOne({ companyId });

    if (existingProfile) {
      const updated = await CompanyProfile.findOneAndUpdate(
        { companyId },
        { $set: profileData },
        { new: true }
      );
      return res.status(200).json(updated);
    } else {
      const newProfile = new CompanyProfile(profileData);
      await newProfile.save();
      return res.status(201).json(newProfile);
    }
  } catch (error) {
    console.error("Error updating/creating company profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get a single company profile
 */
export const getCompanyProfile = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    let profile = await CompanyProfile.findOne({ companyId });

    if (!profile) {
      // Fallback: Merr të dhënat nga Company nëse s'ka profil
      const company = await Company.findById(companyId).lean();
      if (!company) {
        return res.status(404).json({ message: "Profile not found" });
      }
      // Kthe vetëm fushat kryesore që ekzistojnë në Company
      return res.status(200).json({
        companyName: company.companyName,
        businessNumber: company.businessNumber,
        website: company.website,
        email: company.email,
        isVerified: company.isVerified,
        isEmailVerified: company.isEmailVerified,
        // Shto këtu edhe fusha të tjera nëse duhen
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching company profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Upload/update team photos or logo URLs (if you're not using file upload service)
 */
export const updateCompanyDocuments = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.body;
    const { logoFile, teamPhotos } = req.body;

    const updated = await CompanyProfile.findOneAndUpdate(
      { companyId },
      {
        $set: {
          "documents.logoFile": logoFile,
          "documents.teamPhotos": teamPhotos,
        },
      },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating documents:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
