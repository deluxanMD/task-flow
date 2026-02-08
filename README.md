# TaskFlow

![Backend CI](https://github.com/deluxanMD/TaskFlow/workflows/CI/badge.svg)
![Client CI](https://github.com/deluxanMD/TaskFlow/workflows/Client%20CI/badge.svg)

> A scalable task management platform built with microservices architecture, demonstrating full-stack development with React, Node.js, PostgreSQL, MongoDB, Docker, and Kubernetes.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [API Documentation](#api-documentation)
- [CI/CD](#cicd)
- [Project Status](#project-status)
- [License](#license)

## 🎯 Project Overview

TaskFlow is a modern, full-stack task management application designed to showcase:

- Microservices architecture patterns
- JWT-based authentication
- Type-safe development with TypeScript
- RESTful API design
- Modern React patterns with Next.js
- DevOps best practices with CI/CD

## 🛠 Tech Stack

### Backend

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 16
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Password Hashing:** bcryptjs
- **Path Aliases:** tsconfig-paths

### Frontend

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Token Decoding:** jwt-decode

### DevOps & Tools

- **Code Quality:** ESLint, Prettier
- **CI/CD:** GitHub Actions
- **Version Control:** Git
- **Package Manager:** npm
- **Containerization:** Docker (planned)
- **Orchestration:** Kubernetes (planned)

## 📁 Project Structure

```
TaskFlow/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Backend CI pipeline
│       └── client-ci.yml       # Frontend CI pipeline
│
├── server/                     # Backend application
│   ├── src/
│   │   ├── config/            # Database & environment config
│   │   │   ├── database.ts
│   │   │   └── init-db.ts
│   │   ├── controllers/       # Request handlers
│   │   │   └── auth.controller.ts
│   │   ├── middlewares/       # Custom middleware
│   │   │   ├── auth.ts
│   │   │   └── validate.ts
│   │   ├── routes/            # API routes
│   │   │   ├── auth.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── types/             # TypeScript types
│   │   │   └── index.ts
│   │   ├── validators/        # Zod schemas
│   │   │   └── auth.validator.ts
│   │   └── server.ts          # Express app entry
│   ├── .env.development       # Development environment variables
│   ├── .env.example           # Environment template
│   ├── tsconfig.json          # TypeScript config
│   ├── eslint.config.mjs      # ESLint config
│   ├── .prettierrc            # Prettier config
│   └── package.json
│
├── client/                     # Frontend application
│   ├── app/
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── dashboard/         # Protected dashboard
│   │   │   └── page.tsx
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Home page (redirects)
│   ├── components/            # React components
│   │   └── ProtectedRoute.tsx
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/                   # Utilities
│   │   └── api.ts
│   ├── types/                 # TypeScript declarations
│   │   └── globals.d.ts
│   ├── .env.local             # Local environment variables
│   ├── .env.example           # Environment template
│   ├── tsconfig.json          # TypeScript config
│   ├── .eslintrc.json         # ESLint config
│   ├── .prettierrc            # Prettier config
│   └── package.json
│
└── README.md                   # This file
```

## ✨ Features

### Completed (Phase 1)

#### Backend

- ✅ User registration with validation
  - Email format validation
  - Password strength requirements (min 6 chars, uppercase, lowercase, number)
  - Duplicate email prevention
- ✅ User login with JWT authentication
  - Token generation with 7-day expiration
  - Secure password comparison
- ✅ Protected API routes
  - JWT verification middleware
  - User profile retrieval
- ✅ Input validation with Zod
  - Type-safe schema validation
  - Detailed error messages
- ✅ PostgreSQL database integration
  - User table with proper constraints
  - Secure password hashing with bcrypt
- ✅ CORS configuration for frontend
- ✅ TypeScript with strict type checking
- ✅ Absolute path imports with tsconfig-paths

#### Frontend

- ✅ User authentication flow
  - Registration page with validation
  - Login page with error handling
  - Auto-redirect based on auth status
- ✅ Protected routes
  - Dashboard accessible only when authenticated
  - Auto-redirect to login when not authenticated
- ✅ Token management
  - localStorage for token persistence
  - Token expiration checking
  - Automatic logout on invalid token
- ✅ Global auth state with Context API
  - User profile available app-wide
  - Loading states during auth checks
- ✅ Axios interceptors
  - Auto-attach JWT to requests
  - Auto-redirect on 401 errors
- ✅ Type-safe with TypeScript
- ✅ Responsive UI with Tailwind CSS

#### DevOps

- ✅ GitHub Actions CI/CD
  - Separate pipelines for backend and frontend
  - Path-based triggering (only run when files change)
  - Automated linting, type checking, and building
- ✅ Code quality tools
  - ESLint for code quality
  - Prettier for code formatting
  - Pre-configured with strict rules
- ✅ Build artifact uploads
  - Preserved for 7 days
  - Available for deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ ([Download](https://nodejs.org/))
- PostgreSQL 16+ ([Download](https://www.postgresql.org/download/))
- npm (comes with Node.js)
- Git

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/deluxanMD/TaskFlow.git
cd TaskFlow
```

#### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.development

# Update .env.development with your configuration:
# - PORT=5001
# - DATABASE_URL=postgresql://username:password@localhost:5432/taskflow
# - JWT_SECRET=your_super_secret_key
# - NODE_ENV=development
# - CLIENT_URL=http://localhost:3000
```

**Create PostgreSQL database:**

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE taskflow;

# Create user (if needed)
CREATE USER your_username WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE taskflow TO your_username;

# Exit
\q
```

**Initialize database tables:**

```bash
# Run database initialization
npm run init-db
```

**Start backend server:**

```bash
npm run dev
```

Backend will be running at `http://localhost:5001`

#### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Update .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5001
```

**Start frontend development server:**

```bash
npm run dev
```

Frontend will be running at `http://localhost:3000`

## 💻 Development

### Backend Commands

```bash
cd server

# Development with hot reload
npm run dev

# Linting
npm run lint
npm run lint:fix
npm run lint:ci          # Strict mode for CI

# Formatting
npm run format
npm run format:check

# Type checking
tsc --noEmit

# Build for production
npm run build

# Run production build
npm start
```

### Frontend Commands

```bash
cd client

# Development with hot reload
npm run dev

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Formatting
npm run format
npm run format:check

# Build for production
npm run build

# Run production build
npm start
```

### Database Commands

```bash
# Connect to database
psql -U your_username -d taskflow

# Inside psql:
\dt                    # List tables
\d users              # Describe users table
SELECT * FROM users;  # View all users
\q                    # Exit
```

## 📚 API Documentation

### Base URL

```
http://localhost:5001
```

### Endpoints

#### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "message": "TaskFlow API is running"
}
```

---

#### Register User

```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Validation Rules:**

- `name`: 2-50 characters
- `email`: Valid email format
- `password`: Min 6 characters, must contain uppercase, lowercase, and number

**Response (201 Created):**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

#### Login

```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "error": "Invalid credentials"
}
```

---

#### Get Current User (Protected)

```http
GET /api/users/me
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-02-08T10:30:00.000Z"
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "error": "No token, authorization denied"
}
```

## 🔄 CI/CD

### Backend CI Pipeline

Triggers on:

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Changes in `server/**` or `.github/workflows/ci.yml`

Pipeline steps:

1. ✅ Install dependencies
2. ✅ Run ESLint (strict mode, max 0 warnings)
3. ✅ Check Prettier formatting
4. ✅ Build TypeScript
5. ✅ Upload build artifacts

### Frontend CI Pipeline

Triggers on:

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Changes in `client/**` or `.github/workflows/client-ci.yml`

Pipeline steps:

1. ✅ Install dependencies
2. ✅ Check Prettier formatting
3. ✅ Run ESLint
4. ✅ TypeScript type checking
5. ✅ Build Next.js application
6. ✅ Upload build artifacts

## 📊 Project Status

### Phase 1: Foundation ✅ COMPLETED

- [x] Project setup and repository initialization
- [x] PostgreSQL database setup
- [x] User authentication (register, login)
- [x] JWT token management
- [x] Protected routes (backend)
- [x] Input validation with Zod
- [x] Next.js frontend setup
- [x] Auth pages (login, register)
- [x] Protected routes (frontend)
- [x] Global auth state management
- [x] ESLint and Prettier configuration
- [x] GitHub Actions CI/CD pipelines
- [x] Comprehensive documentation

### Phase 2: Task Management (In Progress)

- [ ] Tasks table schema design
- [ ] Task CRUD operations (Create, Read, Update, Delete)
- [ ] Task assignment to users
- [ ] Task filtering and search
- [ ] Task status management (To Do, In Progress, Done)
- [ ] Task priority levels (Low, Medium, High)
- [ ] Due dates and reminders
- [ ] Frontend task management UI
- [ ] Task list and detail views
- [ ] Task creation and editing forms

### Phase 3: Activity Logging & Notifications

- [ ] MongoDB setup
- [ ] Activity logs service
- [ ] Real-time notifications
- [ ] Activity feed UI
- [ ] Email notifications (optional)

### Phase 4: Microservices Architecture

- [ ] Service decomposition
- [ ] API Gateway setup
- [ ] Service-to-service communication
- [ ] Message queue integration (optional)

### Phase 5: Containerization

- [ ] Docker setup for all services
- [ ] Docker Compose for local development
- [ ] Multi-stage builds optimization
- [ ] Container registry setup

### Phase 6: Kubernetes Deployment

- [ ] Kubernetes manifests (Deployments, Services, Ingress)
- [ ] ConfigMaps and Secrets
- [ ] Persistent volumes
- [ ] Production deployment
- [ ] Monitoring and logging

## 🤝 Contributing

This is a learning project for portfolio purposes. However, suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@deluxanMD](https://github.com/deluxanMD)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- Inspired by modern full-stack development practices
- Built as a learning project to demonstrate microservices architecture
- Thanks to the open-source community for excellent tools and libraries

---

**Note:** Replace `deluxanMD` with your actual GitHub username and update the author section with your information.
