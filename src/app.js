// app.js
// 🚀 Express Application Setup

import express from "express";
import userRoutes from "./modules/user/user.route.js";
import { errorHandler, notFoundHandler } from "./common/errors/errorHandler.js";
import { logger } from "./common/utils/logger.js";

const app = express();

/**
 * Global Middlewares
 */

// 1. Parse JSON body
app.use(express.json());

// 2. Parse URL-encoded body
app.use(express.urlencoded({ extended: true }));

// 3. Request Logger - log ทุก request ที่เข้ามา
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

/**
 * API Routes
 * - แยก routes ตาม module
 * - ขึ้นต้นด้วย /api
 */

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// User routes
app.use("/api/users", userRoutes);

/**
 * Error Handlers
 * - ต้องอยู่ล่างสุดหลัง routes ทั้งหมด
 */

// 1. 404 Handler - จัดการ route ที่ไม่มีในระบบ
app.use(notFoundHandler);

// 2. Global Error Handler - จัดการ error ทั้งหมด
app.use(errorHandler);

export default app;
