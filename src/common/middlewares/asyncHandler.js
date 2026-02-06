// common/middlewares/asyncHandler.js
// 🔄 Async Handler - wrapper สำหรับ async functions

/**
 * Async Handler Wrapper
 * - ห่อหุ้ม async function เพื่อ catch error อัตโนมัติ
 * - ไม่ต้องเขียน try-catch ในทุก controller
 *
 * ตัวอย่างการใช้งาน:
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await UserService.getAll(); // ถ้า error จะส่งไปที่ errorHandler อัตโนมัติ
 *   res.json(users);
 * }));
 *
 * @param {Function} fn - Async function ที่ต้องการ wrap
 * @returns {Function} - Express middleware function
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    // Execute function และ catch error ทั้งหมด
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
