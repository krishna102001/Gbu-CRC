import express from "express";
import {
  addPlacementRecord,
  addStudentsRecord,
  deletePlacementRecord,
  editPlacementRecord,
  getPlacementRecord,
  getStudentsRecord,
  listOfCompany,
  listOfStudent,
  listOfStudentAppliedToCompany,
  // validateAdminToken,
} from "../controller/adminController.js";
import authMiddleWare from "../middleware/authMiddleware.js";
import roleMiddleWare from "../middleware/roleMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

//validate-token
// router.get("/validate-token", authMiddleWare, validateAdminToken);

// List of Company is registered ✅
router.get(
  "/list-of-company",
  authMiddleWare,
  roleMiddleWare("admin", "view"),
  listOfCompany
);

// List of Student is registered on job ✅
router.get(
  "/list-of-student",
  authMiddleWare,
  roleMiddleWare("admin", "view"),
  listOfStudent
);

//list of Student have applied for particular job ✅
router.get(
  "/list-of-student-applied",
  authMiddleWare,
  roleMiddleWare("admin", "view"),
  listOfStudentAppliedToCompany
);

// add placement record ✅
router.post(
  "/add-placement-record",
  authMiddleWare,
  roleMiddleWare("admin", "add"),
  addPlacementRecord
);

// add student record ✅
router.post(
  "/add-students-record",
  authMiddleWare,
  roleMiddleWare("admin", "add"),
  upload.single("file"),
  addStudentsRecord
);

// get student record
router.get(
  "/get-students-record",
  authMiddleWare,
  roleMiddleWare("admin", "view"),
  getStudentsRecord
);

//get the placement record ✅
router.get("/get-placement-record", getPlacementRecord);

//edit the placement record ✅
router.put(
  "/edit-placement-record/:id",
  authMiddleWare,
  roleMiddleWare("admin", "update"),
  editPlacementRecord
);

//delete the placement record ✅
router.delete(
  "/delete-placement-record/:id",
  authMiddleWare,
  roleMiddleWare("admin", "delete"),
  deletePlacementRecord
);

export default router;
