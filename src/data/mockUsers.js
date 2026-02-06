// data/mockUsers.js
// 📦 Mock Data สำหรับทดสอบ User Module

/**
 * ข้อมูล Users ตัวอย่างสำหรับทดสอบ
 * - ใช้สำหรับ development และ testing
 * - มี 5 users ตัวอย่าง
 */
export const mockUsers = [
  {
    id: "1",
    email: "john.doe@example.com",
    name: "John Doe",
    password: "password123",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    password: "password123",
    createdAt: new Date("2024-01-02T00:00:00.000Z"),
    updatedAt: new Date("2024-01-02T00:00:00.000Z"),
  },
  {
    id: "3",
    email: "bob.wilson@example.com",
    name: "Bob Wilson",
    password: "password123",
    createdAt: new Date("2024-01-03T00:00:00.000Z"),
    updatedAt: new Date("2024-01-03T00:00:00.000Z"),
  },
  {
    id: "4",
    email: "alice.jones@example.com",
    name: "Alice Jones",
    password: "password123",
    createdAt: new Date("2024-01-04T00:00:00.000Z"),
    updatedAt: new Date("2024-01-04T00:00:00.000Z"),
  },
  {
    id: "5",
    email: "charlie.brown@example.com",
    name: "Charlie Brown",
    password: "password123",
    createdAt: new Date("2024-01-05T00:00:00.000Z"),
    updatedAt: new Date("2024-01-05T00:00:00.000Z"),
  },
];

/**
 * ข้อมูลสำหรับทดสอบการสร้าง User ใหม่
 */
export const newUserData = {
  email: "newuser@example.com",
  name: "New User",
  password: "newpassword123",
};

/**
 * ข้อมูลสำหรับทดสอบการอัพเดท User
 */
export const updateUserData = {
  name: "Updated Name",
  email: "updated@example.com",
};

/**
 * ข้อมูลที่ไม่ผ่าน validation (สำหรับทดสอบ error)
 */
export const invalidUserData = {
  // ไม่มี email (required)
  name: "Invalid User",
  password: "123",
};

/**
 * Email ที่ไม่ถูกต้อง (สำหรับทดสอบ validation)
 */
export const invalidEmailData = {
  email: "not-an-email",
  name: "Invalid Email User",
  password: "password123",
};
