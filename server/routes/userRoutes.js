import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  checkStudent,
} from "../controller/userController.js";
import upload from "../config/multer.js";
import authMiddleWare from "../middleware/authMiddleware.js";
import roleMiddleWare from "../middleware/roleMiddleware.js";

const router = express.Router();

// Register Student 👍🏻

router.post("/register", upload.single("image"), registerUser);

//Login Student ✅

router.post("/login", loginUser);

// Get User Data ✅

router.get("/user", getUserData);

// Send OTP ✅
router.post("/send-otp", sendOtp);

//Verify OTP ✅
router.post("/verify-otp", verifyOtp);

//Check STUDENT ✅
router.post("/check-student", checkStudent);

// Apply for a Job ❌

router.post(
  "/apply",
  authMiddleWare,
  roleMiddleWare("student", "add"),
  applyForJob
);

// Get applied jobs data 👍🏻
router.get(
  "/applications",
  authMiddleWare,
  roleMiddleWare("student", "view"),
  getUserJobApplications
);

// Update the resume ✅

router.post(
  "/update-resume",
  authMiddleWare,
  roleMiddleWare("student", "update"),
  upload.single("resume"),
  updateUserResume
);

export default router;
