// controllers/companyNotificationController.ts

import { Request, Response } from "express";
import CompanyNotification from "../models/CompanyNotification";

// ➕ Dërgo njoftim kur një developer aplikon për punë
export const sendApplicationNotification = async (req: Request, res: Response) => {
  try {
    const { companyId, developerId, developerName, jobTitle } = req.body;

    const notification = new CompanyNotification({
      to: companyId,
      from: developerId,
      developerName,
      developerId,
      jobTitle,
    });

    await notification.save();
    res.status(201).json({ message: "Njoftimi u dërgua!" });
  } catch (err) {
    console.error("Gabim gjatë dërgimit të njoftimit:", err);
    res.status(500).json({ message: "Gabim gjatë dërgimit të njoftimit" });
  }
};

// ✅ Merr njoftimet për një kompani të caktuar
export const getCompanyNotifications = async (req: Request, res: Response) => {
  const { companyId } = req.params;

  try {
    const notifications = await CompanyNotification.find({ to: companyId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error("Gabim gjatë marrjes së njoftimeve:", err);
    res.status(500).json({ message: "Gabim gjatë marrjes së njoftimeve" });
  }
};

export const getCompanyApplications = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).json({ success: false, error: "companyId is required" });
    }
    const applications = await CompanyNotification.find({ to: companyId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching company applications:", error);
    res.status(500).json({ success: false, error: "Failed to fetch applications" });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, interviewDate } = req.body;
    const update: any = { status };
    if (status === "Interview Scheduled" && interviewDate) update.interviewDate = interviewDate;
    const app = await CompanyNotification.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json({ success: true, application: app });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ success: false, error: "Failed to update application" });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await CompanyNotification.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ success: false, error: "Failed to delete application" });
  }
};
