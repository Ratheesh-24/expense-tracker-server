const express = require('express');
const router = express.Router();
const protectedUser = require('../middlewares/auth');
const checkObjectId = require('../middlewares/checkId');
const { getTransactions, addTransaction, deleteTransaction } = require('../controller/transaction');

router.route('/').get(protectedUser, getTransactions).post(protectedUser, addTransaction);
router.route('/:id').delete(protectedUser, checkObjectId('id'), deleteTransaction);

module.exports = router;
