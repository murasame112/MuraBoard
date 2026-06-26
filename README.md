# MuraBoard

---
> **Work in Progress**
>
> MuraBoard is actively being developed. New features and improvements are continuously added while maintaining a production-oriented architecture and code quality.

## Overview
MuraBoard is a full-stack web application designed to help users organize and track their job search process in one place.

Rather than serving as a simple CRUD application, the project focuses on building a production-style dashboard with advanced filtering, pagination, reusable UI components and a well-structured backend architecture. Users can manage job offers, track application progress, schedule follow-up actions and maintain notes throughout the recruitment process.

The application emphasizes clean separation of concerns between frontend and backend, strongly typed APIs and scalable project organization.

---

## Tech Stack
**Frontend:**
* React
* TypeScript
* Vite
* React Router
* CSS Modules

**Backend:**
* Node.js
* Express
* TypeScript
* REST API

**Database:**
* PostgreSQL
* Prisma ORM

**Development Tools:**
* Nodemon
* dotenv

---

## Features
### Job Offer Management
* Create job offers
* Edit existing job offers
* Delete job offers
* Search job offers
* Advanced filtering
* Pagination
* Company management
* Salary tracking

### Application Tracking
* Apply directly from job offers
* Track recruitment status
* Manage follow-up dates
* Edit application details
* Add recruitment notes
* View recruitment history

### Dashboard
* Search across records
* Multiple filter types
* Pagination
* Bulk selection
* Dashboard statistics
* Responsive desktop layout

### Backend
* RESTful API
* PostgreSQL integration
* Prisma ORM
* Structured controller/service architecture
* Query parsing and validation
* Dynamic filtering
* Environment-based configuration

---

## Setup & Installation

### 1. Clone repository
```
git clone https://github.com/murasame112/MuraBoard.git
cd MuraBoard
```

### 2. Environment variables
Create `.env` file inside the backend directory:

```
DATABASE_URL=
```

### 3. Install dependencies and run project
```
npm install
npm run dev
```

---

## Architecture
The project follows a separated frontend/backend architecture.

* React frontend communicates with the backend through a REST API.
* Express handles routing, validation and business logic.
* Prisma provides type-safe database access.
* PostgreSQL stores application data.
* Business logic is separated from controllers through dedicated service layers.
* Dynamic query parsing enables reusable filtering and pagination across dashboard modules.

---

## Engineering Highlights
* Designed a reusable dashboard architecture shared across multiple data views.
* Implemented strongly typed query parsing for filtering, searching and pagination.
* Built a REST API using a controller/service architecture with Prisma ORM.
* Developed reusable filtering mechanisms supporting multiple entities.
* Applied TypeScript throughout both frontend and backend to improve maintainability and type safety.
* Structured the project for scalability with reusable components and shared utilities.

---

## Author
Built by Tomasz Więsek