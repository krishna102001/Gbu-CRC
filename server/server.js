import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import JobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/StudentRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import userSubscriptionRoutes from "./routes/userSubscriptionRoutes.js";
import { defaultOtpCleanup } from "./utils/defaultOtpCleanup.js";
import path from "path";
import { fileURLToPath } from "url";
import { InitializeRedis } from "./config/redis.js";
// import seedRoles from "./utils/seedRole.js";

//resolving dirname for es module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
export const app = express();

// Connect to MongoDB
await connectDB();
await connectCloudinary();
await InitializeRedis();

app.use(express.static(path.join(__dirname, "../client/dist")));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.get("/", (req, res) =>
//   res.send("Welcome to GCPP(Gbu Campus Placement Platform)")
// );

Sentry.setupExpressErrorHandler(app);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// await seedRoles();
const x = 42;
console.log(x);
app.use("/api/company", companyRoutes); //✅
app.use("/api/jobs", JobRoutes); //✅
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes); //✅
app.use("/api/admin", adminRoutes);
app.use("/api/subscriptions", userSubscriptionRoutes);

setInterval(() => defaultOtpCleanup(), 1000 * 60);

// static file should be written below other wise it will not work on any get request
// if you define at the top then it catches all GET requests, including /api/* routes — meaning any GET request to an API endpoint is
// intercepted before hitting your API route handlers. That's why GET requests are not reaching their actual route handlers, and you get
// the frontend index.html instead of API data.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
