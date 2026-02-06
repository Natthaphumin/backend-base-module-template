// modules/user/user.repository.js
// 🗄️ User Repository - Data Access Layer (In-Memory Mock Data)

import { mockUsers } from "../../data/mockUsers.js";

/**
 * 
 * ทำอะไร:
    1. เข้าถึงข้อมูล เท่านั้น (database/mock)
    2. ไม่มี logic อะไรเลย แค่ CRUD
    3. แยก data source ออกจาก business logic
 * 
 * In-Memory Database (Mock Data)
 * - ใช้ array เก็บข้อมูลแทน database
 * - เหมาะสำหรับ development และ testing
 */
let users = [...mockUsers]; // คัดลอก mock data มาใช้
let nextId = users.length + 1; // ID ถัดไปสำหรับ user ใหม่

/**
 * User Repository Class
 * - ทำงานกับ in-memory data (ไม่ต้องใช้ database)
 * - ทำหน้าที่ CRUD operations
 * - ไม่มี business logic (เอาไว้ใน service)
 */
export class UserRepository {
  /**
   * ดึง User ทั้งหมด
   * @returns {Promise<Array>} - รายการ users (ไม่มี password)
   */
  static async findAll() {
    // ไม่ return password เพื่อความปลอดภัย
    return users.map(({ password, ...user }) => user);
  }

  /**
   * ดึง User ตาม ID
   * @param {string} id - User ID
   * @returns {Promise<Object|null>} - User object หรือ null ถ้าไม่พบ
   */
  static async findById(id) {
    const user = users.find((u) => u.id === id);
    if (!user) return null;

    // ไม่ return password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * ดึง User ตาม email (รวม password สำหรับตรวจสอบ login)
   * @param {string} email - User email
   * @returns {Promise<Object|null>} - User object หรือ null ถ้าไม่พบ
   */
  static async findByEmail(email) {
    return users.find((u) => u.email === email) || null;
  }

  /**
   * สร้าง User ใหม่
   * @param {Object} data - ข้อมูล user
   * @returns {Promise<Object>} - User object ที่สร้างแล้ว (ไม่มี password)
   */
  static async create(data) {
    const newUser = {
      id: String(nextId++),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);

    // ไม่ return password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  /**
   * อัพเดท User
   * @param {string} id - User ID
   * @param {Object} data - ข้อมูลที่ต้องการอัพเดท
   * @returns {Promise<Object>} - User object ที่อัพเดทแล้ว
   */
  static async update(id, data) {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    // อัพเดทข้อมูล
    users[index] = {
      ...users[index],
      ...data,
      updatedAt: new Date(),
    };

    // ไม่ return password
    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  }

  /**
   * ลบ User
   * @param {string} id - User ID
   * @returns {Promise<Object>} - User object ที่ถูกลบ
   */
  static async delete(id) {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    const deletedUser = users[index];
    users.splice(index, 1);

    // ไม่ return password
    const { password, ...userWithoutPassword } = deletedUser;
    return userWithoutPassword;
  }

  /**
   * Reset ข้อมูลกลับเป็น mock data เริ่มต้น (สำหรับ testing)
   */
  static async reset() {
    users = [...mockUsers];
    nextId = users.length + 1;
  }
}
