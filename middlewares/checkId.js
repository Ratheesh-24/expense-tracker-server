const mongoose = require('mongoose');

// middleware to check for a valid object id

const objId = mongoose.Types.ObjectId;

const checkUrlObjectId = (id) => (req, res, next) => {
    
    if (!objId.isValid(req.params[id])) return res.status(400).json({
        message: 'Invalid ID, Not Match'
    });
    next();
};

module.exports = checkUrlObjectId;