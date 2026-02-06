# 🚀 Backend Module Base - Clean Architecture

โครงสร้าง Backend ที่ปรับปรุงใหม่ให้ **สะอาด เข้าใจง่าย maintain ง่าย**

## 📁 โครงสร้างโปรเจค

```
backend/
├── src/
│   ├── config/              # ⚙️ Configuration
│   │   ├── env.js          # Environment variables
│   │   └── database.js     # Prisma client
│   │
│   ├── common/              # 🔧 Shared utilities
│   │   ├── errors/
│   │   │   ├── AppError.js          # Custom error classes
│   │   │   └── errorHandler.js      # Global error handler
│   │   ├── middlewares/
│   │   │   ├── asyncHandler.js      # Async wrapper (ไม่ต้อง try-catch)
│   │   │   └── validate.js          # Validation middleware
│   │   └── utils/
│   │       ├── response.js          # Response helpers
│   │       └── logger.js            # Logger (มีสี + timestamp)
│   │
│   ├── modules/             # 📦 Feature modules
│   │   └── user/
│   │       ├── user.controller.js   # HTTP layer
│   │       ├── user.service.js      # Business logic
│   │       ├── user.repository.js   # Database access
│   │       ├── user.routes.js       # Route definitions
│   │       └── user.schema.js       # Validation schemas
│   │
│   ├── utils/               # 🛠️ Utilities
│   │   ├── hash.js         # Password hashing
│   │   └── logger.js       # (อาจซ้ำกับ common/utils)
│   │
│   ├── app.js              # 🎯 Express app setup
│   └── server.js           # 🖥️ Server entry point
│
├── prisma/
│   └── schema.prisma       # Database schema
│
├── .env                     # Environment variables
├── .env.example            # Example env file
├── package.json
└── README.md
```

## 🎨 สิ่งที่ปรับปรุง

### 1. **Error Handling**

- แยก error เป็น classes: `NotFoundError`, `ValidationError`, `ConflictError`
- Global error handler จัดการ error ทั้งหมด
- ไม่ต้อง try-catch ทุกที่ (ใช้ `asyncHandler`)

### 2. **Validation**

- แยก validation schemas ออกมาเป็นไฟล์ `user.schema.js`
- Middleware ตรวจสอบ type, length, pattern, enum
- Error messages ชัดเจน

### 3. **Response Format**

- ใช้ `sendSuccess()` สำหรับ success response
- Format สม่ำเสมอทุก endpoint: `{ success, message, data }`

### 4. **Logger**

- มีสี timestamp และ context
- แยกเป็น `info`, `error`, `warn`, `success`
- รองรับ object logging

### 5. **Architecture**

- แยก layer ชัดเจน: Controller → Service → Repository
- Class-based แทน function exports
- แยก common utilities ออกมาใช้ร่วมกัน

## 🚀 วิธีใช้งาน

### 1. ติดตั้ง dependencies

```bash
npm install
```

### 2. Setup environment

```bash
cp .env.example .env
# แก้ไข DATABASE_URL ให้ถูกต้อง
```

### 3. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. เริ่ม server

```bash
npm run dev
```

## 📝 API Endpoints

### User APIs

```
GET    /api/users      - ดึงรายการ users ทั้งหมด
GET    /api/users/:id  - ดึง user ตาม ID
POST   /api/users      - สร้าง user ใหม่
PUT    /api/users/:id  - อัพเดท user
DELETE /api/users/:id  - ลบ user
```

### Health Check

```
GET /health - ตรวจสอบสถานะ server
```

## 💡 ตัวอย่างการใช้งาน

### สร้าง User ใหม่

```bash
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "123456"
}
```

### Response Format

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-02-06T10:00:00.000Z"
  }
}
```

## 🔐 Security

- Password ถูก hash ด้วย bcrypt ก่อนเก็บใน database
- Validation ครบทุก input
- Error messages ไม่ expose sensitive information ใน production

## 🧪 เพิ่ม Module ใหม่

1. สร้าง folder ใน `src/modules/`
2. สร้างไฟล์: controller, service, repository, routes, schema
3. Import routes ใน `app.js`

ตัวอย่าง:

```javascript
// app.js
import productRoutes from "./modules/product/product.routes.js";
app.use("/api/products", productRoutes);
```

## 📚 Code Conventions

- ใช้ ES Modules (`import/export`)
- Class-based architecture
- JSDoc comments ทุก function
- Error handling ด้วย custom errors
- Validation แยกเป็น schemas

---

Made with ❤️ by Clean Code
