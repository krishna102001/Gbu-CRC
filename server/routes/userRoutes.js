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
import rateLimiter from "../middleware/rate-limitter.js";

const router = express.Router();

// 👍🏻 - under review till now working
// ✅ - done might break then have to visit
// ❌ - didn't tested out yet

// Register Student ✅

router.post("/register", upload.single("image"), registerUser);

//Login Student ✅

router.post("/login", loginUser);

// Get User Data ✅

router.get("/user", authMiddleWare, getUserData);

// Send OTP ✅
router.post("/send-otp", rateLimiter(4), sendOtp);

//Verify OTP ✅
router.post("/verify-otp", rateLimiter(5), verifyOtp);

//Check STUDENT ✅
router.post("/check-student", checkStudent);

// Apply for a Job ✅

router.post(
  "/apply",
  authMiddleWare,
  roleMiddleWare("student", "update"),
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
