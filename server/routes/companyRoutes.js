import express from "express";
import {
  ChangeJobApplicationStatus,
  changeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginHR,
  postJob,
  registerCompany,
  registerHR,
} from "../controller/comapanyController.js";
import upload from "../config/multer.js";
import authMiddleWare from "../middleware/authMiddleware.js";
import roleMiddleWare from "../middleware/roleMiddleware.js";

const router = express.Router();

// Register a HR ✅
router.post("/register", upload.single("image"), registerHR);

// Login a HR ✅
router.post("/login", loginHR);

// Register Company ✅
router.post(
  "/register/company",
  upload.single("image"),
  authMiddleWare,
  roleMiddleWare("hr", "add"),
  registerCompany
);

// Get company Data ✅
router.get("/company", authMiddleWare, getCompanyData);

// Post a job ✅
router.post("/post-job", authMiddleWare, roleMiddleWare("hr", "add"), postJob);

// Get Applicants Data ✅
router.get(
  "/applicants",
  authMiddleWare,
  roleMiddleWare("hr", "view"),
  getCompanyJobApplicants
);

// Get company Job List ✅
router.get(
  "/list-jobs",
  authMiddleWare,
  roleMiddleWare("hr", "view"),
  getCompanyPostedJobs
);

// Change Applications Status ✅
router.post(
  "/change-status",
  authMiddleWare,
  roleMiddleWare("hr", "update"),
  ChangeJobApplicationStatus
);

// Change Applications Visiblity ✅
router.post(
  "/change-visibility",
  authMiddleWare,
  roleMiddleWare("hr", "update"),
  changeVisiblity
);

export default router;
