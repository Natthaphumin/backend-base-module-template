// config/env.js
// ⚙️ Environment Configuration

import dotenv from "dotenv";

// โหลด .env file
dotenv.config();

/**
 * Environment Variables ที่จำเป็น
 * - ถ้าไม่มีจะ throw error ทันที
 */
const required = ["DATABASE_URL"];

// ตรวจสอบว่ามี env ที่จำเป็นครบหรือไม่
required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
});

/**
 * Export environment variables
 * - แปลงเป็น type ที่เหมาะสม
 * - มี default value
 */
export const env = {
  // Node environment (development, production, test)
  NODE_ENV: process.env.NODE_ENV || "development",

  // Server port
  PORT: Number(process.env.PORT) || 3000,

  // Database connection
  DATABASE_URL: process.env.DATABASE_URL,

  // JWT (ถ้ามีการใช้งาน authentication)
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  // CORS (ถ้ามีการใช้งาน)
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
};
