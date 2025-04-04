import express from "express";
import { addStudent } from "../controller/studentController.js";
import authMiddleWare from "../middleware/authMiddleware.js";
import roleMiddleWare from "../middleware/roleMiddleware.js";

const router = express.Router();

// student data will be added ✅
router.post(
  "/add-student",
  authMiddleWare,
  roleMiddleWare("admin", "add"),
  addStudent
);

export default router;
