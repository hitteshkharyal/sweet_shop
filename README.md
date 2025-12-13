🍬 Sweet Shop Management System (MERN)

A full-stack Sweet Shop Management System built using the MERN stack, developed sprint-by-sprint using Test-Driven Development (TDD) principles.
The application supports role-based access (Admin & User), inventory management, orders, and dashboard views, with a clean REST API and modern frontend.

🚀 Tech Stack
Frontend

React (Vite)

Material UI

Axios

React Router

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Testing

Jest

Supertest

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

🧱 Project Structure (Monorepo)
sweet_shop_m/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── index.js
│   ├── tests/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

🧪 Development Approach (TDD)

Backend features were implemented using Red → Green → Refactor

Each API endpoint was first validated via tests

Frontend was developed after API stability

Frequent commits after each sprint milestone

🏃‍♂️ Sprints Overview
🟢 Sprint 0 — Project Setup & Architecture

Monorepo setup (frontend + backend)

Express server initialization

MongoDB connection

Environment configuration

Sample API & test verification

🟢 Sprint 1 — Authentication (TDD)

User registration API

User login API

Password hashing (bcrypt)

JWT token generation

Auth tests using Jest + Supertest

🟢 Sprint 2 — Authorization & Inventory (TDD)

JWT auth middleware

Role-based access (Admin/User)

Sweet CRUD APIs

Search sweets (name, category, price)

Inventory purchase & restock logic

Protected route tests

🟢 Sprint 3 — Frontend Auth & Core UI

Login & Register pages

Role selection (Admin/User)

Protected routing

User & Admin dashboards

Axios API integration

🟢 Sprint 4 — Cart, Orders & Payments (Dummy)

Cart functionality

Dummy payment flow

Order creation after payment

Quantity reduction after purchase

Toasts & loaders

Search & category filters

🟢 Sprint 5 — Dashboards & Admin Features

Admin sweets management UI

Restock functionality

Order listing for admin

Inventory status handling

🟢 Sprint 6 — Profiles & Orders

User Profile page (Order history)

Admin view for all orders

Order table for analytics readiness

Stable JWT-based auth using localStorage

Clean role-based navigation

🟢 Sprint 7 — Deployment

Backend deployed on Render

Frontend deployed on Vercel

MongoDB Atlas integration

CORS configuration

Production-ready environment variables

🔐 Authentication Flow

JWT stored in localStorage

Token sent via Authorization: Bearer <token>

Backend middleware validates token

Role-based route protection

▶️ Running Locally
Backend
cd backend
npm install
npm run dev


Create .env inside backend:

PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

Frontend
cd frontend
npm install
npm run dev

🌍 Deployment

Frontend (Vercel)

Backend (Render)

Database (MongoDB Atlas)

Production URLs are configured directly in the frontend API client.

🧠 My AI Usage

AI tools were used responsibly throughout development.

Tools Used

ChatGPT

How AI Helped

Sprint planning & breakdown

API design suggestions

Test case generation ideas

Debugging guidance

README structuring

Reflection

AI significantly improved productivity and clarity, especially during sprint planning and debugging, while all final logic and decisions were implemented and validated manually.

📌 Key Highlights

Full MERN stack

Role-based access

Inventory & orders

TDD-driven backend

Clean REST APIs

Deployed & production-ready


