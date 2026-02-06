// scripts/test-api.js
// 🧪 Test Script สำหรับทดสอบ User API Endpoints

/**
 * Script นี้ใช้ทดสอบ User API ทั้งหมด
 * - ไม่ต้องใช้ testing framework
 * - ใช้ fetch API เรียก endpoints
 * - แสดงผลเป็นสี
 *
 * วิธีใช้:
 * 1. เปิด server: npm run dev
 * 2. เปิด terminal ใหม่
 * 3. รันคำสั่ง: node scripts/test-api.js
 */

const BASE_URL = "http://localhost:3000/api";

// สำหรับแสดงผลสี
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
  gray: "\x1b[90m",
};

// Helper functions
const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  section: (msg) =>
    console.log(
      `\n${colors.blue}${"=".repeat(50)}\n${msg}\n${"=".repeat(50)}${colors.reset}\n`,
    ),
  data: (data) =>
    console.log(
      `${colors.gray}${JSON.stringify(data, null, 2)}${colors.reset}`,
    ),
};

/**
 * ทดสอบ Health Check Endpoint
 */
async function testHealthCheck() {
  log.section("1. Testing Health Check");
  try {
    const response = await fetch("http://localhost:3000/health");
    const data = await response.json();

    if (response.ok && data.success) {
      log.success(`Health Check: ${data.message}`);
      log.data(data);
    } else {
      log.error("Health check failed");
    }
  } catch (error) {
    log.error(`Health check error: ${error.message}`);
  }
}

/**
 * ทดสอบการสร้าง User
 */
async function testCreateUser() {
  log.section("2. Testing Create User (POST /api/users)");

  const newUser = {
    email: `test${Date.now()}@example.com`, // ใช้ timestamp เพื่อไม่ซ้ำ
    name: "Test User",
    password: "password123",
  };

  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();

    if (response.status === 201 && data.success) {
      log.success("Create user successful");
      log.data(data);
      return data.data.id; // return user id สำหรับใช้ test ต่อ
    } else {
      log.error("Create user failed");
      log.data(data);
    }
  } catch (error) {
    log.error(`Create user error: ${error.message}`);
  }
  return null;
}

/**
 * ทดสอบการดึง Users ทั้งหมด
 */
async function testGetAllUsers() {
  log.section("3. Testing Get All Users (GET /api/users)");
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();

    if (response.ok && data.success) {
      log.success(`Found ${data.data.length} user(s)`);
      log.data(data);
    } else {
      log.error("Get users failed");
      log.data(data);
    }
  } catch (error) {
    log.error(`Get users error: ${error.message}`);
  }
}

/**
 * ทดสอบการดึง User ตาม ID
 */
async function testGetUserById(userId) {
  log.section(`4. Testing Get User By ID (GET /api/users/${userId})`);

  if (!userId) {
    log.warn("⚠️  Skipping - No user ID provided");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    const data = await response.json();

    if (response.ok && data.success) {
      log.success("Get user by ID successful");
      log.data(data);
    } else {
      log.error("Get user by ID failed");
      log.data(data);
    }
  } catch (error) {
    log.error(`Get user by ID error: ${error.message}`);
  }
}

/**
 * ทดสอบการอัพเดท User
 */
async function testUpdateUser(userId) {
  log.section(`5. Testing Update User (PUT /api/users/${userId})`);

  if (!userId) {
    log.warn("Skipping - No user ID provided");
    return;
  }

  const updateData = {
    name: "Updated Test User",
  };

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      log.success("Update user successful");
      log.data(data);
    } else {
      log.error("Update user failed");
      log.data(data);
    }
  } catch (error) {
    log.error(`Update user error: ${error.message}`);
  }
}

/**
 * ทดสอบการลบ User
 */
async function testDeleteUser(userId) {
  log.section(`6. Testing Delete User (DELETE /api/users/${userId})`);

  if (!userId) {
    log.warn("Skipping - No user ID provided");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok && data.success) {
      log.success("Delete user successful");
      log.data(data);
    } else {
      log.error("Delete user failed");
      log.data(data);
    }
  } catch (error) {
    log.error(`Delete user error: ${error.message}`);
  }
}

/**
 * ทดสอบ Validation Errors
 */
async function testValidationErrors() {
  log.section("7. Testing Validation Errors");

  const invalidData = {
    email: "not-an-email", // email ไม่ถูกต้อง
    name: "A", // สั้นเกินไป (minLength: 2)
  };

  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidData),
    });

    const data = await response.json();

    if (response.status === 400 && !data.success) {
      log.success("Validation working correctly");
      log.data(data);
    } else {
      log.error("Validation should have failed");
      log.data(data);
    }
  } catch (error) {
    log.error(`Validation test error: ${error.message}`);
  }
}

/**
 * ทดสอบ 404 Not Found
 */
async function testNotFound() {
  log.section("8. Testing 404 Not Found");

  try {
    const response = await fetch(`${BASE_URL}/users/non-existent-id`);
    const data = await response.json();

    if (response.status === 404 && !data.success) {
      log.success("404 error handling working correctly");
      log.data(data);
    } else {
      log.error("Should return 404");
      log.data(data);
    }
  } catch (error) {
    log.error(`404 test error: ${error.message}`);
  }
}

/**
 * รัน tests ทั้งหมด
 */
async function runAllTests() {
  console.log(`${colors.blue}
╔═══════════════════════════════════════════════════════╗
║         🧪 User API Testing Script                   ║
║         Testing all endpoints...                      ║
╚═══════════════════════════════════════════════════════╝
${colors.reset}`);

  let userId = null;

  try {
    // 1. Health Check
    await testHealthCheck();
    await sleep(500);

    // 2. Get All Users (ก่อนสร้าง)
    await testGetAllUsers();
    await sleep(500);

    // 3. Create User
    userId = await testCreateUser();
    await sleep(500);

    // 4. Get User By ID
    await testGetUserById(userId);
    await sleep(500);

    // 5. Update User
    await testUpdateUser(userId);
    await sleep(500);

    // 6. Validation Errors
    await testValidationErrors();
    await sleep(500);

    // 7. 404 Not Found
    await testNotFound();
    await sleep(500);

    // 8. Delete User
    await testDeleteUser(userId);
    await sleep(500);

    // 9. Get All Users (หลังลบ)
    await testGetAllUsers();

    // Summary
    log.section("✅ All Tests Completed!");
    log.info(
      "Check results above to verify all endpoints are working correctly.",
    );
  } catch (error) {
    log.error(`Test suite error: ${error.message}`);
  }
}

// Helper: sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// รัน tests
runAllTests().catch(console.error);
