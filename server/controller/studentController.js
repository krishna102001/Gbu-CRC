import { redisClient } from "../config/redis.js";
import Student from "../models/Student.js";

//adding student logic ✅
export const addStudent = async (req, res) => {
  const { registration, name, phone } = req.body;
  if (!registration || !name || !phone) {
    return res.json({ success: false, message: "All Fields Required" });
  }
  try {
    const studentExist = await Student.findOne({ registration });
    if (studentExist) {
      return res.json({ success: false, message: "Already Student Exist" });
    }
    await Student.create({
      registration: registration,
      name: name,
      phone: phone,
    });
    res.json({ success: true, message: "Student Added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// student upload the pdf ✅
export const uploadResumePdf = async (req, res) => {
  /* steps to follow 
      1. get the uploaded pdf file
      2. push to the event driven queue system
      3. response with the successfully uploaded
   */
  const resumefile = req.file;

  if (!resumefile) {
    return res
      .status(404)
      .json({ success: false, message: "File not found!!" });
  }

  if (resumefile.mimetype !== "application/pdf") {
    return res
      .status(400)
      .json({ success: false, message: "upload pdf file only!!" });
  }
  try {
    const file = {
      filename: resumefile.originalname,
      destination: resumefile.destination,
      path: resumefile.path,
    };
    console.log(file);
    await redisClient.lPush("resumeFiles", JSON.stringify(file));
    res
      .status(201)
      .json({ success: true, message: "Successfully uploaded the file" });
  } catch (error) {
    res
      .status(500)
      .json({ success: true, message: "Failed to upload the file" });
  }
};
