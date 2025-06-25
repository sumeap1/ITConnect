import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

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
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/api/companies", companyProfileRoutes);
app.use('/api/jobs', jobRoutes); 
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/notifications", developerNotificationRoutes);
app.use("/api/notifications", companyNotificationRoutes);
app.use("/api/developer", developerRoutes);
// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/authcontroller", authRoutes); // nëse ke ende nevojë për këtë
app.use("/api/developers", developerRoutes);

app.use('/uploads', express.static('uploads'));

app.use("/api/jobs", jobRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api", companyRoutes);
app.use("/api", jobRoutes); 
app.use("/api", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api", jobRoutes);
// ✅ Legacy authController direct routing (opsional)
const authControllerRouter = express.Router();
authControllerRouter.post("/register-company", authController.registerCompany);
authControllerRouter.post("/login-company", authController.loginCompany);
authControllerRouter.post("/register-developer", authController.registerDeveloper);
authControllerRouter.post("/login-developer", authController.loginDeveloper);
app.use("/api/authcontroller", authControllerRouter);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
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

app.use('/api/developer', developerRoutes);

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
