import express from "express";
import multer = require("multer");
import {
  getDeveloperProfile,
  getDeveloperStats,
  updateDeveloperProfile,
  updateAbout,
  updateEducation,
  updateExperience,
  updatePersonal,
  getAllVerifiedDevelopers,
  notifyDeveloper,
  savePersonalInfo,
  applyForJob, // ⬅️ importo nga controller-i
} from "../controllers/developerController";
import authController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import path from "path"; 
import Developer from "../models/Developer";
import Company from "../models/Company";
import { Resend } from 'resend';

const router = express.Router();

// Upload personal info
router.post(
  "/developer/profile/personal",
  authMiddleware.verifyToken,
  authMiddleware.isDeveloper,
  (req, res, next) => {
    upload.fields([
      { name: "profilePhoto", maxCount: 1 },
      { name: "cv", maxCount: 1 },
    ])(req, res, next);
  },
  savePersonalInfo
);

router.post(
  "/apply",
  authMiddleware.verifyToken,
  authMiddleware.isDeveloper,
  applyForJob
);
// Profile info
router.get("/profile", authMiddleware.verifyToken, authMiddleware.isDeveloper, getDeveloperProfile);
router.get("/stats", getDeveloperStats);
router.get("/profile/:id", getDeveloperProfile);
router.get("/all", getAllVerifiedDevelopers);
router.get("/all-verified", getAllVerifiedDevelopers);
// /routes/developerRoutes.ts

const storage = multer.diskStorage({
  destination: "uploads/cvs",
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  },
});

const upload = multer({ storage });

// Login
router.post("/login", authController.loginDeveloper);

// Updates
router.put("/profile", authMiddleware.verifyToken, updateDeveloperProfile);
router.post("/profile/personal", authMiddleware.verifyToken, updatePersonal);
router.put("/profile/about", updateAbout);
router.put("/profile/experience", updateExperience);
router.put("/profile/education", updateEducation);

// Notifications
router.post("/notify", notifyDeveloper);

export default router;

