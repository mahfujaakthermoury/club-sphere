🌐 ClubSphere
Membership & Event Management Platform for Local Communities

ClubSphere is a full-stack MERN web application that enables users to discover, join, and manage local clubs and events. The platform supports role-based dashboards, secure Stripe payments, Firebase authentication, and a modern responsive UI designed with production standards in mind.

This project demonstrates real-world full-stack architecture, secure authentication, payment integration, role-based authorization, and scalable MongoDB data design.

🚀 Live Application

🔗 Live Site: https://lustrous-sherbet-1d11fb.netlify.app/

🔗 Client Repository: https://github.com/mahfujaakthermoury/club-sphere

🔗 Server Repository: https://github.com/mahfujaakthermoury/club-sphere-server

🎯 Project Purpose

ClubSphere provides a centralized digital ecosystem where:

Members can explore and join clubs

Club Managers can create and manage clubs and events

Admins can monitor users, payments, and overall platform activity

The system is designed to simulate a real-world SaaS-style membership and event management platform.

👥 User Roles & Capabilities
👤 Member

Browse approved clubs and events

Join free or paid clubs

Pay membership fees securely via Stripe

Register for club events (free or paid)

View joined clubs, registered events, and payment history

🏢 Club Manager

Create and manage clubs

Set membership fees (free or paid)

Create, update, and delete events

View club members and event registrations

Monitor revenue generated from memberships and events

🛡 Admin

View platform statistics (users, clubs, memberships, payments)

Approve or reject club submissions

Manage user roles (admin / clubManager / member)

Monitor all transactions across the platform

✨ Core Features

🔐 Firebase Authentication (Email/Password + Google Login)

🔑 JWT-based Authorization

🛡 Role-Based Dashboard Access

💳 Stripe Payment Integration (Test Mode)


🔎 Server-Side Search & Filtering

↕ Sorting (Newest, Oldest, Highest Fee, Lowest Fee)

⚡ TanStack Query for efficient data fetching

🧾 React Hook Form for form validation

🎨 Modern, recruiter-friendly UI design

🌗 Dark / Light Theme Support

📱 Fully Responsive (Mobile, Tablet, Desktop)

🔥 Firebase Token Verification Middleware (Backend)

🗄 Database Architecture (MongoDB)

The platform uses structured collections to maintain clear relational integrity:

users – stores authentication and role information

clubs – club details, manager reference, approval status

memberships – tracks club memberships and payment references

events – club event details and pricing

eventRegistrations – tracks event participants

payments – stores Stripe transaction references

All sensitive routes are protected with Firebase token verification middleware and role validation logic.

🛠 Technology Stack
Frontend

React.js

React Router DOM

TanStack React Query

React Hook Form

Axios

Tailwind CSS

DaisyUI

Framer Motion

React Icons

Backend

Node.js

Express.js

MongoDB

Firebase Admin SDK

JSON Web Token (JWT)

Stripe API

dotenv

CORS

🔐 Authentication & Security

Firebase handles client-side authentication

Backend verifies Firebase token using Admin SDK

JWT issued for protected API access

Role-based middleware ensures route-level protection

Environment variables secure Firebase, MongoDB, and Stripe credentials

No sensitive keys are exposed in the frontend

💳 Payment Flow (Stripe Integration)

User clicks Join Club

Backend creates a Stripe Payment Intent

Client confirms payment securely

On success:

Membership record is created

Payment record is stored

Admin & Manager dashboards update automatically

Free clubs bypass payment and create membership instantly.

🔎 Search, Filter & Sorting

Implemented server-side using MongoDB query operators:

Search clubs by name

Filter clubs by category

Sort clubs by:

Newest First

Oldest First

Highest Fee

Lowest Fee

Sort events by event date

This ensures scalability and performance optimization.

📊 Dashboard System

Each role sees a different dashboard layout:

Dynamic sidebar navigation

Summary cards with analytics

Data tables with secure CRUD operations

Charts for revenue and membership tracking

Responsive and collapsible layout for smaller devices

🎨 UI & Design Principles

Consistent brand styling across public site & dashboard

Balanced spacing and typography

Uniform card height & image sizes

Clean grid system layout

Modern button and hover effects

Professional color contrast

Fully responsive design

The UI was built to be visually appealing and recruiter-ready.

🌍 Deployment

Client deployed via Netlify / Vercel

Server deployed via Render / Railway

Firebase authorized domains configured

Production environment variables secured

No reload issues on private routes

Proper CORS configuration

🔐 Environment Variables
Client
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_STRIPE_PUBLIC_KEY=

Server
PORT=
DB_USER=
DB_PASS=
JWT_SECRET=
STRIPE_SECRET_KEY=

👨‍💼 Admin Testing Credentials

Email: admin@gmail.com

Password: Admin@12345

📦 Installation & Local Setup
# Clone repository
git clone https://github.com/mahfujaakthermoury/club-sphere

# Install dependencies
npm install

# Run client
npm run dev

# Run server
nodemon index.js

📈 Development Highlights

20+ meaningful commits (Client)

12+ meaningful commits (Server)

Modular file structure

Clean API separation

Production-ready error handling

Reusable hooks and components