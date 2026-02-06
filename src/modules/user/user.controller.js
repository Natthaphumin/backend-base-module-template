// modules/user/user.controller.js
// 🎮 User Controller - จัดการ HTTP requests/responses สำหรับ User

import { UserService } from "./user.service.js";
import { sendSuccess } from "../../common/utils/response.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";

/**
 *ทำอะไร:
    1. รับ request (req)
    2. เรียก service ทำงาน
    3. ส่ง response (res) กลับไป
 *
 * User Controller Class
 * - รับ request จาก route
 * - เรียกใช้ service เพื่อประมวลผล
 * - ส่ง response กลับไปที่ client
 *
 * ใช้ asyncHandler wrapper เพื่อไม่ต้องเขียน try-catch
 */
export class UserController {
  /**
   * ดึงรายการ User ทั้งหมด
   * GET /api/users
   */
  static getAll = asyncHandler(async (req, res) => {
    const users = await UserService.getAll();
    sendSuccess(res, users, "Users retrieved successfully");
  });

  /**
   * ดึง User ตาม ID
   * GET /api/users/:id
   */
  static getById = asyncHandler(async (req, res) => {
    const user = await UserService.getById(req.params.id);
    sendSuccess(res, user, "User retrieved successfully");
  });

  /**
   * สร้าง User ใหม่
   * POST /api/users
   */
  static create = asyncHandler(async (req, res) => {
    const user = await UserService.create(req.body);
    sendSuccess(res, user, "User created successfully", 201);
  });

  /**
   * อัพเดท User
   * PUT /api/users/:id
   */
  static update = asyncHandler(async (req, res) => {
    const user = await UserService.update(req.params.id, req.body);
    sendSuccess(res, user, "User updated successfully");
  });

  /**
   * ลบ User
   * DELETE /api/users/:id
   */
  static delete = asyncHandler(async (req, res) => {
    await UserService.delete(req.params.id);
    sendSuccess(res, null, "User deleted successfully");
  });
}
