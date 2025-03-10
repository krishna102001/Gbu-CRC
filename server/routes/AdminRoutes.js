import express from "express";
import {
  adminLogin,
  adminSignup,
  listOfCompany,
  listOfStudent,
} from "../controller/adminController.js";
import adminMiddleWare from "../middleware/adminMiddleware.js";

const router = express.Router();

// login routes
router.post("/login", adminLogin);

//signup routes
router.post("/signup", adminSignup);

// List of Company is registered
router.get("/list-of-company", adminMiddleWare, listOfCompany);

// List of Student is registered on job
router.get("/list-of-student", adminMiddleWare, listOfStudent);

export default router;
