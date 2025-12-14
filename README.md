🍬 Sweet Shop Management System (MERN) 
frontend live link- https://sweetsshop-hitesh.netlify.app/
backend live link - https://sweet-shop-backend-0at8.onrender.com/
A full-stack Sweet Shop Management System built using the MERN stack (MongoDB, Express, React, Node.js) following Test-Driven Development (TDD) principles.
The application supports user & admin roles, JWT-based authentication, inventory management, orders, and a modern responsive UI.

🔗 Public Git Repository

👉 GitHub Repository:
https://github.com/hitteshkharyal/sweet_shop

📌 Project Overview

The Sweet Shop Management System allows:

👤 Users

Register & login securely

View available sweets

Search & filter sweets

Add items to cart

Place orders (dummy payment)

View their past orders

🛠 Admin

Login with admin credentials

Add, update, delete sweets

Restock inventory

View all user orders

Monitor stock & sales data (foundation for analytics)

🧱 Tech Stack
Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

Jest + Supertest (TDD)

Frontend

React (Vite)

Material UI (MUI)

React Router

Axios

Deployment

Backend: Render

Frontend: Netlify

Database: MongoDB Atlas

🚀 Live Application (Optional – Brownie Points)

🌐 Frontend (Netlify):
👉 Add your Netlify URL here

🌐 Backend API (Render):
👉 Add your Render backend URL here

🧪 Test Report

The backend was developed using Test-Driven Development.

✔ Test Coverage Includes:

Authentication (register & login)

JWT protection middleware

Sweet CRUD operations

Inventory purchase & restock

Order creation & retrieval

▶ Run Tests
cd backend
npm test

✅ Sample Test Output
Test Suites: 3 passed
Tests:       10 passed
Snapshots:   0
Time:        ~2s

🛠 Local Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/hitteshkharyal/sweet_shop.git
cd sweet_shop

⚙ Backend Setup
📂 Navigate to backend
cd backend

📦 Install dependencies
npm install

🔐 Create .env file
PORT=4000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key

▶ Run backend
npm run dev


Backend runs at:
👉 http://localhost:4000

🎨 Frontend Setup
📂 Navigate to frontend
cd frontend

📦 Install dependencies
npm install

▶ Run frontend
npm run dev


Frontend runs at:
👉 http://localhost:5173

🖼 Screenshots

inside the screenshots directory
from landig to user and admin dashboard 

Suggested screenshots:

Landing Page

Login / Register

User Dashboard

Admin Dashboard

Orders Page

Sweets Management (Admin)

🤖 My AI Usage 
AI Tools Used

ChatGPT (OpenAI)

How AI Was Used

Designing API structure & REST endpoints

Writing and refining Jest test cases (TDD)

Debugging backend & frontend integration issues

Improving UI/UX design ideas

Assisting with deployment (Render, Netlify)

Helping structure this README


📦 Sprint-Based Development Summary
Sprint	Focus
Sprint 0	Project setup, repo structure, tooling
Sprint 1	Auth APIs (Register/Login) with TDD
Sprint 2	JWT Middleware & Sweets CRUD
Sprint 3	Frontend Auth & Dashboards
Sprint 4	Cart, Orders, Inventory logic
Sprint 5	UI enhancements, validations
Sprint 6	User/Admin profiles & orders
Sprint 7	Deployment (Atlas, Render, Netlify)

🏁 Conclusion

This project demonstrates:

Full-stack MERN development

Clean architecture & modular code

Proper use of TDD

Secure authentication

Real-world deployment workflow

Responsible AI usage
