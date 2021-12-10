const Transaction = require('../models/Transaction');
const User = require('../models/User');

//==============DESC=================GET ALL TRANSACTIONS=============
//==============ROUTE================GET /api/transactions============
//==============ACCESS===============PRIVATE==========================

exports.getTransactions = async (req, res, next) => {
	try {
		const transactions = await Transaction.find();

		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions
		});
	} catch (err) {
		res.status(500).json({ message: error.message });
	}
};

//==============DESC=================ADD TRANSACTIONS=====================
//==============ROUTE================POST /api/transactions===============
//==============ACCESS===============PRIVATE==============================

exports.addTransaction = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		const { text, amount, category, subCategory } = req.body;

		const newTransaction = new Transaction({
			text,
			amount,
			category,
			subCategory,
			user: req.user.id,
			name: user.name,
			
		});

		const transaction = await newTransaction.save();

		return res.status(201).json({
			success: true,
			data: transaction
		});
	} catch (err) {
		if (err.name === 'ValidationError') {
			const messages = Object.values(err.errors).map((val) => val.message);

			return res.status(400).json({
				message: 'Server Error'
			});
		} else {
			res.status(500).json({ message: error.message });
		}
	}
};

//==============DESC=================DELETE TRANSACTION========================
//==============ROUTE================DELETE /api/transactions/:id==============
//==============ACCESS===============PRIVATE===================================

exports.deleteTransaction = async (req, res) => {
	try {
		const transaction = await Transaction.findById(req.params.id);

		if (!transaction) {
			return res.status(404).json({
				success: false,
				error: 'No transaction found'
			});
		}

		if (transaction.user.toString() !== req.user.id)
			return res.status(401).json({ message: 'User Not Authorized!' });

		await transaction.remove();

		return res.status(200).json({
			success: true,
			data: {}
		});
	} catch (err) {
		res.status(500).json({ message: error.message });
	}
};
