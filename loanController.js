const Loan = require('../models/Loan');
const Account = require('../models/Account');
const { validateAmount } = require('../utils/validators');

class LoanController {
  static async applyLoan(req, res) {
    try {
      const { account_id, loan_amount, interest_rate, tenure_months, purpose } = req.body;

      if (!account_id || !validateAmount(loan_amount) || !interest_rate || !tenure_months) {
        return res.status(400).json({ error: 'All fields are required and valid' });
      }

      const account = await Account.findById(account_id);
      if (!account || account.user_id !== req.user.id) {
        return res.status(404).json({ error: 'Account not found' });
      }

      const loan = await Loan.create({
        user_id: req.user.id,
        account_id,
        loan_amount,
        interest_rate,
        tenure_months,
        purpose
      });

      res.status(201).json({
        message: 'Loan application submitted',
        loan
      });
    } catch (error) {
      console.error('Apply loan error:', error);
      res.status(500).json({ error: 'Failed to apply for loan' });
    }
  }

  static async getLoanHistory(req, res) {
    try {
      const loans = await Loan.findByUserId(req.user.id);

      res.json({ loans });
    } catch (error) {
      console.error('Get loan history error:', error);
      res.status(500).json({ error: 'Failed to retrieve loan history' });
    }
  }

  static async getLoanDetails(req, res) {
    try {
      const { loanId } = req.params;
      const loan = await Loan.findById(loanId);

      if (!loan || loan.user_id !== req.user.id) {
        return res.status(404).json({ error: 'Loan not found' });
      }

      res.json({ loan });
    } catch (error) {
      console.error('Get loan details error:', error);
      res.status(500).json({ error: 'Failed to retrieve loan details' });
    }
  }

  static async approveLoan(req, res) {
    try {
      const { loanId } = req.params;
      const loan = await Loan.findById(loanId);

      if (!loan) {
        return res.status(404).json({ error: 'Loan not found' });
      }

      const updatedLoan = await Loan.updateStatus(loanId, 'approved');

      const account = await Account.findById(loan.account_id);
      const newBalance = parseFloat(account.balance) + parseFloat(loan.loan_amount);
      await Account.updateBalance(loan.account_id, newBalance);

      res.json({
        message: 'Loan approved',
        loan: updatedLoan
      });
    } catch (error) {
      console.error('Approve loan error:', error);
      res.status(500).json({ error: 'Failed to approve loan' });
    }
  }

  static async rejectLoan(req, res) {
    try {
      const { loanId } = req.params;
      const loan = await Loan.findById(loanId);

      if (!loan) {
        return res.status(404).json({ error: 'Loan not found' });
      }

      const updatedLoan = await Loan.updateStatus(loanId, 'rejected');

      res.json({
        message: 'Loan rejected',
        loan: updatedLoan
      });
    } catch (error) {
      console.error('Reject loan error:', error);
      res.status(500).json({ error: 'Failed to reject loan' });
    }
  }
}

module.exports = LoanController;
