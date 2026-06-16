const express = require('express');
const AccountController = require('../controllers/accountController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/', AccountController.createAccount);
router.get('/', AccountController.getAccounts);
router.get('/:accountId', AccountController.getAccountDetails);
router.post('/:accountId/deposit', AccountController.deposit);
router.post('/:accountId/withdraw', AccountController.withdraw);

module.exports = router;
