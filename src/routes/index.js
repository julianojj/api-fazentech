const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');

router.get('/', authorization, (req, res) => {
    res.status(200).send(req.usuario);
});

module.exports = router;
