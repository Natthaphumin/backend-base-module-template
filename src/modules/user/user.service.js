// modules/user/user.service.js
// 💼 User Service - Business Logic Layer

import { UserRepository } from "./user.repository.js";
import { NotFoundError, ConflictError } from "../../common/errors/AppError.js";
import { hashPassword } from "../../utils/hash.js";

/**
 * User Service Class
 * - ประมวลผล business logic
 * - validate ข้อมูล
 * - เรียกใช้ repository เพื่อติดต่อ database
 * - throw custom errors เมื่อเจอปัญหา
 */
export class UserService {
  /**
   * ดึง User ทั้งหมด
   * @returns {Promise<Array>} - รายการ users
   */
  static async getAll() {
    return UserRepository.findAll();
  }

  /**
   * ดึง User ตาม ID
   * @param {string} id - User ID
   * @returns {Promise<Object>} - User object
   * @throws {NotFoundError} - ถ้าไม่พบ user
   */
  static async getById(id) {
    const user = await UserRepository.findById(id);

    // ถ้าไม่เจอ user ให้ throw error
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  /**
   * 
   * ทำอะไร:
    1. ตรรกะทางธุรกิจ
    2. ตรวจสอบเงื่อนไข (เช่น email ซ้ำ, user มีอยู่จริงไหม)
    3. เรียก repository เพื่อจัดการข้อมูล
   * 
   * สร้าง User ใหม่
   * @param {Object} data - ข้อมูล user { email, name, password }
   * @returns {Promise<Object>} - User object ที่สร้างแล้ว
   * @throws {ConflictError} - ถ้า email ซ้ำ
   */
  static async create(data) {
    // ตรวจสอบว่า email ซ้ำหรือไม่
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

    // Hash password ก่อนเก็บ (ถ้ามี password)
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    return UserRepository.create(data);
  }

  /**
   * อัพเดท User
   * @param {string} id - User ID
   * @param {Object} data - ข้อมูลที่ต้องการอัพเดท
   * @returns {Promise<Object>} - User object ที่อัพเดทแล้ว
   * @throws {NotFoundError} - ถ้าไม่พบ user
   * @throws {ConflictError} - ถ้า email ซ้ำ
   */
  static async update(id, data) {
    // ตรวจสอบว่า user มีอยู่จริงหรือไม่
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // ถ้ามีการเปลี่ยน email ให้เช็คว่าซ้ำกับคนอื่นไหม
    if (data.email && data.email !== user.email) {
      const existingUser = await UserRepository.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictError("Email already exists");
      }
    }

    // Hash password ก่อนเก็บ (ถ้ามี password)
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    return UserRepository.update(id, data);
  }

  /**
   * ลบ User
   * @param {string} id - User ID
   * @returns {Promise<void>}
   * @throws {NotFoundError} - ถ้าไม่พบ user
   */
  static async delete(id) {
    // ตรวจสอบว่า user มีอยู่จริงหรือไม่
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return UserRepository.delete(id);
  }
}
