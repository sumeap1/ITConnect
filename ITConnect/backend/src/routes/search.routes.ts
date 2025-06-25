import express from 'express';
import { searchController } from '../controllers/search.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Basic search routes
router.get('/developers', searchController.searchDevelopers);
router.get('/companies', searchController.searchCompanies);

// Advanced search routes (protected)
router.post('/developers/advanced', authMiddleware.verifyToken, searchController.advancedDeveloperSearch);
router.post('/companies/advanced', authMiddleware.verifyToken, searchController.advancedCompanySearch);

export default router; 