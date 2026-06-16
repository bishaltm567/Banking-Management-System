// Database simulation using JSON file storage
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_DIR = path.join(__dirname, '../data');
const TABLES = {
  users: 'users.json',
  accounts: 'accounts.json',
  transactions: 'transactions.json',
  loans: 'loans.json'
};

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize empty tables
const initializeTables = () => {
  Object.values(TABLES).forEach(file => {
    const filePath = path.join(DB_DIR, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
  });
};

// Read data from file
const readData = (table) => {
  try {
    const filePath = path.join(DB_DIR, TABLES[table]);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write data to file
const writeData = (table, data) => {
  const filePath = path.join(DB_DIR, TABLES[table]);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Simple database mock
class MockDatabase {
  async query(sql, params = []) {
    // This is a basic implementation
    // In production, this would parse and execute SQL
    return { rows: [] };
  }

  async end() {
    // Nothing to do for file-based storage
  }
}

// Initialize database
initializeTables();
const mockDB = new MockDatabase();

module.exports = mockDB;
