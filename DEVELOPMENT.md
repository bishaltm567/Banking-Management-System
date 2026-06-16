# Development Guide

## Getting Started for Developers

### Prerequisites
- Node.js v14+ and npm
- PostgreSQL 12+
- Git
- VS Code or similar IDE
- Postman (for API testing)

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MyBankProject
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install && cd ..
   
   # Frontend
   cd frontend && npm install && cd ..
   ```

3. **Setup database**
   ```bash
   createdb banking_system
   psql -U postgres -d banking_system -f database/schema.sql
   psql -U postgres -d banking_system -f database/seed.sql
   ```

4. **Configure environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database URL
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd frontend && npm start
   ```

Visit `http://localhost:3000` in your browser.

## Common Development Tasks

### Adding a New Feature

1. **Create feature branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Backend implementation**
   - Create model in `src/models/`
   - Create controller in `src/controllers/`
   - Create routes in `src/routes/`
   - Add endpoint tests

3. **Frontend implementation**
   - Create page/component in `src/pages/` or `src/components/`
   - Add API service methods in `src/services/api.js`
   - Create styling in `src/styles/`

4. **Database changes**
   - Update `database/schema.sql`
   - Run migration: `psql -d banking_system -f migration.sql`

5. **Test thoroughly**
   - Test API with Postman
   - Test UI in browser
   - Check console for errors

6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add feature-name"
   git push origin feature/feature-name
   ```

### Testing APIs with Postman

1. **Import collection**
   - Create new collection "Banking System"
   - Add requests for each endpoint

2. **Example: Test Login**
   ```
   POST http://localhost:5000/api/auth/login
   Body (JSON):
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Store token for subsequent requests**
   ```
   In Authorization tab:
   Type: Bearer Token
   Token: <paste_token_from_login_response>
   ```

### Debugging

#### Backend Debugging
```javascript
// Add console.log
console.log('Debug message:', variable);

// Or use Node debugger
node --inspect-brk src/server.js

// Visit chrome://inspect in Chrome
```

#### Frontend Debugging
- Use React Developer Tools extension
- Use Browser DevTools (F12)
- Check Network tab for API calls
- Check Console for errors

#### Database Debugging
```bash
# Connect to database
psql -U postgres -d banking_system

# Common queries
SELECT * FROM users;
SELECT * FROM accounts WHERE user_id = 'user_id';
SELECT * FROM transactions LIMIT 10;
```

## Code Style Guidelines

### JavaScript
- Use const/let (no var)
- Use arrow functions
- Use async/await
- Comments for complex logic

```javascript
// Good
const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
```

### CSS
- Use CSS variables for colors
- Mobile-first approach
- Use meaningful class names
- Group related styles

```css
/* Good */
.btn-primary {
  background-color: var(--primary-color);
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
```

## Folder Structure Best Practices

### Backend
```
backend/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Business logic
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── utils/         # Helper functions
│   └── server.js      # Main file
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── context/       # React context
│   ├── styles/        # CSS files
│   ├── App.js
│   └── index.js
└── package.json
```

## Common Issues & Solutions

### Issue: Port already in use

**Backend:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

**Frontend:**
```bash
PORT=3001 npm start
```

### Issue: Database connection error

**Solution:**
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Or on macOS
brew services list

# Check database exists
psql -U postgres -l

# Check DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost:5432/banking_system
```

### Issue: CORS error

**Solution:**
Ensure backend is running and CORS middleware is configured:
```javascript
app.use(cors());
```

Check proxy in frontend package.json:
```json
"proxy": "http://localhost:5000"
```

### Issue: Token expired

**Solution:**
- Logout and login again
- Clear localStorage
- Check JWT_EXPIRE in .env

### Issue: Password hash mismatch

**Solution:**
```bash
# Regenerate sample data with current bcrypt rounds
npm run seed
```

## Performance Optimization Tips

### Backend
- Use database indexes
- Implement pagination
- Cache frequent queries
- Optimize database queries
- Use connection pooling

### Frontend
- Lazy load components
- Optimize images
- Minimize bundle size
- Use React.memo for expensive components
- Implement virtual scrolling for lists

## Security Checklist

- [ ] Passwords are hashed
- [ ] JWT tokens are validated
- [ ] Input is validated
- [ ] SQL injection prevented
- [ ] XSS prevention
- [ ] HTTPS configured (production)
- [ ] Environment variables not in code
- [ ] Error messages don't expose sensitive info
- [ ] CORS properly configured
- [ ] Rate limiting implemented

## Database Maintenance

### Backup
```bash
pg_dump -U postgres banking_system > backup.sql
```

### Restore
```bash
psql -U postgres -d banking_system < backup.sql
```

### Reset Database
```bash
# Drop database
dropdb -U postgres banking_system

# Recreate
createdb -U postgres banking_system
psql -U postgres -d banking_system -f database/schema.sql
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description"

# Push to remote
git push origin feature/feature-name

# Create pull request on GitHub

# After review and merge
git checkout main
git pull origin main
git branch -d feature/feature-name
```

## Useful Commands

### Backend
```bash
# Start dev server
npm run dev

# Start production server
npm start

# Run tests
npm test
```

### Frontend
```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (not recommended)
npm run eject
```

### Database
```bash
# Connect to database
psql -U postgres -d banking_system

# Run SQL file
psql -U postgres -d banking_system -f file.sql

# List databases
psql -U postgres -l

# List tables
\dt

# Describe table
\d table_name

# Exit
\q
```

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Authentication](https://jwt.io/)
- [RESTful API Design](https://restfulapi.net/)

## Getting Help

1. Check existing documentation
2. Search GitHub issues
3. Check Stack Overflow
4. Ask in team chat
5. Create detailed issue report

## Code Review Guidelines

When reviewing code:
- [ ] Does it follow code style?
- [ ] Are error cases handled?
- [ ] Is it performant?
- [ ] Are inputs validated?
- [ ] Is security considered?
- [ ] Are there edge cases?
- [ ] Is it testable?
- [ ] Is documentation clear?

## Contributing Guidelines

1. Follow the coding standards
2. Write meaningful commit messages
3. Test your changes
4. Update documentation
5. Add comments for complex logic
6. Review your own code first
7. Be open to feedback
