import express from 'express';
import { newsletterController } from '../controllers/newsletter.controller';

const router = express.Router();

router.post('/subscribe', newsletterController.subscribe);
router.post('/unsubscribe', newsletterController.unsubscribe);

export default router; 