import { Request, Response } from "express";
import Company from "../models/Company";
import Job from "../models/Job";
import InterviewInviteModel from "../models/InterviewInviteModel";
import DeveloperNotification from "../models/DeveloperNotification";
import Developer from "../models/Developer"; // 👈 Shto këtë import
import CompanyProfile from "../models/CompanyProfileModel";

// ✅ Register Company
export const registerCompany = async (req: Request, res: Response) => {
  try {
    // Extract registration data
    const { companyName, email, password, confirmPassword, businessNumber, website, location } = req.body;
    // Krijo kompaninë
    const company = new Company({ companyName, email, password, confirmPassword, businessNumber, website, location });
    await company.save();

    // Krijo profilin bazë automatikisht
    await CompanyProfile.create({
      companyId: company._id,
      companyName: company.companyName,
      businessNumber: company.businessNumber,
      website: company.website,
      location: company.location || "",
      shortBio: "",
      mission: "",
      values: "",
      linkedIn: "",
      logoUrl: "",
      technologies: [],
      interestFields: [],
      managers: [],
      documents: {},
    });

    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// ✅ Get Companies with Jobs
export const getCompaniesWithOpenJobs = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find().lean();
    const companiesWithJobs = await Promise.all(
      companies.map(async (company) => {
        const jobs = await Job.find({ company: company._id });
        if (jobs.length > 0) return { ...company, jobs };
        return null;
      })
    );
    res.status(200).json(companiesWithJobs.filter(Boolean));
  } catch (error) {
    console.error("Error fetching companies with open jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Company Profile
export const updateCompanyProfile = async (req: Request, res: Response) => {
  try {
    // Merr id nga tokeni
    const companyId = req.user?._id;
    if (!companyId) return res.status(401).json({ message: "Unauthorized" });
    const updates = req.body;
    const updatedCompany = await Company.findByIdAndUpdate(companyId, updates, { new: true });
    if (!updatedCompany) return res.status(404).json({ message: "Kompania nuk u gjet." });
    res.status(200).json({ message: "Profili u përditësua me sukses.", company: updatedCompany });
  } catch (error) {
    console.error("❌ Error te updateCompanyProfile:", error);
    res.status(500).json({ message: "Gabim gjatë përditësimit të profilit." });
  }
};

// ✅ Create New Job
export const createJob = async (req: Request, res: Response) => {
  try {
    const { title, description, technologies, location, salary, deadline, jobType } = req.body;
    const companyId = req.user?._id;

    const job = await Job.create({
      title,
      description,
      technologies,
      location,
      salary,
      deadline,
      jobType,
      company: companyId,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
};

// ✅ 📤 Send Interview Invite
export const sendInterviewInvite = async (req: Request, res: Response) => {
  try {
    const { to, positionTitle, interviewDate, interviewLocation } = req.body;

    if (!to || !positionTitle || !interviewDate || !interviewLocation) {
      return res.status(400).json({ error: "Të dhënat janë të paplota" });
    }

    // Ruaje njoftimin në koleksionin e DeveloperNotification
    await DeveloperNotification.create({
      to,
      type: "interview",
      content: `Keni marrë ftesë për intervistë për pozitën: ${positionTitle}`,
      metadata: {
        date: interviewDate,
        location: interviewLocation,
      },
      createdAt: new Date(),
    });

    return res.status(200).json({ success: true, message: "Ftesa u dërgua me sukses." });
  } catch (error) {
    console.error("Gabim gjatë dërgimit të ftesës:", error);
    return res.status(500).json({ error: "Dështoi dërgimi i ftesës." });
  }
};

// ✅ Get Company Invites
export const getCompanyInterviewInvites = async (req: Request, res: Response) => {
  try {
    const { companyEmail } = req.query;
    const invites = await InterviewInviteModel.find({ companyEmail });
    res.json(invites);
  } catch (err) {
    console.error("Gabim në marrjen e ftesave:", err);
    res.status(500).json({ error: "Gabim gjatë marrjes së ftesave" });
  }
};

// ✅ Update Invite Status
export const updateInviteStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const invite = await InterviewInviteModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!invite) return res.status(404).json({ error: "Ftesa nuk u gjet" });

    res.json({ message: "Statusi u përditësua", invite });
  } catch (err) {
    console.error("Gabim në përditësimin e statusit:", err);
    res.status(500).json({ error: "Nuk u përditësua ftesa" });
  }
};

// ✅ Delete Invite
export const deleteInvite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await InterviewInviteModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Ftesa u fshi me sukses" });
  } catch (error) {
    console.error("Gabim gjatë fshirjes së ftesës:", error);
    res.status(500).json({ error: "Fshirja e ftesës dështoi" });
  }
};

// ✅ Get Companies
export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find({}, "name website location description");
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};
