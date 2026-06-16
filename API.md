# Banking Management System API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format
Success:
```json
{
  "data": {...},
  "message": "Operation successful"
}
```

Error:
```json
{
  "error": "Error message"
}
```

## Auth Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "9841234567",
  "password": "password123",
  "confirmPassword": "password123"
}

Response: 201 Created
{
  "user": {...},
  "token": "jwt_token"
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": {...},
  "token": "jwt_token"
}
```

### Get Profile
```
GET /auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "9841234567",
    "role": "customer"
  }
}
```

## Account Endpoints

### Create Account
```
POST /accounts
Authorization: Bearer <token>

{
  "account_type": "savings"
}

Response: 201 Created
{
  "account": {
    "id": "uuid",
    "account_number": "100001000001",
    "account_type": "savings",
    "balance": "0.00"
  }
}
```

### Get All Accounts
```
GET /accounts
Authorization: Bearer <token>

Response: 200 OK
{
  "accounts": [...]
}
```

### Deposit
```
POST /accounts/:accountId/deposit
Authorization: Bearer <token>

{
  "amount": "5000.00"
}

Response: 200 OK
{
  "account": {...},
  "message": "Deposit successful"
}
```

### Withdraw
```
POST /accounts/:accountId/withdraw
Authorization: Bearer <token>

{
  "amount": "1000.00"
}

Response: 200 OK
{
  "account": {...},
  "message": "Withdrawal successful"
}
```

## Transaction Endpoints

### Transfer Funds
```
POST /transactions/transfer
Authorization: Bearer <token>

{
  "fromAccountId": "uuid",
  "toAccountNumber": "100001000002",
  "amount": "500.00",
  "description": "Monthly payment"
}

Response: 200 OK
{
  "transaction": {...},
  "message": "Transfer successful"
}
```

### Get Transaction History
```
GET /transactions/:accountId/history?limit=50&offset=0
Authorization: Bearer <token>

Response: 200 OK
{
  "transactions": [...],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 100
  }
}
```

## Loan Endpoints

### Apply for Loan
```
POST /loans/apply
Authorization: Bearer <token>

{
  "account_id": "uuid",
  "loan_amount": "50000.00",
  "interest_rate": "10.5",
  "tenure_months": 36,
  "purpose": "Home renovation"
}

Response: 201 Created
{
  "loan": {...},
  "message": "Loan application submitted"
}
```

### Get Loan History
```
GET /loans
Authorization: Bearer <token>

Response: 200 OK
{
  "loans": [...]
}
```

### Approve Loan (Admin Only)
```
PUT /loans/:loanId/approve
Authorization: Bearer <token>

Response: 200 OK
{
  "loan": {...},
  "message": "Loan approved"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400  | Bad Request - Invalid input |
| 401  | Unauthorized - Missing or invalid token |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource doesn't exist |
| 409  | Conflict - Resource already exists |
| 500  | Internal Server Error |

## Rate Limiting
Recommended to implement in production:
- 100 requests per 15 minutes per IP

## CORS
Configured to accept requests from:
- `http://localhost:3000` (development)
- Production domain (configure in production)
