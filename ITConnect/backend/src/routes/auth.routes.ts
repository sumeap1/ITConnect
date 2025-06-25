// FILE: src/routes/auth.routes.ts

import { Router } from "express";
import {
  loginCompany,
  loginDeveloper,
  registerCompany,
  registerDeveloper,
} from "../controllers/auth.controller";
import { createJob } from "../controllers/jobController";
import { updateCompanyProfile } from "../controllers/companyController";

const router = Router();

// Auth routes
router.post("/register-company", registerCompany);
router.post("/login-company", loginCompany);
router.post("/register-developer", registerDeveloper);
router.post("/login-developer", loginDeveloper);

// Profile update (company & developer)
router.patch("/profile/:companyId", updateCompanyProfile);

// Job creation route
router.post("/jobs", createJob);

// Email verification route
router.get("/verify-email", async (req, res) => {
  const { token, type } = req.query;

  if (!token || !type) {
    return res.status(400).send("Mungon token ose type");
  }

  let Model: any;

  try {
    if (type === "developer") {
      const DevModule = await import("../models/Developer");
      Model = DevModule.default;
    } else if (type === "company") {
      const CompanyModule = await import("../models/Company");
      Model = CompanyModule.default;
    } else {
      return res.status(400).send("Type i pavlefshëm");
    }

    const user = await Model.findOne({ verificationToken: token });

    if (!user) return res.status(400).send("Token i pavlefshëm");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

  } catch (err) {
    console.error("Gabim gjatë verifikimit:", err);
    res.status(500).send("Gabim në server");
  }
});

export default router;