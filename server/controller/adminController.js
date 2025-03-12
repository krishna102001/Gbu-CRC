import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Company from "../models/Company.js";
import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import PlacementRecord from "../models/PlacementRecord.js";
import { placementRecordSchema } from "../validation/placementRecordSchema.js";

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
    res.status(200).json({
      success: true,
      adminUser: {
        email: adminUser.email,
        name: adminUser.name,
        _id: adminUser._id,
        phone: adminUser.phone,
      },
      adminToken: token,
    });
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

// export const validateAdminToken = async (req, res) => {
//   const _id = req.adminId;
//   try {
//     const data = await Admin.findOne({ _id });
//     res.json({ success: true, data });
//   } catch (error) {
//     return res.json({ success: false, message: "Failed to validate token" });
//   }
// };

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

export const addPlacementRecord = async (req, res) => {
  const {
    session,
    numberOfCompanies,
    numberOfStudentsApplied,
    numberOfStudentsPlaced,
  } = req.body;

  try {
    const placementRecordValidation = placementRecordSchema.parse({
      session,
      numberOfCompanies,
      numberOfStudentsApplied,
      numberOfStudentsPlaced,
    });
    // console.log(placementRecordValidation.session);
    const placementRecord = await PlacementRecord.create({
      session: placementRecordValidation.session,
      numberOfCompanies: placementRecordValidation.numberOfCompanies,
      numberOfStudentsApplied:
        placementRecordValidation.numberOfStudentsApplied,
      numberOfStudentsPlaced: placementRecordValidation.numberOfStudentsPlaced,
    });
    if (!placementRecord) {
      return res.status(400).json({
        success: false,
        message: "Failed to Add the Placement Record",
      });
    }
    res.json({ success: true, message: "Placement Record added successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Failed to Add the Record" });
  }
};

export const getPlacementRecord = async (req, res) => {
  try {
    const placementRecord = await PlacementRecord.find({});
    if (!placementRecord) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch the record" });
    }
    res.json({ success: true, placementRecord });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Failed to load the placement Record" });
  }
};
