import { Request, Response } from "express";
import Developer from "../models/Developer";
import DeveloperNotification from "../models/DeveloperNotification";
import CompanyNotification from "../models/CompanyNotification";
import Job from "../models/Job";
import { Resend } from "resend";

// ✅ Get full developer profile
export const getDeveloperProfile = async (req: Request, res: Response) => {
  try {
    // Merr email-in nga query ose nga tokeni (req.user)
    let email = req.query.email;
    if (!email && req.user) {
      // Në token, zakonisht kemi id, por mund të kemi edhe email
      if ((req.user as any).email) {
        email = (req.user as any).email;
      } else {
        // Nëse kemi vetëm id, kërko developerin me id
        const developer = await Developer.findById((req.user as any)._id);
        if (!developer) {
          return res.status(404).json({ success: false, error: "Developer not found" });
        }
        return res.status(200).json({ success: true, developer });
      }
    }
    if (!email || typeof email !== "string") {
      return res.status(400).json({ success: false, error: "Email is required" });
    }
    const developer = await Developer.findOne({ email });
    if (!developer) {
      return res.status(404).json({ success: false, error: "Developer not found" });
    }
    res.status(200).json({ success: true, developer });
  } catch (err) {
    console.error("GET profile error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch developer profile" });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { developerId } = req.query;
    if (!developerId) {
      return res.status(400).json({ success: false, error: "developerId is required" });
    }
    const notifications = await DeveloperNotification.find({ developerId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch notifications" });
  }
};

export const updateDeveloperProfile = async (req: Request, res: Response) => {
  try {
    // Merr email ose id nga tokeni
    let email = req.body.email;
    let developer;
    if (!email && req.user) {
      if ((req.user as any).email) {
        email = (req.user as any).email;
        developer = await Developer.findOne({ email });
      } else if ((req.user as any)._id) {
        developer = await Developer.findById((req.user as any)._id);
      }
    } else if (email) {
      developer = await Developer.findOne({ email });
    }
    if (!developer) {
      return res.status(404).json({ success: false, error: "Developer not found" });
    }
    // Përditëso fushat
    const updateFields = (({
      firstName, lastName, location, bio, skills, experience, education, portfolio, github, linkedin, resume, preferredRoles
    }) => ({
      firstName, lastName, location, bio, skills, experience, education, portfolio, github, linkedin, resume, preferredRoles
    }))(req.body);
    Object.entries(updateFields).forEach(([key, value]) => {
      if (value !== undefined) {
        (developer as any)[key] = value;
      }
    });
    await developer.save();
    res.status(200).json({ success: true, developer });
  } catch (err) {
    console.error("UPDATE profile error:", err);
    res.status(500).json({ success: false, error: "Failed to update developer profile" });
  }
};

export const updatePersonal = async (req: Request, res: Response) => {
  const { email, name, phone, location, profilePhotoUrl, cvUrl } = req.body;
  try {
    const developer = await Developer.findOneAndUpdate(
      { email },
      { name, phone, location, profilePhotoUrl, cvUrl },
      { new: true }
    );
    res.json({ success: true, developer });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to update personal info" });
  }
};

export const updateAbout = async (req: Request, res: Response) => {
  const { email, title, bio, technologies, experienceLevel, availability, github, linkedin } = req.body;
  try {
    const developer = await Developer.findOneAndUpdate(
      { email },
      { title, bio, technologies, experienceLevel, availability, github, linkedin },
      { new: true }
    );
    res.json({ success: true, developer });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to update about info" });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  const { email, experiences } = req.body;
  try {
    const developer = await Developer.findOneAndUpdate(
      { email },
      { experiences },
      { new: true }
    );
    res.json({ success: true, developer });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to update experience" });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  const { email, education } = req.body;
  try {
    const developer = await Developer.findOneAndUpdate(
      { email },
      { education },
      { new: true }
    );
    res.json({ success: true, developer });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to update education" });
  }
};

export const getAllVerifiedDevelopers = async (req: Request, res: Response) => {
  try {
    const developers = await Developer.find({ isVerified: true }).select(
      "firstName lastName email location bio education skills experience resume profilePicture"
    );
    res.status(200).json(developers);
  } catch (err) {
    console.error("Gabim:", err);
    res.status(500).json({ error: "Nuk u arrit të merret lista e zhvilluesve." });
  }
};

export const getDeveloperStats = async (req: Request, res: Response) => {
  try {
    const email = (req.query.email || "developer@email.com") as string;
    const developer = await Developer.findOne({ email });
    if (!developer) {
      return res.status(404).json({ success: false, error: "Developer not found" });
    }
    const stats = (developer as any).stats || {
      applicationsMade: 0,
      positionsAccepted: 0,
      profileViews: 0,
    };
    res.json({ success: true, stats });
  } catch (err) {
    console.error("getDeveloperStats error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch stats" });
  }
};

export const notifyDeveloper = async (req: Request, res: Response) => {
  try {
    const { to, type, companyName, positionTitle, interviewDate, interviewLocation } = req.body;
    const notification = new DeveloperNotification({
      to, type, companyName, positionTitle, interviewDate, interviewLocation
    });
    await notification.save();
    res.status(201).json({ success: true, message: "Njoftimi u dërgua me sukses." });
  } catch (error) {
    console.error("Gabim gjatë ruajtjes së njoftimit:", error);
    res.status(500).json({ success: false, message: "Gabim në server." });
  }
};

export const getAllDevelopers = async (req: Request, res: Response) => {
  try {
    const developers = await Developer.find({ developerVerified: true });
    res.status(200).json(developers);
  } catch (error) {
    console.error("Error fetching developers:", error);
    res.status(500).json({ error: "Failed to fetch developers" });
  }
};

export const savePersonalInfo = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const developer = await Developer.findOne({ email });
    if (!developer) {
      return res.status(404).json({ success: false, message: "Developer not found" });
    }
    developer.set('name', req.body.name);
    developer.set('phone', req.body.phone);
    developer.set('location', req.body.location);

    const files = (req as any).files;
    if (files?.profilePhoto?.[0]) {
      developer.set('profilePhotoUrl', `/uploads/${files.profilePhoto[0].filename}`);
    }
    if (files?.cv?.[0]) {
      developer.set('cvUrl', `/uploads/${files.cv[0].filename}`);
    }
    await developer.save();
    res.json({ success: true, message: "Të dhënat personale u ruajtën me sukses." });
  } catch (err) {
    console.error("Error saving personal info:", err);
    res.status(500).json({ success: false, message: "Server error while saving personal info." });
  }
};

// Developer applies for a job
export const applyForJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.body;
    const developerId = req.user?._id;
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
    await CompanyNotification.create({
      to: job.company,
      from: developer._id,
      type: "application",
      jobTitle: job.title,
      developerName: (developer.firstName && developer.lastName) ? `${developer.firstName} ${developer.lastName}` : developer.email,
      developerId: developer._id,
      appliedDate: new Date(),
      experience: developer.experience || "",
      status: "Pending"
    });
    return res.json({ success: true, message: "Application sent" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to apply" });
  }
};
