const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

router.post('/new', UserController);
router.get('/:id', UserController);

module.exports = router;
