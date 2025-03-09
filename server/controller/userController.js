import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";
import { generateOtp } from "../utils/generateOtp.js";
import { sendMail } from "../utils/sendMail.js";
import Otp from "../models/Otp.js";

// Register User Data
export const registerUser = async (req, res) => {
  const { name, password, registration, email } = req.body;
  const imageFile = req.file; //imageFile

  if (!name || !password || !registration || !email) {
    // every data is present or not
    return res.json({ success: false, messsage: "All Fields Are Required" });
  }
  try {
    const userExist = await User.findOne({ registration }); // check already account exist or not
    if (userExist) {
      return res.json({
        success: false,
        message: "Account Already Exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path); // image uploading in cloudinary

    const user = await User.create({
      name: name,
      email: email,
      registration: registration,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        image: user.image,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
        },
        token: generateToken(user._id),
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Email or Password is Wrong" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get user Data
export const getUserData = async (req, res) => {
  const authorization = req.headers.authorization;
  let token = "";
  if (!authorization.startsWith("Bearer ")) {
    return res.status(400).json({ success: false, message: "Not Authorized" });
  }
  token = authorization.substring(7, authorization.length);
  let userToken = jwt.decode(token);
  let userId = userToken.id;
  console.log(userId);
  console.log("User ID from request:", userId); // Log the user ID

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found in database"); // Log if user is not found
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log("Error fetching user:", error.message); // Log any errors
    res.json({ success: false, message: error.message });
  }
};

// Apply For a Job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const authorization = req.headers.authorization;
  if (!authorization.startsWith("Bearer ")) {
    return res.status(400).json({ success: false, message: "Not Authorized" });
  }
  const token = authorization.substring(7, authorization.length);
  const userToken = jwt.decode(token);
  const userId = userToken.id;
  console.log(userId);
  console.log("User ID from request:", userId); // Log the user ID

  try {
    const isAlreadyApplied = await JobApplication.findOne({ userId, jobId });

    if (isAlreadyApplied) {
      return res.json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get User applied applications
export const getUserJobApplications = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token = "";
    if (!authorization.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorized" });
    }
    token = authorization.substring(7, authorization.length);
    let userToken = jwt.decode(token);
    let userId = userToken.id;
    console.log(userId);
    console.log("User ID from request:", userId); // Log the user ID

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "No applications found for this User",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update User Profile (resume)
export const updateUserResume = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorized" });
    }

    const token = authorization.substring(7);
    const userToken = jwt.decode(token);
    const userId = userToken.id;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    console.log("Resume file:", resumeFile);

    // Validate File Type
    const allowedMimeTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!allowedMimeTypes.includes(resumeFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only PDF or images are allowed.",
      });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Upload to Cloudinary
    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type:
        resumeFile.mimetype === "application/pdf" ? "raw" : "image",
    });

    userData.resume = resumeUpload.secure_url;
    await userData.save();

    return res.json({
      success: true,
      message: "Resume Updated Successfully",
      resumeUrl: userData.resume,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Send OTP to user
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOtp();
    const emailContent = {
      title: "Verify Your Account",
      subject: "Your OTP Code For Registration | GBU CRC",
      message: "Please use the following OTP to complete your verification.",
    };
    const emailResponse = await sendMail(email, otp, emailContent);
    if (!emailResponse.success) {
      return res.json({ success: false, message: emailResponse.message });
    }
    await Otp.create({
      otp: otp,
      email: email,
    });
    return res
      .status(200)
      .json({ success: true, message: "OTP Sent Successfully" });
  } catch (error) {
    console.log("error hain", error);
    return res.json({ success: false, message: "Failed to send the otp" });
  }
};

//Verify OTP of user
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpExist = await Otp.findOne({ email });
    if (!otpExist) {
      return res.json({ success: false, message: "OTP/Email is Invalid" });
    }
    if (otp != otpExist.otp) {
      return res.json({ message: "OTP is Invalid" });
    }
    await Otp.deleteOne({ email });
    res
      .status(200)
      .json({ success: true, message: "OTP Verified Successfully" });
  } catch (error) {
    console.log("verify otp", error);
    return res.json({ success: false, message: "Failed to Verify OTP" });
  }
};

//check-student
export const checkStudent = async (req, res) => {
  const { registration } = req.body;
  try {
    const studentExist = await Student.findOne({ registration }); // check user is registered with univeristy or not
    if (!studentExist) {
      console.log("got called");
      return res.status(400).json({
        success: false,
        message: "Not Registered in University",
      });
    }

    res.json({ success: true, message: "Registered in University" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
