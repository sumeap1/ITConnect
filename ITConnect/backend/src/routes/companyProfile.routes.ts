// src/routes/companyProfile.routes.ts

import express from "express";
import {
  createOrUpdateCompanyProfile,
  getCompanyProfile,
  updateCompanyDocuments,
} from "../controllers/companyProfile.controller";

const router = express.Router();

router.post("/profile", createOrUpdateCompanyProfile);
router.get("/profile/:companyId", getCompanyProfile);
router.put("/profile/documents", updateCompanyDocuments);

export default router;
