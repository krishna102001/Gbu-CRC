import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "1m" },
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
