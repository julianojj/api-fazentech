const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/Product');

router.post('/new', ProductController);
router.get('/', ProductController);
router.get('/:id', ProductController);

module.exports = router;
