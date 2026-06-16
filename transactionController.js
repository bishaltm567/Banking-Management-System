const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const { validateAmount } = require('../utils/validators');

class TransactionController {
  static async transfer(req, res) {
    try {
      const { fromAccountId, toAccountNumber, amount, description } = req.body;

      if (!validateAmount(amount)) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const fromAccount = await Account.findById(fromAccountId);
      if (!fromAccount || fromAccount.user_id !== req.user.id) {
        return res.status(404).json({ error: 'From account not found' });
      }

      const toAccount = await Account.findByAccountNumber(toAccountNumber);
      if (!toAccount) {
        return res.status(404).json({ error: 'Recipient account not found' });
      }

      if (parseFloat(fromAccount.balance) < parseFloat(amount)) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }

      const newFromBalance = parseFloat(fromAccount.balance) - parseFloat(amount);
      const newToBalance = parseFloat(toAccount.balance) + parseFloat(amount);

      await Account.updateBalance(fromAccountId, newFromBalance);
      await Account.updateBalance(toAccount.id, newToBalance);

      const transaction = await Transaction.create({
        from_account_id: fromAccountId,
        to_account_id: toAccount.id,
        amount,
        type: 'transfer',
        description: description || 'Fund Transfer'
      });

      res.json({
        message: 'Transfer successful',
        transaction
      });
    } catch (error) {
      console.error('Transfer error:', error);
      res.status(500).json({ error: 'Transfer failed' });
    }
  }

  static async getTransactionHistory(req, res) {
    try {
      const { accountId } = req.params;
      const { limit = 50, offset = 0 } = req.query;

      const account = await Account.findById(accountId);
      if (!account || account.user_id !== req.user.id) {
        return res.status(404).json({ error: 'Account not found' });
      }

      const transactions = await Transaction.findByAccountId(
        accountId,
        parseInt(limit),
        parseInt(offset)
      );

      const totalCount = await Transaction.getAccountTransactionCount(accountId);

      res.json({
        transactions,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total: totalCount
        }
      });
    } catch (error) {
      console.error('Get transaction history error:', error);
      res.status(500).json({ error: 'Failed to retrieve transaction history' });
    }
  }

  static async getTransactionDetails(req, res) {
    try {
      const { transactionId } = req.params;
      const transaction = await Transaction.findById(transactionId);

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      const account = await Account.findById(
        transaction.from_account_id || transaction.to_account_id
      );

      if (account.user_id !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      res.json({ transaction });
    } catch (error) {
      console.error('Get transaction details error:', error);
      res.status(500).json({ error: 'Failed to retrieve transaction details' });
    }
  }
}

module.exports = TransactionController;
