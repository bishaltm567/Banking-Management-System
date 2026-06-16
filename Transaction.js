const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Transaction {
  static async create(transactionData) {
    const {
      from_account_id,
      to_account_id,
      amount,
      type,
      description
    } = transactionData;

    const transactionId = uuidv4();
    const createdAt = new Date();

    const query = `
      INSERT INTO transactions (
        id, from_account_id, to_account_id, amount, type, description, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      transactionId,
      from_account_id,
      to_account_id,
      amount,
      type,
      description,
      createdAt
    ]);

    return result.rows[0];
  }

  static async findById(transactionId) {
    const query = `
      SELECT * FROM transactions WHERE id = $1;
    `;

    const result = await pool.query(query, [transactionId]);
    return result.rows[0] || null;
  }

  static async findByAccountId(accountId, limit = 50, offset = 0) {
    const query = `
      SELECT * FROM transactions
      WHERE from_account_id = $1 OR to_account_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3;
    `;

    const result = await pool.query(query, [accountId, limit, offset]);
    return result.rows;
  }

  static async getAccountTransactionCount(accountId) {
    const query = `
      SELECT COUNT(*) FROM transactions
      WHERE from_account_id = $1 OR to_account_id = $1;
    `;

    const result = await pool.query(query, [accountId]);
    return parseInt(result.rows[0].count);
  }
}

module.exports = Transaction;
