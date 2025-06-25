import express from "express";
import { createJob, deleteInvite } from "../controllers/companyController";
import { getCompaniesWithOpenJobs } from "../controllers/getCompaniesWithOpenJobs";
import {
    sendInterviewInvite,
    getCompanyInterviewInvites,
    updateInviteStatus,
  } from "../controllers/companyController";
import { updateCompanyProfile } from "../controllers/companyController";
import { getCompanyProfile } from "../controllers/companyProfile.controller";
const router = express.Router();

router.get("/companies", getCompaniesWithOpenJobs);
router.post("/newjob", createJob);
router.post("/company/invite", sendInterviewInvite);
router.get("/company/interview-invites", getCompanyInterviewInvites);
router.patch("/company/invite/:id", updateInviteStatus);
router.delete("/invite/:id", deleteInvite);
router.patch("/profile/:companyId", updateCompanyProfile);
router.get("/profile/:companyId", getCompanyProfile);


export default router;
