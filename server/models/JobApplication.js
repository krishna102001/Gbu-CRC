import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  resumeId: { type: String, required: true, ref: "Resume" },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Job" },
  status: {
    type: String,
    enum: ["accepted", "rejected", "under-review", "pending"],
    required: true,
    default: "pending",
  },
  date: { type: Number, required: true },
});

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;
