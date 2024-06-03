const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const generateToken = (username, email) => {
    try {
        const token = jwt.sign(
            { username, email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        return token;
    } catch (err) {
        console.error(err.message);
        return "";
    }
}

module.exports = generateToken;
