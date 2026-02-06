// common/middlewares/validate.js
// ✅ Validation Middleware - ตรวจสอบข้อมูลก่อนเข้า controller

import { ValidationError } from "../errors/AppError.js";

/**
 * Validation Middleware
 * - ตรวจสอบ req.body ตาม schema ที่กำหนด
 * - ถ้าไม่ผ่านจะ throw ValidationError
 *
 * Schema format:
 * {
 *   body: {
 *     email: { required: true, type: 'email' },
 *     name: { required: true, minLength: 2, maxLength: 50 },
 *     age: { type: 'number', min: 0, max: 120 }
 *   }
 * }
 *
 * @param {Object} schema - Validation schema
 * @returns {Function} - Express middleware
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const errors = [];

    // ตรวจสอบ body
    if (schema.body) {
      for (const [field, rules] of Object.entries(schema.body)) {
        const value = req.body[field];

        // 1. ตรวจสอบ required field
        if (rules.required && !value) {
          errors.push(`${field} is required`);
          continue;
        }

        // ถ้าไม่มีค่าและไม่ required ก็ข้ามไป
        if (!value) continue;

        // 2. ตรวจสอบ type
        if (rules.type) {
          // Email format
          if (rules.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errors.push(`${field} must be a valid email`);
            }
          }

          // Number type
          if (rules.type === "number") {
            if (typeof value !== "number" || isNaN(value)) {
              errors.push(`${field} must be a number`);
            }
          }

          // String type
          if (rules.type === "string") {
            if (typeof value !== "string") {
              errors.push(`${field} must be a string`);
            }
          }
        }

        // 3. ตรวจสอบ minLength (สำหรับ string)
        if (rules.minLength && value.length < rules.minLength) {
          errors.push(
            `${field} must be at least ${rules.minLength} characters`,
          );
        }

        // 4. ตรวจสอบ maxLength (สำหรับ string)
        if (rules.maxLength && value.length > rules.maxLength) {
          errors.push(`${field} must not exceed ${rules.maxLength} characters`);
        }

        // 5. ตรวจสอบ min (สำหรับ number)
        if (rules.min !== undefined && value < rules.min) {
          errors.push(`${field} must be at least ${rules.min}`);
        }

        // 6. ตรวจสอบ max (สำหรับ number)
        if (rules.max !== undefined && value > rules.max) {
          errors.push(`${field} must not exceed ${rules.max}`);
        }

        // 7. ตรวจสอบ pattern (regex)
        if (rules.pattern && !rules.pattern.test(value)) {
          errors.push(`${field} format is invalid`);
        }

        // 8. ตรวจสอบ enum (ค่าที่อนุญาต)
        if (rules.enum && !rules.enum.includes(value)) {
          errors.push(`${field} must be one of: ${rules.enum.join(", ")}`);
        }
      }
    }

    // ถ้ามี error ให้ throw ValidationError
    if (errors.length > 0) {
      throw new ValidationError(errors.join("; "));
    }

    // ถ้าผ่านหมดให้ไปต่อ
    next();
  };
};
