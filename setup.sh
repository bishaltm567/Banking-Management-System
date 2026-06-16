#!/bin/bash

# Banking Management System - Setup Script
# This script automates the initial setup of the project

set -e

echo "================================"
echo "Banking Management System Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Create database
echo -e "${BLUE}Step 1: Setting up PostgreSQL database...${NC}"
createdb banking_system 2>/dev/null || echo "Database already exists"
psql -U postgres -d banking_system -f database/schema.sql > /dev/null
psql -U postgres -d banking_system -f database/seed.sql > /dev/null
echo -e "${GREEN}✓ Database setup complete${NC}"
echo ""

# Step 2: Setup backend
echo -e "${BLUE}Step 2: Setting up backend...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
  npm install > /dev/null
fi
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "Created .env file - please update DATABASE_URL if needed"
fi
cd ..
echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Step 3: Setup frontend
echo -e "${BLUE}Step 3: Setting up frontend...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
  npm install > /dev/null
fi
cd ..
echo -e "${GREEN}✓ Frontend setup complete${NC}"
echo ""

# Step 4: Display instructions
echo -e "${BLUE}Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Start backend:  cd backend && npm run dev"
echo "2. Start frontend: cd frontend && npm start"
echo "3. Open browser:   http://localhost:3000"
echo ""
echo "Test Credentials:"
echo "  Email:    john@example.com"
echo "  Password: password123"
echo ""
echo "For more information, see README.md"
