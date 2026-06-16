# Banking Management System - Quick Start Guide

## Overview
This is a complete full-stack banking management system with React frontend and Node.js/Express backend.

## Quick Start

### Step 1: Database Setup
```bash
# Create PostgreSQL database
createdb banking_system

# Apply schema
psql -U postgres -d banking_system -f database/schema.sql

# (Optional) Load sample data
psql -U postgres -d banking_system -f database/seed.sql
```

### Step 2: Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL
npm run dev
```

Backend runs on `http://localhost:5000`

### Step 3: Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## Default Test Credentials
- Email: `john@example.com`
- Password: `password123`

## Key Features
✅ User authentication with JWT
✅ Account management (Savings, Checking)
✅ Money transfer between accounts
✅ Loan application and management
✅ Transaction history
✅ Responsive UI design
✅ Secure password hashing
✅ Role-based access control

## Project Structure
- `/backend` - Express API with PostgreSQL
- `/frontend` - React web application
- `/database` - SQL schema and seed data

## API Documentation
See [API Endpoints](./API.md) for detailed endpoint documentation.

## Troubleshooting

**Port already in use?**
- Backend: Change PORT in .env
- Frontend: Use PORT=3001 npm start

**Database connection error?**
- Verify PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Ensure database exists

**CORS error?**
- Ensure backend is running on :5000
- Frontend proxy is configured in package.json

## Support
Refer to README.md for comprehensive documentation.
