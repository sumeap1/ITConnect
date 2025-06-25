import { Request, Response } from "express";
import Job from "../models/Job";
import Company from "../models/Company"; // nëse ke nevojë për kontrolle shtesë

// ➕ Krijo një shpallje të re
export const createJob = async (req: Request, res: Response) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Shpallja u ruajt me sukses!" });
  } catch (err) {
    console.error("Gabim në ruajtjen e shpalljes:", err);
    res.status(500).json({ message: "Gabim gjatë ruajtjes së shpalljes" });
  }
};

// 📥 Merr të gjitha shpalljet
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find()
      .populate({
        path: "company", // duhet të jetë emri i fushës në modelin Job
        select: "companyName website email", // çfarë fusha të marrë
      })
      .sort({ createdAt: -1 });

    // Mbrojtje ndaj mungesës së kompanisë
    const jobList = jobs.map((job) => ({
      id: job._id,
      title: job.title,
      description: job.description,
      location: job.location,
      companyName: job.company?.companyName || "e pa specifikuar",
      companyId: job.company?._id || null,
    }));

    res.status(200).json(jobList);
  } catch (err) {
    console.error("Gabim në marrjen e shpalljeve:", err);
    res.status(500).json({ message: "Gabim në marrjen e shpalljeve" });
  }
};
