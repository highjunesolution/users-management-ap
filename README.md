# User API (Node.js + Express + Prisma)

Simple REST API for managing users using **Express.js** and **Prisma ORM** with **SQL Server** database.

---

# Tech Stack

* Node.js
* Express.js
* Prisma ORM
* SQL Server

---

# Installation

Clone project

```bash
git clone <your-repository>
cd <project-folder>
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create `.env`

```env
DATABASE_URL="sqlserver://USER:PASSWORD@HOST:PORT;database=DB_NAME;encrypt=true"
```

Example

```env
DATABASE_URL="sqlserver://sa:password@localhost:1433;database=testdb;encrypt=true"
```

---

# Prisma Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# Database Schema

User Model

```
User
-------------------------
id          Int (PK)
email       String (unique)
password    String
firstName   String
lastName    String
active      Boolean
createdAt   DateTime
updatedAt   DateTime
```

---

# API Endpoints

## Get User

```
GET /user/:userId
```

Example

```
GET /user/1
```

---

## Get All Users

```
GET /users
```

---

## Create User

```
POST /user
```

Request Body

```json
{
  "email": "user@email.com",
  "password": "123456",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

## Update User

```
PUT /user/:userId
```

Example

```
PUT /user/1
```

---

## Disable User (Soft Delete)

```
PUT /user/:userId
```

This endpoint will update

```
active = false
```

instead of deleting the record.

---

# Folder Structure (Example)

```
project
│
├─ controllers
│   └─ users.controller.js
│
├─ routes
│   └─ users.route.js
│
├─ prisma
│   └─ schema.prisma
│
├─ .env
├─ app.js
└─ README.md
```

---

# Run Server

```bash
node app.js
```

or

```bash
npm run dev
```

---

# Notes

* Password should be hashed before saving to database.
* Consider adding validation middleware.
* Consider adding authentication (JWT).

---
