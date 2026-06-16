const express = require('express');
const LoanController = require('../controllers/loanController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/apply', LoanController.applyLoan);
router.get('/', LoanController.getLoanHistory);
router.get('/:loanId', LoanController.getLoanDetails);
router.put('/:loanId/approve', authorizeRole(['admin']), LoanController.approveLoan);
router.put('/:loanId/reject', authorizeRole(['admin']), LoanController.rejectLoan);

module.exports = router;
