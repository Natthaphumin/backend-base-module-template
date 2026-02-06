// config/database.js
// 🗄️ Prisma Database Client

import { PrismaClient } from "@prisma/client";
import { logger } from "../common/utils/logger.js";

/**
 * สร้าง Prisma Client instance
 * - log: กำหนดระดับ log ที่ต้องการดู
 * - errorFormat: แสดง error แบบ pretty
 */
export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"] // Development - แสดง query ทั้งหมด
      : ["error"], // Production - แสดงแค่ error
  errorFormat: "pretty",
});

/**
 * Graceful Shutdown
 * - ปิด connection เมื่อ process กำลังจะจบ
 * - ป้องกัน connection leak
 */
process.on("beforeExit", async () => {
  logger.info("Closing database connection...");
  await prisma.$disconnect();
});
