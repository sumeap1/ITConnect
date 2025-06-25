// backend/src/models/DeveloperNotification.ts

import mongoose from "mongoose";

const DeveloperNotificationSchema = new mongoose.Schema({
  to: { type: String, required: true }, // Mund të jetë email ose ID
  type: { type: String, enum: ["interview", "rejected"], required: true },
  companyName: { type: String, required: true },
  positionTitle: { type: String, required: true },
  interviewDate: { type: String },       // Opsionale në rast se s'ka intervistë
  interviewLocation: { type: String },   // Opsionale gjithashtu
  createdAt: { type: Date, default: Date.now },
});

const DeveloperNotificationModel =
  mongoose.models.DeveloperNotification ||
  mongoose.model("DeveloperNotification", DeveloperNotificationSchema);

export default DeveloperNotificationModel;
