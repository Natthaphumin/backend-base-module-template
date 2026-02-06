// common/utils/logger.js
// 📝 Logger - แสดงผล log ที่สวยงามและมี timestamp

/**
 * สี ANSI สำหรับแสดงผลใน terminal
 */
const colors = {
  info: "\x1b[36m", // Cyan - สำหรับข้อมูลทั่วไป
  error: "\x1b[31m", // Red - สำหรับ error
  warn: "\x1b[33m", // Yellow - สำหรับ warning
  success: "\x1b[32m", // Green - สำหรับความสำเร็จ
  reset: "\x1b[0m", // Reset สีกลับเป็นปกติ
};

/**
 * Helper function สำหรับ log
 * - แสดง timestamp
 * - แสดงสีตาม level
 * - รองรับ object logging
 */
const log = (level, ...args) => {
  const timestamp = new Date().toISOString();
  const color = colors[level] || colors.reset;

  // Format args - ถ้าเป็น object ให้แสดงแบบ pretty
  const formattedArgs = args.map((arg) => {
    if (typeof arg === "object" && arg !== null) {
      return JSON.stringify(arg, null, 2);
    }
    return arg;
  });

  console.log(
    `${color}[${level.toUpperCase()}] ${timestamp}${colors.reset}`,
    ...formattedArgs,
  );
};

/**
 * Logger Object
 *
 * ตัวอย่างการใช้งาน:
 * logger.info('Server started on port 3000');
 * logger.error('Database connection failed', error);
 * logger.warn('Deprecated API used');
 * logger.success('User created successfully');
 */
export const logger = {
  /**
   * Log ข้อมูลทั่วไป (สีฟ้า)
   */
  info: (...args) => log("info", ...args),

  /**
   * Log error (สีแดง)
   */
  error: (...args) => log("error", ...args),

  /**
   * Log warning (สีเหลือง)
   */
  warn: (...args) => log("warn", ...args),

  /**
   * Log success (สีเขียว)
   */
  success: (...args) => log("success", ...args),
};
