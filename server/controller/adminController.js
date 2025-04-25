import Company from "../models/Company.js";
import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import PlacementRecord from "../models/PlacementRecord.js";
import { placementRecordSchema } from "../validation/placementRecordSchema.js";
import XLSX from "xlsx";
import Student from "../models/Student.js";

// List of Company is registered ✅
export const listOfCompany = async (req, res) => {
  try {
    const listCompanyExist = await Company.find({}).select(
      "name email phone image"
    );
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

// List of Student is registered on job ✅
export const listOfStudent = async (req, res) => {
  try {
    const listStudent = await User.find({ role: "student" }).select(
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

//list of Student have applied for particular job ✅
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

// add placement record ✅
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

// add students record ✅
export const addStudentsRecord = async (req, res) => {
  const dataFile = req.file;
  console.log(dataFile);
  if (!dataFile) {
    return res
      .status(403)
      .json({ success: false, message: "Student file record not found" });
  }
  try {
    const workbook = XLSX.readFile(dataFile.path);
    // console.log(workbook);
    const sheetName = workbook.SheetNames[0];
    // console.log(sheetName);
    const sheet = workbook.Sheets[sheetName];
    const studentData = XLSX.utils.sheet_to_json(sheet);

    const requiredField = ["registration", "name", "branch", "email", "phone"];
    const studentFilterData = studentData.map((data) => {
      const entry = {};
      for (let key of requiredField) {
        entry[key] = data[key] || "";
      }
      return entry;
    });
    await Student.deleteMany({});
    await Student.insertMany(studentFilterData);
    res.json({ success: true, message: "Successfully saved data!" });
  } catch (error) {
    console.error(error);
  }
};

// get students record ✅
export const getStudentsRecord = async (req, res) => {
  try {
    const data = await Student.find({});
    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to retrived the data" });
  }
};

//get the placement record ✅
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

//edit the placement record ✅
export const editPlacementRecord = async (req, res) => {
  const {
    session,
    numberOfCompanies,
    numberOfStudentsApplied,
    numberOfStudentsPlaced,
  } = req.body;
  const id = req.params.id;
  try {
    const placementRecordValidation = placementRecordSchema.parse({
      session,
      numberOfCompanies,
      numberOfStudentsApplied,
      numberOfStudentsPlaced,
    });
    const data = await PlacementRecord.findByIdAndUpdate(id, {
      session: placementRecordValidation.session,
      numberOfCompanies: placementRecordValidation.numberOfCompanies,
      numberOfStudentsApplied:
        placementRecordValidation.numberOfStudentsApplied,
      numberOfStudentsPlaced: placementRecordValidation.numberOfStudentsPlaced,
    });
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to Update" });
    }
    res.json({ success: true, message: "Successfully Updated" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: "Failed to Edit the Record" });
  }
};

//delete the placement record ✅
export const deletePlacementRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await PlacementRecord.findOneAndDelete({ _id: id });
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to delete" });
    }
    res.json({ success: true, message: "Succesfully Deleted" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to delete the record" });
  }
};
