const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (table) => path.join(DATA_DIR, `${table}.json`);

const readData = (table) => {
  try {
    const filePath = getFilePath(table);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return [];
  }
};

const writeData = (table, data) => {
  const filePath = getFilePath(table);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Initialize seed data
const initializeSeedData = () => {
  const users = readData('users');
  if (users.length === 0) {
    const hashedPassword = crypto
      .createHash('sha256')
      .update('password123')
      .digest('hex');

    const seedUsers = [
      {
        id: 'user-001',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password_hash: hashedPassword,
        role: 'customer',
        created_at: new Date().toISOString()
      },
      {
        id: 'user-002',
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@bank.com',
        phone: '9876543210',
        password_hash: hashedPassword,
        role: 'admin',
        created_at: new Date().toISOString()
      }
    ];

    writeData('users', seedUsers);
  }

  const accounts = readData('accounts');
  if (accounts.length === 0) {
    const seedAccounts = [
      {
        id: 'acc-001',
        user_id: 'user-001',
        account_number: '123456789012',
        account_type: 'savings',
        balance: 5000.00,
        status: 'active',
        created_at: new Date().toISOString()
      },
      {
        id: 'acc-002',
        user_id: 'user-001',
        account_number: '123456789013',
        account_type: 'checking',
        balance: 10000.00,
        status: 'active',
        created_at: new Date().toISOString()
      }
    ];

    writeData('accounts', seedAccounts);
  }
};

module.exports = {
  readData,
  writeData,
  initializeSeedData,
  getFilePath
};
