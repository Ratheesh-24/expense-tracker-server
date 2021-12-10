const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	text: {
		type: String,
		trim: true,
		required: [ true, 'Please add some text' ]
	},
	amount: {
		type: Number,
		required: [ true, 'Please add a positive or negative number' ]
	},
	category: {
		type: String,
		required: [ true, 'Please select one of these category' ]
	},
	subCategory: {
		type: String,
		required: [ true, 'Please select a subCategory' ]
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Transaction', TransactionSchema);
