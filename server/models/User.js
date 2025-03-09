import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registration: { type: String, required: true, unique: true },
  resume: { type: String },
  image: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
