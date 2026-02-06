// modules/user/user.schema.js
// 📋 User Validation Schemas - กำหนดกฎการตรวจสอบข้อมูล User

/**
 * 
 * ทำอะไร:
    1. กำหนดกฎ validation
    2. แยกออกจาก code ดูง่าย แก้ง่าย
    3. ใช้กับ middleware validate()
 * 
 * 
 * Schema สำหรับสร้าง User ใหม่
 * - email: required, ต้องเป็น email format
 * - name: required, ความยาวอย่างน้อย 2 ตัวอักษร
 * - password: required, ความยาวอย่างน้อย 6 ตัวอักษร
 */
export const createUserSchema = {
  body: {
    email: {
      required: true, // ← ต้องมี
      type: "email", // ← format email
    },
    name: {
      required: true,
      type: "string",
      minLength: 2, // ← อย่างน้อย 2 ตัวอักษร
      maxLength: 100,
    },
    password: {
      required: true,
      type: "string",
      minLength: 6, // ← อย่างน้อย 6 ตัวอักษร
      maxLength: 100,
    },
  },
};

/**
 * Schema สำหรับอัพเดท User
 * - ทุกฟิลด์ไม่ required (update ได้เฉพาะที่ต้องการ)
 * - แต่ถ้ามีค่าส่งมา ต้องผ่านการตรวจสอบ
 */
export const updateUserSchema = {
  body: {
    email: {
      type: "email",
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 100,
    },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 100,
    },
  },
};

/**
 * Schema สำหรับ Login
 */
export const loginSchema = {
  body: {
    email: {
      required: true,
      type: "email",
    },
    password: {
      required: true,
      type: "string",
    },
  },
};
