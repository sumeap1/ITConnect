import Developer from '../models/Developer';
import Company from '../models/Company';

export const searchService = {
  // Search Developers
  async searchDevelopers(query: string) {
    try {
      const developers = await Developer.find({
        $or: [
          { skills: { $regex: query, $options: 'i' } },
          { preferredRoles: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } },
          { bio: { $regex: query, $options: 'i' } }
        ]
      }).select('-password');

      return developers;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Search Companies
  async searchCompanies(query: string) {
    try {
      const companies = await Company.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { industry: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ],
        isVerified: true
      }).select('-password -verificationDocuments');

      return companies;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Advanced Developer Search
  async advancedDeveloperSearch(filters: any) {
    try {
      const query: any = {};

      if (filters.skills && filters.skills.length > 0) {
        query.skills = { $all: filters.skills };
      }

      if (filters.experience) {
        query.experience = filters.experience;
      }

      if (filters.location) {
        query.location = { $regex: filters.location, $options: 'i' };
      }

      if (filters.roles && filters.roles.length > 0) {
        query.preferredRoles = { $in: filters.roles };
      }

      const developers = await Developer.find(query).select('-password');
      return developers;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Advanced Company Search
  async advancedCompanySearch(filters: any) {
    try {
      const query: any = { isVerified: true };

      if (filters.industry) {
        query.industry = filters.industry;
      }

      if (filters.companySize) {
        query.companySize = filters.companySize;
      }

      if (filters.location) {
        query.location = { $regex: filters.location, $options: 'i' };
      }

      const companies = await Company.find(query).select('-password -verificationDocuments');
      return companies;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}; 