const jsonwebtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
	//Get Token from headers
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	// Verify token
	try {
		jsonwebtoken.verify(token, process.env.SECRET_KEY, (error, verified) => {
			if (error) {
				return res.status(401).json({ message: 'Token is Not valid' });
			} else {
				req.user = verified.user;
				next();
			}
		});
	} catch (err) {
		console.error('something wrong with auth middleware');
		res.status(500).json({ message: 'Server Error' });
	}
};
