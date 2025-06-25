// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Company from '../models/Company';
import Developer from '../models/Developer';
import Job from '../models/Job';

import { authMiddleware } from '../middleware/auth.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '1d';

// ============================
// Company Registration
// ============================
export const registerCompany = async (req: Request, res: Response) => {
  try {
    const { companyName, email, password, businessNumber, website } = req.body;

    // 1. Validime...
    // 2. Check a ekziston kompania...

    const emailDomain = email.split('@')[1];
    let websiteDomain = "";
    try {
      if (website) {
        websiteDomain = new URL(
          website.startsWith("http") ? website : "http://" + website
        ).hostname.replace('www.', '');
      }
    } catch (e) {
      websiteDomain = "";
    }
    const isVerified = emailDomain === websiteDomain;

    // 3. ✅ KRIJO kompaninë në DB
    const company = new Company({
      companyName,
      email,
      password,
      confirmPassword: password,
      businessNumber,
      website,
      isVerified: true,
      requiresManualVerification: false,
    });

    // 4. ✅ Ruaje kompaninë në databazë
    await company.save();

    // 5. ✅ Krijo JWT
    const tokenJwt = jwt.sign(
      { id: company._id, type: 'company', isVerified: company.isVerified },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Regjistrimi i suksesshëm",
      company: {
        _id: company._id,
        companyName: company.companyName,
        businessNumber: company.businessNumber,
        email: company.email,
        isVerified: company.isVerified,
        requiresManualVerification: company.requiresManualVerification,
      },
      token: tokenJwt,
    });
  } catch (error: any) {
    console.error("Company registration error:", error);
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `A company with this ${field} already exists.`
      });
    }
    res.status(500).json({ success: false, message: "Gabim në regjistrim." });
  }
};

// ============================
// Company Login
// ============================
export const loginCompany = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!company.isVerified) {
      return res.status(403).json({ success: false, message: 'Company is not verified. Please wait for verification.' });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const emailDomain = email.split('@')[1];
    let websiteDomain = "";
    try {
      if (company.website) {
        websiteDomain = new URL(
          company.website.startsWith("http") ? company.website : "http://" + company.website
        ).hostname.replace('www.', '');
      }
    } catch (e) {
      websiteDomain = "";
    }

    if (emailDomain === websiteDomain && !company.isVerified) {
      company.isVerified = true;
      await company.save();
    }

    
    const token = jwt.sign(
      { id: company._id, type: 'company', isVerified: company.isVerified },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      company: {
        id: company._id,
        companyName: company.companyName,
        businessNumber: company.businessNumber,
        email: company.email,
        isVerified: company.isVerified,
      },
    });
  } catch (error) {
    console.error('Company login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// ============================
// Developer Registration
// ============================
export const registerDeveloper = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      bio,
      location,
      experience,
      skills,
      github,
      linkedin,
      portfolio,
      resume,
      preferredRoles,
      education,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !bio || !location || !experience || !skills) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const existingDeveloper = await Developer.findOne({ email });
    if (existingDeveloper) {
      return res.status(400).json({ success: false, message: 'Developer already exists' });
    }

    const developer = new Developer({
      firstName,
      lastName,
      email,
      password,
      bio,
      location,
      experience,
      skills,
      github,
      linkedin,
      portfolio,
      resume,
      preferredRoles,
      education,
      isVerified: true,
    });

    await developer.save();

    const jwtToken = jwt.sign(
      { id: developer._id, type: 'developer', isVerified: true },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: 'Developer registered successfully.',
      token: jwtToken,
      developer: {
        id: developer._id,
        isVerified: true,
      },
    });
  } catch (error: any) {
    console.error('Developer registration error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// ============================
// Developer Login
// ============================


export const loginDeveloper = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const developer = await Developer.findOne({ email });
    if (!developer) {
      return res.status(404).json({ message: "Email nuk u gjet." });
    }

    const isMatch = await bcrypt.compare(password, developer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Fjalëkalimi është i pasaktë." });
    }

    const token = jwt.sign(
      { id: developer._id, email: developer.email, type: 'developer', isVerified: (developer as any).isVerified },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      developerId: developer._id,
      developerName: `${developer.firstName} ${developer.lastName}`,
      isVerified: (developer as any).isVerified,
      email: developer.email
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Gabim në server gjatë login." });
  }
};

export const applyForJob = async (req: Request, res: Response) => {
  try {
    const { jobId, developerId } = req.body;
    if (!jobId || !developerId) {
      return res.status(400).json({ success: false, error: "Missing jobId or developerId" });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }
    const developer = await Developer.findById(developerId);
    if (!developer) {
      return res.status(404).json({ success: false, error: "Developer not found" });
    }
    // ... rest of logic
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to apply" });
  }
};

const authController = {
  registerCompany,
  loginCompany,
  registerDeveloper,
  loginDeveloper,
  applyForJob
};

export default authController;
