// models/CompanyNotification.ts
import mongoose from "mongoose";

const CompanyNotificationSchema = new mongoose.Schema({
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Developer", required: true },
  type: { type: String, enum: ["application"], default: "application" },
  jobTitle: String,
  developerName: String,
  developerId: String,
  appliedDate: Date,
  experience: String,
  status: { type: String, enum: ["Pending", "Accepted", "Rejected", "Interview Scheduled"], default: "Pending" },
  interviewDate: Date,
  createdAt: { type: Date, default: Date.now },
});

const CompanyNotification =
  mongoose.models.CompanyNotification ||
  mongoose.model("CompanyNotification", CompanyNotificationSchema);

export default CompanyNotification;
