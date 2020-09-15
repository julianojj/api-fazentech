const tokenServices = require('../services/tokenServices');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const response = tokenServices.validateToken(token, process.env.JWT_KEY);

        req.usuario = response;

        next();
    } catch (err) {
        res.status(401).send({
            message: 'Token inválido'
        });
    }
}
