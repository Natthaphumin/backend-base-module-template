// modules/user/user.routes.js
// 🛣️ User Routes - กำหนด API endpoints

import { Router } from "express";
import { UserController } from "./user.controller.js";
import { validate } from "../../common/middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "./user.schema.js";

const router = Router();

/**
 * ทำอะไร:
    1. กำหนด endpoints (URL paths)
    2. เช็ค validation ก่อนส่งต่อ
    3. เรียก controller ที่เหมาะสม
 *
 *
 *
 * User Routes
 *
 * GET    /api/users      - ดึงรายการ users ทั้งหมด
 * GET    /api/users/:id  - ดึง user ตาม ID
 * POST   /api/users      - สร้าง user ใหม่ (มี validation)
 * PUT    /api/users/:id  - อัพเดท user (มี validation)
 * DELETE /api/users/:id  - ลบ user
 */

// ดึงรายการ users ทั้งหมด
router.get("/", UserController.getAll);

// ดึง user ตาม ID
router.get("/:id", UserController.getById);

// สร้าง user ใหม่ (ผ่าน validation ก่อน)
router.post("/", validate(createUserSchema), UserController.create);

// อัพเดท user (ผ่าน validation ก่อน)
router.put("/:id", validate(updateUserSchema), UserController.update);

// ลบ user
router.delete("/:id", UserController.delete);

export default router;
