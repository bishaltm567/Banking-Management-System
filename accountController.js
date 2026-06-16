const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const { validateAmount } = require('../utils/validators');

class AccountController {
  static async createAccount(req, res) {
    try {
      const { account_type } = req.body;

      if (!account_type || !['savings', 'checking', 'loan'].includes(account_type)) {
        return res.status(400).json({ error: 'Valid account type is required' });
      }

      const account = await Account.create({
        user_id: req.user.id,
        account_type,
        balance: 0
      });

      res.status(201).json({
        message: 'Account created successfully',
        account
      });
    } catch (error) {
      console.error('Create account error:', error);
      res.status(500).json({ error: 'Failed to create account' });
    }
  }

  static async getAccounts(req, res) {
    try {
      const accounts = await Account.findByUserId(req.user.id);

      res.json({ accounts });
    } catch (error) {
      console.error('Get accounts error:', error);
      res.status(500).json({ error: 'Failed to retrieve accounts' });
    }
  }

  static async getAccountDetails(req, res) {
    try {
      const { accountId } = req.params;
      const account = await Account.findById(accountId);

      if (!account || account.user_id !== req.user.id) {
        return res.status(404).json({ error: 'Account not found' });
      }

      res.json({ account });
    } catch (error) {
      console.error('Get account details error:', error);
      res.status(500).json({ error: 'Failed to retrieve account details' });
    }
  }

  static async deposit(req, res) {
    try {
      const { accountId } = req.params;
      const { amount } = req.body;

      if (!validateAmount(amount)) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const account = await Account.findById(accountId);
      if (!account || account.user_id !== req.user.id) {
        return res.status(404).json({ error: 'Account not found' });
      }

      const newBalance = parseFloat(account.balance) + parseFloat(amount);
      const updatedAccount = await Account.updateBalance(accountId, newBalance);

      await Transaction.create({
        from_account_id: null,
        to_account_id: accountId,
        amount,
        type: 'deposit',
        description: 'Cash Deposit'
      });

      res.json({
        message: 'Deposit successful',
        account: updatedAccount
      });
    } catch (error) {
      console.error('Deposit error:', error);
      res.status(500).json({ error: 'Failed to process deposit' });
    }
  }

  static async withdraw(req, res) {
    try {
      const { accountId } = req.params;
      const { amount } = req.body;

      if (!validateAmount(amount)) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const account = await Account.findById(accountId);
      if (!account || account.user_id !== req.user.id) {
        return res.status(404).json({ error: 'Account not found' });
      }

      if (parseFloat(account.balance) < parseFloat(amount)) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }

      const newBalance = parseFloat(account.balance) - parseFloat(amount);
      const updatedAccount = await Account.updateBalance(accountId, newBalance);

      await Transaction.create({
        from_account_id: accountId,
        to_account_id: null,
        amount,
        type: 'withdrawal',
        description: 'Cash Withdrawal'
      });

      res.json({
        message: 'Withdrawal successful',
        account: updatedAccount
      });
    } catch (error) {
      console.error('Withdrawal error:', error);
      res.status(500).json({ error: 'Failed to process withdrawal' });
    }
  }
}

module.exports = AccountController;
