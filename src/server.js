// server.js
// 🖥️ Server Entry Point

import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./common/utils/logger.js";

/**
 * Start Server
 * - ไม่ต้องใช้ database (ใช้ mock data แทน)
 * - เริ่ม HTTP server
 * - จัดการ graceful shutdown
 */
const startServer = async () => {
  try {
    // Start HTTP Server (ไม่ต้องใช้ database)
    app.listen(env.PORT, () => {
      logger.success(`🚀 Server is running on port ${env.PORT}`);
      logger.info(`📌 Environment: ${env.NODE_ENV}`);
      logger.info(`💾 Using In-Memory Mock Data (No Database Required)`);
      logger.info(`🔗 Health check: http://localhost:${env.PORT}/health`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    process.exit(1); // ออกจากโปรแกรมถ้า start ไม่สำเร็จ
  }
};

/**
 * Graceful Shutdown
 * - ปิด server อย่างปลอดภัย
 */
const shutdown = async (signal) => {
  logger.warn(`${signal} received, shutting down gracefully...`);

  try {
    logger.info("Server shutdown complete");
    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown:", error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  shutdown("UNCAUGHT_EXCEPTION");
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  shutdown("UNHANDLED_REJECTION");
});

// Start the server
startServer();
