const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../config/auth');

class User {
  static async create(userData) {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      role = 'customer'
    } = userData;

    const userId = uuidv4();
    const hashedPassword = await hashPassword(password);
    const createdAt = new Date();

    const query = `
      INSERT INTO users (
        id, first_name, last_name, email, phone, password_hash, role, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, first_name, last_name, email, phone, role, created_at;
    `;

    const result = await pool.query(query, [
      userId,
      first_name,
      last_name,
      email,
      phone,
      hashedPassword,
      role,
      createdAt
    ]);

    return result.rows[0];
  }

  static async findById(userId) {
    const query = `
      SELECT id, first_name, last_name, email, phone, role, created_at
      FROM users WHERE id = $1;
    `;

    const result = await pool.query(query, [userId]);
    return result.rows[0] || null;
  }

  static async findByEmail(email) {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  static async update(userId, updates) {
    const allowedFields = ['first_name', 'last_name', 'phone'];
    const keys = Object.keys(updates).filter(k => allowedFields.includes(k));

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = keys.map(key => updates[key]);
    values.push(userId);

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING id, first_name, last_name, email, phone, role, created_at;
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(userId) {
    const query = 'DELETE FROM users WHERE id = $1;';
    await pool.query(query, [userId]);
  }
}

module.exports = User;
