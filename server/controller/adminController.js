import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminUser = await Admin.findOne({ email });
    if (!adminUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const isMatchPassword = await bcrypt.compare(password, adminUser.password);
    if (!isMatchPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Email/Password is Invalid" });
    }
    const token = await jwt.sign(
      { adminId: adminUser.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res
      .status(200)
      .json({ success: true, adminId: adminUser._id, adminToken: token });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: "Failed to Login" });
  }
};

export const adminSignup = async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (
      !(await Admin.create({
        email,
        password: hashedPassword,
        name: name,
        phone: phone,
      }))
    ) {
      return res.json({
        success: false,
        message: "Failed to save the admin data",
      });
    }
    res.json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Failed to Signup" });
  }
};

export const validateAdminToken = async (req, res) => {
  res.json({ success: true, adminId: req.adminId });
};
