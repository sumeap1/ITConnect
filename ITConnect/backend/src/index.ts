import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";

import connectDB from "./lib/db";
import authRoutes from "./routes/auth.routes";
import searchRoutes from "./routes/search.routes";
import newsletterRoutes from "./routes/newsletter.routes";
import * as authController from "./controllers/auth.controller";
import developerRoutes from "./routes/developerRoutes";
import jobRoutes from "./routes/jobRoutes";
import companyRoutes from "./routes/companyRoutes";
import notificationRoutes from "./routes/DeveloperNotificationRoutes";
import developerNotificationRoutes from "./routes/DeveloperNotificationRoutes";
import companyNotificationRoutes from "./routes/companyNotificationRoutes";
import companyProfileRoutes from "./routes/companyProfile.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS middleware FIRST
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// ✅ Body parsers
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ✅ Static files
app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ Routes (only once per route!)
app.use("/api/companies", companyProfileRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", developerNotificationRoutes);
app.use("/api/notifications", companyNotificationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/developer", developerRoutes);
app.use("/api/developers", developerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/authcontroller", authRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/newsletter", newsletterRoutes);

// ✅ Legacy authController direct routing (optional)
const authControllerRouter = express.Router();
authControllerRouter.post("/register-company", authController.registerCompany);
authControllerRouter.post("/login-company", authController.loginCompany);
authControllerRouter.post("/register-developer", authController.registerDeveloper);
authControllerRouter.post("/login-developer", authController.loginDeveloper);
app.use("/api/authcontroller", authControllerRouter);

// ✅ Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// ✅ Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});

// ✅ Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`🌐 Frontend: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();




