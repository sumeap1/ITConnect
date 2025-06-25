import { Request, Response } from "express";
import DeveloperNotification from "../models/DeveloperNotification";

export const sendDeveloperNotification = async (req: Request, res: Response) => {
  try {
    const { to, type, positionTitle, interviewDate, interviewLocation, companyName } = req.body;

    const notification = new DeveloperNotification({
      to,
      type,
      positionTitle,
      interviewDate,
      interviewLocation,
      companyName,
    });

    await notification.save();
    res.status(201).json({ message: "Njoftimi u dërgua me sukses" });
  } catch (err) {
    console.error("Gabim në dërgimin e njoftimit te developeri:", err);
    res.status(500).json({ message: "Gabim në server" });
  }
};
