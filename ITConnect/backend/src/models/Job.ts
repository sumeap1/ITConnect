import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  technologies: { type: [String], required: true },
  location: { type: String, required: true },
  deadline: { type: Date, required: true },
  payment: { type: String },
  type: { type: String, enum: ["job", "freelance"], required: true },
}, {
  timestamps: true,
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
