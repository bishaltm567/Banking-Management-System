# Banking Management System

A comprehensive full-stack web application for managing banking operations. This project includes user authentication, account management, transaction processing, and loan management.

## Project Structure

```
MyBankProject/
├── backend/               # Node.js/Express API
│   ├── src/
│   │   ├── config/       # Database and auth configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── utils/        # Utility functions
│   │   └── server.js     # Main server file
│   ├── package.json
│   └── .env.example
├── frontend/              # React web application
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service layer
│   │   ├── context/      # React context (Auth)
│   │   ├── styles/       # CSS stylesheets
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
└── database/              # Database schema and setup
    ├── schema.sql        # PostgreSQL schema
    ├── seed.sql         # Sample data
    └── README.md
```

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Customer, Admin, Staff)
- Secure password hashing with bcrypt

### Account Management
- Create multiple accounts (Savings, Checking, Loan)
- View account details and balance
- Deposit and withdraw funds
- Real-time balance updates

### Transactions
- Deposit funds
- Withdraw funds
- Transfer money between accounts
- Transaction history with filtering
- Transaction details view

### Loan Management
- Apply for loans
- View loan applications and status
- Calculate monthly payments
- Admin approval/rejection of loans
- Track disbursed and paid amounts

### User Profile
- View profile information
- Update personal details
- Secure authentication

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + bcryptjs
- **Security**: Helmet, CORS

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: React Icons
- **CSS**: Custom CSS with responsive design

### Database
- **DBMS**: PostgreSQL 12+
- **ORM**: Raw SQL queries with pg library

## Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- PostgreSQL (v12+)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/banking_system
JWT_SECRET=your_secret_key
BCRYPT_ROUNDS=10
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Database Setup

1. Create the database:
```bash
createdb banking_system
```

2. Apply the schema:
```bash
psql -U postgres -d banking_system -f database/schema.sql
```

3. (Optional) Load sample data:
```bash
psql -U postgres -d banking_system -f database/seed.sql
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Accounts
- `POST /api/accounts` - Create account
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/:accountId` - Get account details
- `POST /api/accounts/:accountId/deposit` - Deposit funds
- `POST /api/accounts/:accountId/withdraw` - Withdraw funds

### Transactions
- `POST /api/transactions/transfer` - Transfer funds
- `GET /api/transactions/:accountId/history` - Get transaction history
- `GET /api/transactions/:transactionId/details` - Get transaction details

### Loans
- `POST /api/loans/apply` - Apply for loan
- `GET /api/loans` - Get loan history
- `GET /api/loans/:loanId` - Get loan details
- `PUT /api/loans/:loanId/approve` - Approve loan (Admin)
- `PUT /api/loans/:loanId/reject` - Reject loan (Admin)

## Default Credentials

### Admin Account
- Email: `admin@bank.com`
- Password: `password123`

### Customer Account
- Email: `john@example.com`
- Password: `password123`

## Security Features

1. **Password Security**: Passwords are hashed using bcryptjs
2. **JWT Authentication**: Token-based authentication for API
3. **Input Validation**: Server-side validation for all inputs
4. **CORS**: Configured for frontend origin
5. **Helmet**: Security headers with Helmet.js
6. **SQL Injection Prevention**: Using parameterized queries
7. **Rate Limiting**: Ready for implementation

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/banking_system
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
```

## Database Schema

### Users Table
- Stores user information and credentials
- Roles: customer, admin, staff

### Accounts Table
- User bank accounts
- Account types: savings, checking, loan
- Tracks balance and status

### Transactions Table
- Records all financial transactions
- Types: deposit, withdrawal, transfer
- Links to source and destination accounts

### Loans Table
- Loan applications and approvals
- Tracks loan amount, interest rate, tenure
- Stores disbursed and paid amounts

## Error Handling

All API responses follow a consistent format:
- Success: `{ data: {...} }`
- Error: `{ error: "error message" }`

## Future Enhancements

1. Email notifications
2. SMS OTP verification
3. Mobile app (React Native/Flutter)
4. Advanced analytics and reports
5. Bill payment integration
6. Investment products
7. Credit scoring
8. Admin dashboard
9. Audit logging
10. Multi-currency support

## Testing

Run tests:
```bash
npm test
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder

### Backend (Heroku/AWS)
1. Create a `.env.production` file
2. Deploy to your hosting service

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is part of a college final year project for Bachelor in Information Technology (BIT).

## Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Project Submission**
- Institution: Lincoln University College
- Faculty: Computer Science and Multimedia
- Student: Bishal TM
- Semester: BIT 7th Semester
- University ID: LC0003001650
- Date: December 14, 2025
