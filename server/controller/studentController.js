import Student from "../models/Student.js";

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
