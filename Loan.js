const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Loan {
  static async create(loanData) {
    const {
      user_id,
      account_id,
      loan_amount,
      interest_rate,
      tenure_months,
      purpose
    } = loanData;

    const loanId = uuidv4();
    const createdAt = new Date();
    const monthlyPayment = this.calculateMonthlyPayment(loan_amount, interest_rate, tenure_months);

    const query = `
      INSERT INTO loans (
        id, user_id, account_id, loan_amount, interest_rate, 
        tenure_months, monthly_payment, purpose, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      loanId,
      user_id,
      account_id,
      loan_amount,
      interest_rate,
      tenure_months,
      monthlyPayment,
      purpose,
      'pending',
      createdAt
    ]);

    return result.rows[0];
  }

  static async findById(loanId) {
    const query = `
      SELECT * FROM loans WHERE id = $1;
    `;

    const result = await pool.query(query, [loanId]);
    return result.rows[0] || null;
  }

  static async findByUserId(userId) {
    const query = `
      SELECT * FROM loans WHERE user_id = $1 ORDER BY created_at DESC;
    `;

    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async updateStatus(loanId, status) {
    const query = `
      UPDATE loans
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(query, [status, loanId]);
    return result.rows[0];
  }

  static calculateMonthlyPayment(principal, annualRate, months) {
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
           (Math.pow(1 + monthlyRate, months) - 1);
  }
}

module.exports = Loan;
