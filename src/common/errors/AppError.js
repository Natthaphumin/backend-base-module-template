// common/errors/AppError.js
// 🎯 Custom Error Classes สำหรับจัดการ Error แบบมีมาตรฐาน

/**
 * Base Error Class
 * - ใช้เป็น parent class สำหรับ error ทุกประเภท
 * - isOperational = true หมายถึง error ที่เรารู้จักและควบคุมได้
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // บอกว่านี่คือ error ที่เรารู้จัก ไม่ใช่ bug
    Error.captureStackTrace(this, this.constructor); // เก็บ stack trace สำหรับ debug
  }
}

/**
 * 404 Not Found Error
 * ใช้เมื่อหาข้อมูลไม่เจอ (เช่น user id ไม่มีในระบบ)
 */
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

/**
 * 400 Validation Error
 * ใช้เมื่อข้อมูลที่ส่งมาไม่ผ่าน validation
 */
export class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, 400);
  }
}

/**
 * 401 Unauthorized Error
 * ใช้เมื่อไม่มีสิทธิ์เข้าถึง (ไม่ได้ login หรือ token หมดอายุ)
 */
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

/**
 * 403 Forbidden Error
 * ใช้เมื่อ login แล้วแต่ไม่มีสิทธิ์ทำ action นี้ (เช่น user ธรรมดาไม่สามารถลบ admin)
 */
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

/**
 * 409 Conflict Error
 * ใช้เมื่อข้อมูลซ้ำ (เช่น email ซ้ำในระบบ)
 */
export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, 409);
  }
}
