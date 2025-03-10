import express from "express";
import { adminLogin, adminSignup } from "../controller/adminController.js";

const router = express.Router();

// login routes
router.post("/login", adminLogin);

//signup routes
router.post("/signup", adminSignup);

export default router;
