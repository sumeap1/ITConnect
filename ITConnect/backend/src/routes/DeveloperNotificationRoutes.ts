import express from "express";
import { Request, Response } from "express";
import DeveloperNotificationModel from "../models/DeveloperNotification";
import { sendInterviewEmail } from "../lib/sendInterviewEmail";
import { sendDeveloperNotification } from "../controllers/developerNotification.controller";

const router = express.Router();

/**
 * @route POST /notifications/developer/send
 * Për dërgimin e njoftimit te developeri (nga controller)
 */
router.post("/developer/send", sendDeveloperNotification);

/**
 * @route POST /notifications/developer
 * Krijon një njoftim për developer (përdoret nga kompania)
 * Dërgon email nëse është ftesë për intervistë
 */
router.post("/developer", async (req: Request, res: Response) => {
  const { to, type, companyName, positionTitle, interviewDate, interviewLocation } = req.body;

  try {
    await DeveloperNotificationModel.create({
      to,
      type,
      companyName,
      positionTitle,
      interviewDate,
      interviewLocation,
      createdAt: new Date(),
    });

    if (type === "interview") {
      await sendInterviewEmail({ to, companyName, positionTitle, interviewDate, interviewLocation });
    }

    res.status(200).json({ message: "Notification created and email sent if applicable." });
  } catch (err) {
    console.error("Gabim në /notifications/developer:", err);
    res.status(500).json({ message: "Error creating notification." });
  }
});

/**
 * @route GET /notifications/developer
 * Merr njoftimet e developerit sipas emailit
 */
router.get("/developer", async (req: Request, res: Response) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const notifications = await DeveloperNotificationModel.find({ to: email }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Gabim në marrjen e njoftimeve:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

export default router;
