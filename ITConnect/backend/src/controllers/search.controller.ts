import { Request, Response } from 'express';
import Developer from '../models/Developer';
import Company from '../models/Company';

export const searchController = {
  // Search Developers
  async searchDevelopers(req: Request, res: Response) {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const developers = await Developer.find({
        $or: [
          { skills: { $regex: query, $options: 'i' } },
          { preferredRoles: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } },
          { bio: { $regex: query, $options: 'i' } }
        ]
      }).select('-password');

      res.json({
        success: true,
        data: developers
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  // Search Companies
  async searchCompanies(req: Request, res: Response) {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const companies = await Company.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { industry: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ],
        isVerified: true
      }).select('-password -verificationDocuments');

      res.json({
        success: true,
        data: companies
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  // Advanced Developer Search
  async advancedDeveloperSearch(req: Request, res: Response) {
    try {
      const { skills, experience, location, roles } = req.body;
      const query: any = {};

      if (skills && skills.length > 0) {
        query.skills = { $all: skills };
      }

      if (experience) {
        query.experience = experience;
      }

      if (location) {
        query.location = { $regex: location, $options: 'i' };
      }

      if (roles && roles.length > 0) {
        query.preferredRoles = { $in: roles };
      }

      const developers = await Developer.find(query).select('-password');

      res.json({
        success: true,
        data: developers
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  // Advanced Company Search
  async advancedCompanySearch(req: Request, res: Response) {
    try {
      const { industry, companySize, location } = req.body;
      const query: any = { isVerified: true };

      if (industry) {
        query.industry = industry;
      }

      if (companySize) {
        query.companySize = companySize;
      }

      if (location) {
        query.location = { $regex: location, $options: 'i' };
      }

      const companies = await Company.find(query).select('-password -verificationDocuments');

      res.json({
        success: true,
        data: companies
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}; 