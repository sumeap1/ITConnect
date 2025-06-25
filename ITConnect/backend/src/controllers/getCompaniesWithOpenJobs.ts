import { Request, Response } from "express";
import Company from "../models/Company";
import Job from "../models/Job";

export const getCompaniesWithOpenJobs = async (req: Request, res: Response) => {
  console.log("\uD83D\uDCE1 /api/companies called");

  try {
    const companies = await Company.find();

    const companiesWithJobs = await Promise.all(
      companies.map(async (company) => {
        const jobs = await Job.find({ company: company._id });

        if (jobs.length > 0) {
          return {
            id: company._id,
            name: company.get("companyName"),
            website: company.get("website") || "",
            linkedin: company.get("linkedin") || "",
            jobs,
            openPositions: jobs.length,
          };
        }

        return null;
      })
    );

    const filtered = companiesWithJobs.filter(Boolean);
    res.status(200).json(filtered);
  } catch (error) {
    console.error("\u274C Error fetching companies with open jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
