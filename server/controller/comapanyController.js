import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import {
  getUserDataSchema,
  loginUserSchema,
  postJobSchema,
  registerCompanySchema,
  registerHRSchema,
} from "../validation/validationSchema.js";

// Register a HR ✅
export const registerHR = async (req, res) => {
  const { name, email, password, role } = req.body;
  const result = registerHRSchema.safeParse({
    name,
    password,
    email,
    role,
  });
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, messsage: "Incorrect Format" });
  }

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile || !role) {
    return res.json({ sucess: false, message: "All fields are required" });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.json({ success: false, message: "Hr Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const hr = await User.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
      role: role,
    });

    res.json({
      success: true,
      hr: {
        _id: hr._id,
        name: hr.name,
        email: hr.email,
        image: hr.image,
        role: hr.role,
      },
      token: generateToken(hr._id, hr.role),
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Register Company ✅
export const registerCompany = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = registerCompanySchema.safeParse({
    name,
    email,
    phone,
  });
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, messsage: "Incorrect Format" });
  }
  const imageFile = req.file;
  console.log(name, email, phone, imageFile);
  if (!name || !email || !phone || !imageFile) {
    return res
      .status(403)
      .json({ success: false, message: "All fields are Required" });
  }

  try {
    const companyExist = await Company.findOne({ email: email });
    console.log(companyExist);
    if (companyExist) {
      return res
        .status(400)
        .json({ success: false, message: "Company Already Exits" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      userId: req.userId,
      name,
      email,
      phone,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, messgae: error.message });
  }
};

// Hr Login ✅
export const loginHR = async (req, res) => {
  const { email, password } = req.body;
  const result = loginUserSchema.safeParse({ email, password });
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, messsage: "Incorrect Format" });
  }
  try {
    const hr = await User.findOne({ email });
    console.log(hr.password);
    console.log({ email, password });
    if (await bcrypt.compare(password, hr.password)) {
      res.json({
        success: true,
        company: {
          _id: hr._id,
          name: hr.name,
          email: hr.email,
          image: hr.image,
          role: hr.role,
        },
        token: generateToken(hr._id, hr.role),
      });
    } else
      res.json({
        sucess: false,
        message: "Invalid email or password",
      });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get company data ✅
export const getCompanyData = async (req, res) => {
  const userId = req.userId;
  const result = getUserDataSchema.safeParse(userId);
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, messsage: "Incorrect Format" });
  }
  try {
    const company = await Company.findOne({ userId });
    res.json({ sucess: true, company });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Post a new Job ✅
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  const userId = req.userId;
  const result = postJobSchema.safeParse({
    title,
    description,
    location,
    salary,
    level,
    category,
  });
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, messsage: "Incorrect Format" });
  }
  try {
    const company = await Company.findOne({ userId });
    if (!company) {
      return res
        .status(403)
        .json({ success: false, message: "Company not exist" });
    }

    const companyId = company._id;

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();

    res.json({ success: true, newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// edit job ✅
export const editJob = async (req, res) => {
  const { title, category, description, level, location, salary } = req.body;
  const userId = req.userId;
  const jobId = req.params["id"];
  const result = postJobSchema.safeParse({
    title,
    description,
    location,
    salary,
    level,
    category,
  });
  if (!result.success) {
    return res
      .status(400)
      .json({ success: false, messsage: "Incorrect Format" });
  }
  console.log("job id ", jobId);
  try {
    const company = await Company.findOne({ userId });
    if (!company) {
      return res
        .status(403)
        .json({ success: false, message: "Company not exist" });
    }
    const companyId = company._id;
    const data = await Job.updateOne(
      { _id: jobId, companyId },
      { title, category, description, level, location, salary }
    );
    res
      .status(200)
      .json({ success: true, message: "Successfully updated the job" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Company Job Applicants ✅
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const userId = req.userId;
    const result = getUserDataSchema.safeParse(userId);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, messsage: "Incorrect Format" });
    }

    const company = await Company.findOne({ userId });
    const companyId = company._id;
    // Find Job applications for the user
    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image email")
      .populate("resumeId", "userId resume")
      .populate("jobId", "title  location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Company  Posted Jobs ✅
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const userId = req.userId;
    const result = getUserDataSchema.safeParse(userId);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, messsage: "Incorrect Format" });
    }
    const company = await Company.findOne({ userId });
    const companyId = company._id;
    console.log("companyId:", companyId);

    const jobs = await Job.find({ companyId });
    console.log("jobs:", jobs);

    // adding No. of applicants
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        console.log("job:", job);
        const applicants = await JobApplication.find({ jobId: job._id });
        console.log("applicants:", applicants);
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    console.log("jobsData:", jobsData);

    // Adding No of appicants info in data
    res.json({ success: true, jobsData });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Change Job Application Status ✅
export const ChangeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const enumStatus = ["accepted", "rejected", "under-review", "pending"];
    // Find Job Application and update Status
    if (!enumStatus.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Status" });
    }

    const data = await JobApplication.findOneAndUpdate({ _id: id }, { status });
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Not found JobApplications" });
    }
    console.log(data);
    res.json({ success: true, message: "Status Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Change Job Visiblity ✅
export const changeVisiblity = async (req, res) => {
  try {
    const { id } = req.body;

    const userId = req.userId;
    const result = getUserDataSchema.safeParse(id);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, messsage: "Incorrect Format" });
    }

    const company = await Company.findOne({ userId });
    const companyId = company._id;

    const job = await Job.findById(id);

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }
    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
