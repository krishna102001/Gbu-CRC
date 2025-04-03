import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  role: {
    type: String,
    enum: ["hr", "admin", "student", "pc"],
    default: "student",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
