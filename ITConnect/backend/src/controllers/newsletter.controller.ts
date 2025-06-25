import { Request, Response } from 'express';
import Newsletter from '../models/Newsletter';

export const newsletterController = {
  async subscribe(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required'
        });
      }

      // Check if email already exists
      const existingSubscription = await Newsletter.findOne({ email });
      if (existingSubscription) {
        if (existingSubscription.isActive) {
          return res.status(400).json({
            success: false,
            error: 'Email is already subscribed'
          });
        } else {
          // Reactivate subscription
          existingSubscription.isActive = true;
          await existingSubscription.save();
          return res.status(200).json({
            success: true,
            message: 'Subscription reactivated successfully'
          });
        }
      }

      // Create new subscription
      const newsletter = new Newsletter({ email });
      await newsletter.save();

      res.status(201).json({
        success: true,
        message: 'Subscribed successfully'
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  async unsubscribe(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required'
        });
      }

      const subscription = await Newsletter.findOne({ email });
      if (!subscription) {
        return res.status(404).json({
          success: false,
          error: 'Subscription not found'
        });
      }

      subscription.isActive = false;
      await subscription.save();

      res.json({
        success: true,
        message: 'Unsubscribed successfully'
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}; 