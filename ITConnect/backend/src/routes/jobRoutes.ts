import express from "express";
import { createJob, getAllJobs } from "../controllers/jobController";
const router = express.Router();


router.get("/jobs", getAllJobs);
router.post('/jobs', createJob); 

export default router;
