import z from "zod";

export const placementRecordSchema = z.object({
  session: z.coerce.string(),
  numberOfCompanies: z.coerce.number(),
  numberOfStudentsApplied: z.coerce.number(),
  numberOfStudentsPlaced: z.coerce.number(),
});

export const emailSubscribeSchema = z.string().email();

export const registerUserSchema = z.object({
  name: z.string(),
  password: z.string().min(5),
  registration: z.string().min(11),
  email: z.string().email(),
  role: z.enum(["hr", "admin", "student", "pc"]),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const getUserDataSchema = z.string();

export const applyForJobSchema = z.object({
  jobId: z.string(),
  userId: z.string(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6),
});

export const checkStudentSchema = z.string().min(11);

export const addStudentSchema = z.object({
  registration: z.string().min(11),
  name: z.string(),
  phone: z.string().min(10).max(13),
});

export const chatWithAISchema = z.string();

export const registerHRSchema = z.object({
  name: z.string(),
  password: z.string().min(5),
  email: z.string().email(),
  role: z.string(),
});

export const registerCompanySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(8).max(13),
});

export const postJobSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(30),
  location: z.string(),
  salary: z.number(),
  level: z.string(),
  category: z.string(),
});
