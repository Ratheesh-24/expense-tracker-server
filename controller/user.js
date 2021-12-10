const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

//==============DESC=================POST A NEW USER=================
//==============ROUTE================POST /api/users=================
//==============ACCESS===============PUBLIC==========================

router.post(
	'/',
	[
		check('name', 'Name is Required...').not().isEmpty(),
		check('email', 'Please, Enter a valid e-mail...').isEmail(),
		check('password', 'Please, Enter a password that have 8 or more letters...').isLength({ min: 6 })
	],
	async (req, res) => {
		// if user's entered credentials are not in required form
		const error = validationResult(req);
		if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

		//destructuring users details from req.body (frontend)
		const { name, email, password } = req.body;

		try {
			//find email in User model @database
			let user = await User.findOne({ email });

			//user validation => already exists or not!
			if (user) return res.status(404).json({ message: 'User already exists' });

			//creating instances of user model to be saved in DB
			user = new User({
				name,
				email,
				password
			});

			//Hashing Password Before Saving to Database
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			//saving to Database
			await user.save();

			//payload for json web token
			const payload = {
				user: {
					id: user.id
				}
			};

			//create json web token for a unique user
			jsonwebtoken.sign(payload, process.env.SECRET_KEY, { expiresIn: '7 days' }, (error, token) => {
				if (error) throw error;
				res.json({ token });
			});
		} catch (error) {
			console.error(error);
			res.status(500).json('Server Error');
		}
	}
);

module.exports = router;
