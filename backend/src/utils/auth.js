const jwt = require('jsonwebtoken');

const generateToken = (user, remember = false) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: !remember ? '3h' : '7d'
    });
};

module.exports = { generateToken };