const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Account {
  static async create(accountData) {
    const {
      user_id,
      account_type,
      balance = 0
    } = accountData;

    const accountId = uuidv4();
    const accountNumber = this.generateAccountNumber();
    const createdAt = new Date();

    const query = `
      INSERT INTO accounts (
        id, user_id, account_number, account_type, balance, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, user_id, account_number, account_type, balance, created_at;
    `;

    const result = await pool.query(query, [
      accountId,
      user_id,
      accountNumber,
      account_type,
      balance,
      createdAt
    ]);

    return result.rows[0];
  }

  static async findById(accountId) {
    const query = `
      SELECT * FROM accounts WHERE id = $1;
    `;

    const result = await pool.query(query, [accountId]);
    return result.rows[0] || null;
  }

  static async findByAccountNumber(accountNumber) {
    const query = `
      SELECT * FROM accounts WHERE account_number = $1;
    `;

    const result = await pool.query(query, [accountNumber]);
    return result.rows[0] || null;
  }

  static async findByUserId(userId) {
    const query = `
      SELECT * FROM accounts WHERE user_id = $1 ORDER BY created_at DESC;
    `;

    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async updateBalance(accountId, newBalance) {
    const query = `
      UPDATE accounts
      SET balance = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(query, [newBalance, accountId]);
    return result.rows[0];
  }

  static generateAccountNumber() {
    return Math.random().toString().substring(2, 14).padStart(12, '0');
  }
}

module.exports = Account;
