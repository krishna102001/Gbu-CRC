import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Company from "../models/Company.js";
import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminUser = await Admin.findOne({ email });
    if (!adminUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const isMatchPassword = await bcrypt.compare(password, adminUser.password);
    if (!isMatchPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Email/Password is Invalid" });
    }
    const token = await jwt.sign(
      { adminId: adminUser.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res
      .status(200)
      .json({ success: true, adminId: adminUser._id, adminToken: token });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: "Failed to Login" });
  }
};

export const adminSignup = async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (
      !(await Admin.create({
        email,
        password: hashedPassword,
        name: name,
        phone: phone,
      }))
    ) {
      return res.json({
        success: false,
        message: "Failed to save the admin data",
      });
    }
    res.json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Failed to Signup" });
  }
};

export const validateAdminToken = async (req, res) => {
  res.json({ success: true, adminId: req.adminId });
};

export const listOfCompany = async (req, res) => {
  try {
    const listCompanyExist = await Company.find({}).select("name email");
    if (!listCompanyExist) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to fetch the company list" });
    }
    res.json({ success: true, listCompanyExist });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, messsage: "Failed to load the company list" });
  }
};

export const listOfStudent = async (req, res) => {
  try {
    const listStudent = await User.find({}).select(
      "registration name email image"
    );
    if (!listOfStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to fetch the student list" });
    }
    return res.json({ success: true, listStudent });
  } catch (error) {
    return res
      .status(400)
      .json({ json: false, message: "Failed to load the student list" });
  }
};

export const listOfStudentAppliedToCompany = async (req, res) => {
  try {
    const listStudent = await JobApplication.find({})
      .select("status")
      .populate({
        path: "jobId",
        select: "title",
      })
      .populate({
        path: "userId",
        select: "name registration",
      })
      .populate({
        path: "companyId",
        select: "name",
      });
    if (!listStudent) {
      return res
        .status(400)
        .json({ success: true, message: "Failed to load the list" });
    }
    res.json({ success: true, listStudent });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to load the student applied to company",
    });
  }
};
