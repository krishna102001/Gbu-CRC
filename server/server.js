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
import { defaultOtpCleanup } from "./utils/defaultOtpCleanup.js";
// Initialize Express
const app = express();

// Connect to MongoDB
await connectDB();
await connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) =>
  res.send("Welcome to GCPP(Gbu Campus Placement Platform)")
);

Sentry.setupExpressErrorHandler(app);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use("/api/company", companyRoutes);
app.use("/api/jobs", JobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

setInterval(() => defaultOtpCleanup(), 1000 * 60);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
