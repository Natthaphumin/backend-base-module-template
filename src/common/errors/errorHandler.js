// common/errors/errorHandler.js
// 🛡️ Global Error Handler - จัดการ error ทุกอันที่เกิดขึ้นในระบบ

import { logger } from "../utils/logger.js";

/**
 * Error Handler Middleware
 * - รับ error จาก controller/middleware ทั้งหมด
 * - แยกประเภท error และ return response ที่เหมาะสม
 * - log error เพื่อ debug
 *
 * @param {Error} err - Error object ที่เกิดขึ้น
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {Function} next - Express next function
 */
export const errorHandler = (err, req, res, next) => {
  // Log error พร้อม context เพื่อง่ายต่อการ debug
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
  });

  // ถ้าเป็น Operational Error (error ที่เรารู้จักและควบคุมได้)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // ถ้าเป็น Unknown Error (อันตราย อาจเป็น bug)
  // ไม่ควร expose รายละเอียด error ให้ user เห็น
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong", // Production ไม่ควรบอก error details
  });
};

/**
 * 404 Not Found Handler
 * ใช้เมื่อเรียก route ที่ไม่มีในระบบ
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
};
