# 🧩 CRM System (Next.js + Express + Prisma)

A **Customer Relationship Management (CRM)** system built with **Express.js + Prisma (backend)**.  
This project allows office users to manage **customers, jobs, appointments, invoices, and payments**, while technicians can view and manage their assigned jobs.

---

## 🌐 Project Overview

This  application demonstrates an **enterprise-grade CRM** workflow:

- 🧑‍💼 Office users create and schedule jobs for customers  
- 👷 Technicians get assigned to appointments  
- 📅 Appointments prevent scheduling overlaps  
- 💰 Invoices & payments are tracked per job  
- 🔐 Secure login  

---

## 🛠️ Tech Stack

### ⚙️ Backend
- **Node.js 20+ / Express.js**
- **Prisma ORM (MySQL)**
- **TypeScript**
- **Jest + Supertest (Testing)**
- **JWT Authentication**
- **Dotenv **

---

## 📂 Project Structure

```
crm/
├── backend/                # Express API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── customer/
│   │   │   ├── job/
│   │   │   ├── appointment/
│   │   │   ├── invoice/
│   │   │   ├── payment/
│   │   ├── prisma/
│   │   └── tests/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Setup

### 🧩 Prerequisites
- Node.js ≥ 20  
- MySQL ≥ 8  
- npm ≥ 9 or yarn  

---

## 🧱 Backend Setup (Express + Prisma)

1. **Navigate to backend directory**
   ```bash
   cd crm-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up .env**
   ```bash
   DATABASE_URL="mysql://root:password@localhost:3306/crm"
   JWT_SECRET="super_secret_key"
   PORT5000
   ```

4. **Generate Prisma client & run migrations**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Seed initial data**
   ```bash
   npx prisma db seed
   ```

   ✅ Seed includes:
   - Three customers  
   - One technician (`Taylor`)  
   - Two new jobs  
   - One scheduled job (10:00–12:00 for Taylor)

6. **Start the server**
   ```bash
   npm run dev
   ```
   Runs on [http://localhost:5000](http://localhost:5000)

---

## 🧠 Backend Testing

### 🧪 Run Tests
```bash
npm run test
```

### 🧾 Test Coverage
- ✅ Unit tests for invoice totals  
- ✅ Unit tests for payment balance updates  
- ✅ Unit tests for scheduling overlaps  
- ✅ Integration test for appointment conflicts  

---


## 📦 Deployment


### ⚙️ Backend (Express)
Deploy on:
- **Render**
- **Clever cloud**

Ensure `.env` variables are properly configured in production.

---

## 🧾 API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/auth/register` | Register user |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/customers` | Fetch all customers |
| `POST` | `/api/jobs` | Create a job |
| `GET` | `/api/appointments` | List appointments |
| `POST` | `/api/appointments` | Create appointment (conflict check) |
| `GET` | `/api/invoices/:id` | Get invoice details |

---

## 🧠 Developer Notes

- **Architecture:** Controller -> Service -> Repository -> Prisma  
- **Database:** MySQL  
- **ORM:** Prisma  
- **Authentication:** JWT   
- **Testing:** Jest + Supertest  

---

## 👨‍💻 Author

**Adinlewa Tayo Michael**  
