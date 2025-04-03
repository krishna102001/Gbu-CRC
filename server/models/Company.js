import mongoose, { mongo } from "mongoose";

const companySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
