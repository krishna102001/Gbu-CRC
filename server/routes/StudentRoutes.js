import express from "express";
import {
  addStudent,
  uploadResumePdf,
} from "../controller/studentController.js";
import authMiddleWare from "../middleware/authMiddleware.js";
import roleMiddleWare from "../middleware/roleMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// student data will be added ✅
router.post(
  "/add-student",
  authMiddleWare,
  roleMiddleWare("admin", "add"),
  addStudent
);

// student upload the resume pdf
router.post("/upload/pdf", upload.single("pdf"), uploadResumePdf);

export default router;
