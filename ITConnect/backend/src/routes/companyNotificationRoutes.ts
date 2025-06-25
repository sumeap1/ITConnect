// routes/companyNotificationRoutes.ts
import express from "express";
import { getCompanyApplications, updateApplicationStatus, deleteApplication } from "../controllers/companyNotification.controller";

const router = express.Router();

// Kur një developer aplikon për një punë
// TODO: Implement sendApplicationNotification or use the correct controller function
// router.post("/apply", companyNotification.controller.sendApplicationNotification);

// Merr të gjitha njoftimet për një kompani sipas ID-së
router.get("/company/:companyId", getCompanyApplications);

router.put("/application/:id", updateApplicationStatus);
router.delete("/application/:id", deleteApplication);

export default router;
