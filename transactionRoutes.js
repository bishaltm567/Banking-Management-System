const express = require('express');
const TransactionController = require('../controllers/transactionController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/transfer', TransactionController.transfer);
router.get('/:accountId/history', TransactionController.getTransactionHistory);
router.get('/:transactionId/details', TransactionController.getTransactionDetails);

module.exports = router;
