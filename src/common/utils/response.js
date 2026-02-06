// common/utils/response.js
// 📤 Response Helpers - ส่ง response ในรูปแบบที่สม่ำเสมอ

/**
 * ส่ง Success Response
 * - ใช้เมื่อ request สำเร็จ
 * - รูปแบบ: { success: true, message: "...", data: {...} }
 *
 * @param {Response} res - Express response object
 * @param {*} data - ข้อมูลที่จะส่งกลับ
 * @param {string} message - ข้อความแจ้งผลสำเร็จ
 * @param {number} statusCode - HTTP status code (default: 200)
 */
export const sendSuccess = (
  res,
  data,
  message = "Success",
  statusCode = 200,
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * ส่ง Error Response
 * - ใช้เมื่อ request ไม่สำเร็จ
 * - รูปแบบ: { success: false, message: "..." }
 *
 * โดยปกติไม่ต้องใช้ function นี้ เพราะมี errorHandler แล้ว
 * แต่สามารถใช้ในกรณีพิเศษที่ต้องการ custom error response
 *
 * @param {Response} res - Express response object
 * @param {string} message - ข้อความ error
 * @param {number} statusCode - HTTP status code (default: 500)
 */
export const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
