// prisma/seed.js
// 🌱 Database Seeder - ใส่ข้อมูลทดสอบเข้า Database

import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/hash.js";

const prisma = new PrismaClient();

/**
 * ข้อมูล Users สำหรับ seed
 */
const seedUsers = [
  {
    email: "admin@example.com",
    name: "Admin User",
    password: "admin123",
  },
  {
    email: "john.doe@example.com",
    name: "John Doe",
    password: "password123",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    password: "password123",
  },
  {
    email: "bob.wilson@example.com",
    name: "Bob Wilson",
    password: "password123",
  },
  {
    email: "alice.jones@example.com",
    name: "Alice Jones",
    password: "password123",
  },
];

/**
 * Main Seed Function
 */
async function main() {
  console.log("🌱 Starting database seeding...");

  // ลบข้อมูลเก่าทั้งหมด (optional)
  console.log("🗑️  Clearing existing data...");
  await prisma.user.deleteMany();
  console.log("✅ Existing data cleared");

  // สร้าง Users
  console.log("\n👤 Creating users...");
  for (const userData of seedUsers) {
    // Hash password ก่อนบันทึก
    const hashedPassword = await hashPassword(userData.password);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    console.log(`  ✓ Created user: ${user.email}`);
  }

  console.log(`\n✅ Successfully seeded ${seedUsers.length} users!`);
}

/**
 * Execute Seed
 */
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("\n🎉 Seeding completed successfully!");
  })
  .catch(async (error) => {
    console.error("\n❌ Error during seeding:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
