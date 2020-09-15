const jwt = require('jsonwebtoken');

module.exports = {
    generateToken (payload) {
        return jwt.sign(
            payload,
            process.env.JWT_KEY,
            {
                expiresIn: 86400
            }
        );
    },
    validateToken (token, JWT_KEY) {
        return jwt.verify(token, JWT_KEY);
    }
}
