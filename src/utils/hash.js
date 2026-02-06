// utils/hash.js
// 🔐 Password Hashing Utilities

import bcrypt from "bcrypt";

/**
 * จำนวนรอบการ hash
 * - ยิ่งมากยิ่งปลอดภัย แต่ช้าลง
 * - 10 เป็นค่าที่แนะนำสำหรับ production
 */
const SALT_ROUNDS = 10;

/**
 * Hash password
 * - ใช้ bcrypt สำหรับ hash password
 * - ไม่สามารถ decrypt กลับมาได้
 *
 * @param {string} password - รหัสผ่านที่ต้องการ hash
 * @returns {Promise<string>} - รหัสผ่านที่ hash แล้ว
 */
export const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * เปรียบเทียบ password กับ hash
 * - ใช้เมื่อ login เพื่อตรวจสอบว่า password ถูกต้องหรือไม่
 *
 * @param {string} password - รหัสผ่านที่ user ป้อน
 * @param {string} hashedPassword - รหัสผ่านที่ hash ไว้ใน database
 * @returns {Promise<boolean>} - true ถ้าตรงกัน, false ถ้าไม่ตรง
 */
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
