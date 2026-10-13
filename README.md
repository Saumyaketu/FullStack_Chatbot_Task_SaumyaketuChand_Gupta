# DroneTV AI Support & Lead Assistant

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://mongoosejs.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Ready-38bdf8.svg)](https://tailwindcss.com/)

> **Practical Technical Assignment for Full Stack Developer Intern — IPAGE Group**  
> An end-to-end web application featuring an interactive commercial drone portal, an intelligent rule-based conversational assistant, structured lead capture with dual-layer validation, and a real-time administrator enquiry management dashboard.

---

## Table of Contents
1. [Project Description](#project-description)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [High-Level Architecture](#high-level-architecture)
5. [Project Structure](#project-structure)
6. [Setup & Installation](#setup--installation)
7. [Environment Variables](#environment-variables)
8. [Database Setup & Seeding](#database-setup--seeding)
9. [API Endpoints Documentation](#api-endpoints-documentation)
10. [GitHub Submission Guide](#github-submission-guide)

---

## Project Description

**DroneTV AI Support & Lead Assistant** is an aviation-grade web platform designed for commercial UAV operations and DGCA pilot academy inquiries. The system bridges the gap between potential enterprise clients, aspiring drone pilots, and the DroneTV operations team by providing:
- An engaging, responsive landing page showcasing commercial drone services and certified training courses.
- A virtual chatbot assistant capable of answering predefined questions, handling keyword-based natural language variations, and maintaining conversation history across the user session.
- An interactive lead capture system allowing students and clients to request quotes or callbacks directly from the chat or the standalone contact form.
- A comprehensive Administrator Portal for querying, filtering, updating statuses (`New`, `Contacted`, `In Progress`, `Closed`), reviewing detailed enquiry dossiers, and exporting records to CSV.

---

## Key Features

### 1. Interactive Landing Page
- **Hero & Trust Metrics**: Highlighting 2,800+ pilots trained, 180,000+ acres surveyed, and a 99.4% DGCA pass rate.
- **Commercial Fleet Services**: Specialized cards for Aerial Surveying & 3D Mapping, Industrial Thermal Inspection, Precision Agriculture Spraying, and Aerial Cinematography.
- **DGCA Pilot Academy**: Courses with syllabus highlights, duration, eligibility criteria, and instant enrollment links.
- **Standalone Enquiry Form**: Full validation for Name, Email, Phone, User Type (`Student`, `Customer`, `Other`), and Service of Interest.
- **100% Responsive Design**: Seamless experience across mobile smartphones, tablets, laptops, and wide screens.

### 2. Intelligent Rule-Based Chatbot
- **Predefined Inquiries**: Supports all mandatory assignment questions:
  - *"What services does DroneTV provide?"*
  - *"What courses / training are available?"*
  - *"How can I contact DroneTV?"*
  - *"How can I register?"*
  - *"I am interested in a service."*
  - *"I am a student."*
  - *"I want to speak with someone."*
- **Clickable Prompt Chips**: Fast, one-click exploratory question buttons.
- **Keyword & Intent Matching**: Flexible matching for natural variations (e.g., `pricing`, `survey`, `dgca`, `license`, `call me`).
- **Conversational Lead Capture**: Embeds an interactive callback and enrollment form directly inside the conversation stream.
- **Graceful Fallbacks**: Friendly fallback responses when input is unrecognized.
- **Session Persistence & Reset**: Maintains dialogue history in `sessionStorage` with a one-click reset button.

### 3. Administrator Enquiry Dashboard (`/admin`)
- **Live Summary Metrics**: Real-time counters for Total Enquiries, New Leads, Contacted, In Progress, Closed, and Students vs. Commercial Clients.
- **Real-Time Search**: Instant filtering across name, email, phone number, service, or message content.
- **Multi-Criteria Filtering**: Filter by User Type (`All`, `Student`, `Customer`, `Other`) and Status (`All`, `New`, `Contacted`, `In Progress`, `Closed`).
- **Inline Status Workflow**: Quick dropdown to transition leads through their operational lifecycle with immediate UI updates.
- **Full Dossier Modal**: Comprehensive view with complete messages, origin channels (`Chatbot` vs `Contact Form`), and an internal notes editor.
- **Export to CSV**: One-click download of all filtered records for spreadsheet reporting.
- **Safe Record Deletion**: Modal-confirmed deletion to prevent accidental data loss.

### 4. Security & Error Handling Hardening
- **Zero Client Trust**: Dual-layer validation using **Zod** on both frontend and backend.
- **Sanitized Outputs**: Sensitive database credentials and server stack traces are never leaked to clients in production.
- **HTTP Header Protection**: Enforced via **Helmet**.
- **Rate Limiting**: Automated spam prevention restricting rapid submissions per IP.
- **CORS Lockdown**: Whitelisted frontend origin communication.

---

## Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling & Layout** | Tailwind CSS (Pure utility, Zero PostCSS dependency), Lucide React Icons |
| **Backend Runtime** | Node.js (v20+ / v22+), Express.js 4.x, TypeScript |
| **Database & ODM** | MongoDB, Mongoose 8.x (with resilient in-memory fallback) |
| **Validation & Schema** | Zod 3.x |
| **Security & Middleware** | Helmet, CORS, Express-Rate-Limit, Morgan |
| **Dev Tooling** | TS-Node-Dev, Rimraf |

---

## High-Level Architecture

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT TIER                                       |
|  - Landing Page (Hero, Drone Services, DGCA Courses, Contact Form)                |
|  - Rule-Based Chatbot Widget (Suggested Qs, Predefined Q&A, Inline Lead Capture)   |
|  - Admin Dashboard (/admin: Metrics, Live Search, Filter, Status Change, Delete)  |
+-----------------------------------------------------------------------------------+
                                       │
                      HTTP REST (JSON) │ Fetch Client (Port 3000 -> 5000)
                                       ▼
+-----------------------------------------------------------------------------------+
|                                 BACKEND API                                       |
|  - Middleware: Helmet, CORS, Rate Limiting, Request Logging                       |
|  - Validation: Zod Schema Validators (Dual-Layer Validation)                      |
|  - Controllers: Enquiries CRUD, Search/Filter, Stats Aggregation                  |
|  - Centralized Error Handler: Mask internal traces, user-friendly errors           |
+-----------------------------------------------------------------------------------+
                                       │
                              Mongoose │ Queries & Aggregations
                                       ▼
+-----------------------------------------------------------------------------------+
|                                DATABASE TIER                                      |
|  MongoDB Collection: `enquiries`                                                  |
|  (name, email, phone, userType, serviceOrCourse, message, status, source, dates)  |
+-----------------------------------------------------------------------------------+
```

---

## Project Structure

```text
FullStack_Chatbot_Task/
├── client/                         # Frontend React + TypeScript application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Main header with brand & Admin switcher
│   │   │   ├── HeroSection.tsx     # Hero banner with trust statistics
│   │   │   ├── ServicesSection.tsx # Commercial UAV offerings
│   │   │   ├── CoursesSection.tsx  # DGCA Pilot Academy programs
│   │   │   ├── ContactSection.tsx  # Standalone lead form with validation
│   │   │   ├── Footer.tsx          # Company footer & credits
│   │   │   ├── chatbot/
│   │   │   │   ├── ChatbotWidget.tsx     # Floating assistant widget
│   │   │   │   ├── ChatLeadForm.tsx      # Inline lead capture form
│   │   │   └── admin/
│   │   │       └── AdminDashboard.tsx    # Live admin management portal
│   │   ├── services/
│   │   │   └── api.ts              # Centralized API service with error handling
│   │   ├── types/
│   │   │   └── index.ts            # Shared TypeScript contracts
│   │   ├── App.tsx                 # Root component with view routing
│   │   ├── index.css               # Global typography & scrollbar styling
│   │   └── main.tsx                # React DOM entry point
│   ├── index.html                  # Direct Tailwind script & HTML template
│   ├── package.json                # Frontend dependencies & scripts
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                         # Backend Express + TypeScript application
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts               # Mongoose MongoDB connection & fallback
│   │   ├── controllers/
│   │   │   └── enquiryController.ts# Enquiries CRUD & stats controller
│   │   ├── middleware/
│   │   │   ├── errorMiddleware.ts  # Masked error handler
│   │   │   └── validationMiddleware.ts # Zod payload validators
│   │   ├── models/
│   │   │   └── Enquiry.ts          # Mongoose schema with indexes
│   │   ├── routes/
│   │   │   └── enquiryRoutes.ts    # REST endpoint definitions
│   │   ├── services/
│   │   │   └── enquiryService.ts   # Persistence service with fallback store
│   │   ├── utils/
│   │   │   └── seedData.ts         # Pre-populated realistic DroneTV sample records
│   │   └── server.ts               # Express application initialization
│   ├── .env.example                # Sample environment variables
│   ├── package.json                # Backend dependencies & scripts
│   └── tsconfig.json
│
├── .gitignore                      # Git ignored files & patterns
└── README.md                       # Master project documentation
```

---

## Setup & Installation

### Prerequisites
- **Node.js**: v18.x, v20.x, or v22.x
- **npm**: v9.x or higher
- **MongoDB** *(Optional)*: Local MongoDB instance (`mongodb://127.0.0.1:27017`) or MongoDB Atlas. *(The backend automatically falls back to an embedded persistent repository if no local MongoDB instance is active).*

---

### Step 1: Start the Backend Server

Open a terminal and navigate to the `server` directory:

```bash
cd server
npm install
npm run dev
```

The API server will start on **`http://localhost:5000`**.

---

### Step 2: Start the Frontend Client

Open a **second terminal** and navigate to the `client` directory:

```bash
cd client
npm install
npm run dev
```

The frontend client will start on **`http://localhost:3000`**.

---

## Environment Variables

The backend configuration is managed via `.env` in the `server/` directory (a template is provided in `server/.env.example`):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/dronetv
CLIENT_URL=http://localhost:3000
```

---

## Database Setup & Seeding

### Seeding Sample Data
To populate the database with realistic initial leads across all statuses (`New`, `Contacted`, `In Progress`, `Closed`):

```bash
cd server
npm run seed
```

The seed dataset contains realistic entries for aerospace students, precision agriculture orchard owners, highway survey engineering firms, and aerial cinematography teams.

---

## API Endpoints Documentation

**Base URL**: `http://localhost:5000/api`

| Method | Endpoint | Description | Query / Body Payload | Response Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health & uptime check | None | `200 OK` |
| `GET` | `/api/enquiries/stats` | Aggregated dashboard metrics | None | `200 OK` |
| `GET` | `/api/enquiries` | Get enquiries with search & filter | `?search=...&userType=...&status=...` | `200 OK` |
| `GET` | `/api/enquiries/:id` | Get single enquiry by ID | None | `200 OK`, `404 Not Found` |
| `POST` | `/api/enquiries` | Create new enquiry / lead | `{ name, email, phone, userType, serviceOrCourse, message, source }` | `201 Created`, `400 Bad Request` |
| `PATCH` | `/api/enquiries/:id` | Update enquiry status or notes | `{ status: "Contacted", adminNotes: "Called" }` | `200 OK`, `404 Not Found` |
| `DELETE` | `/api/enquiries/:id` | Remove enquiry record | None | `200 OK`, `404 Not Found` |

---


### Author Note
Developed with care and precision for the **IPAGE Group Full Stack Developer Internship** selection process.
