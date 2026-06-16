# Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Security review done
- [ ] Performance testing completed
- [ ] Backup strategy in place

## Environment Setup

### Production Environment Variables

**Backend (.env.production)**
```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@db-host:5432/banking_system
JWT_SECRET=your_very_secure_secret_key_min_32_chars
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12
```

**Frontend (.env.production)**
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

## Docker Deployment

### Build and Run with Docker Compose

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Cloud Deployment

### Heroku (Backend)

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Add PostgreSQL addon: `heroku addons:create heroku-postgresql:standard-0`
5. Set environment variables: `heroku config:set JWT_SECRET=your_secret`
6. Deploy: `git push heroku main`

### Vercel/Netlify (Frontend)

1. Connect repository
2. Set environment variables
3. Configure build command: `npm run build`
4. Set output directory: `build`
5. Deploy

### AWS Deployment

#### EC2 Setup
```bash
# SSH into instance
ssh -i key.pem ec2-user@instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install PostgreSQL
sudo amazon-linux-extras install postgresql12

# Clone repository
git clone your-repo-url
cd MyBankProject
```

#### Setup with PM2
```bash
# Install PM2
npm install -g pm2

# Start backend
cd backend
npm install
pm2 start src/server.js --name banking-api

# Start frontend
cd ../frontend
npm install
npm run build
pm2 serve build 3000 --name banking-web
```

### Nginx Configuration (Reverse Proxy)

**Backend**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Frontend**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/banking-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
    }
}
```

## SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d yourdomain.com

# Renew certificates
sudo certbot renew --dry-run
```

## Database Backup Strategy

### Automated Backups

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/banking-system"
DB_NAME="banking_system"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

pg_dump -U postgres $DB_NAME > "$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Keep last 30 days of backups
find $BACKUP_DIR -name "backup_*.sql" -mtime +30 -delete
```

### Restore from Backup

```bash
psql -U postgres -d banking_system < backup_20240101_120000.sql
```

## Monitoring & Logging

### Backend Logging

```javascript
// Add Winston logger
const logger = require('winston');

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});
```

### System Monitoring

- Monitor CPU, memory, disk usage
- Set up alerts for errors
- Use APM tools (New Relic, DataDog)

## Performance Optimization

### Frontend
- Enable gzip compression
- Minify CSS and JavaScript
- Use CDN for static assets
- Lazy load components
- Implement caching headers

### Backend
- Enable connection pooling
- Implement caching (Redis)
- Optimize database queries
- Use pagination for large datasets
- Implement rate limiting

## Security Hardening

1. Enable HTTPS/SSL
2. Set security headers
3. Implement CSRF protection
4. Rate limiting
5. Input validation and sanitization
6. Regular security updates
7. Firewall configuration
8. WAF (Web Application Firewall)

## Maintenance

### Regular Tasks
- Monitor error logs
- Review performance metrics
- Update dependencies
- Backup databases
- Review security logs
- Check disk space

### Troubleshooting
- Check application logs
- Verify database connectivity
- Monitor resource usage
- Review error codes

## Rollback Procedure

1. Stop the application
2. Restore from previous backup
3. Revert code to previous version
4. Restart services
5. Verify functionality

## Contact & Support

For deployment issues, refer to documentation or contact DevOps team.
