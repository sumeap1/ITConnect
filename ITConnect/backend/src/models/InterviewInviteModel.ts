import mongoose from "mongoose";
import CompanyProfile from "../models/CompanyProfileModel";

const InterviewInviteSchema = new mongoose.Schema({
  developerEmail: { type: String, required: true },
  companyEmail: { type: String, required: true },
  positionTitle: { type: String, required: true },
  interviewDate: { type: String, required: true },
  interviewTime: { type: String, required: true },
  interviewLocation: { type: String, required: true },
  status: { type: String, enum: ["pending", "sent", "cancelled"], default: "pending" },
}, { timestamps: true });

const InterviewInvite = mongoose.model("InterviewInvite", InterviewInviteSchema);
export default InterviewInvite;
