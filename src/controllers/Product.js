const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const upload = require('../services/upload');
const authorizationMiddleware = require('../middlewares/authorization');

router.post('/new', authorizationMiddleware, upload.single('image'), (req, res) => {
    const product = {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.file.filename
    }

    if (product.name == '' || product.quantity == '' || product.price == '' || product.image == '') {
        res.status(200).send({
            message: 'Campos estão nulos'
        });
    } else {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(`INSERT INTO product(nameProduct, quantityProduct, priceProduct, imageProduct)
            VALUES('${product.name}', '${product.quantity}', '${product.price}', '${product.image}')`,
                (err, result) => {
                    if (err) throw err;

                    res.status(200).send({
                        idProduct: result.insertId
                    });
                });

            conn.release();
        });
    }
});

router.get('/', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT * FROM product`,
            (err, result) => {
                if (err) throw err;

                if (result == 0) {
                    res.status(200).send({
                        message: 'Não há produtos'
                    });
                } else {
                    res.status(200).send(result);
                }
            });

        conn.release();
    });
});

router.get('/:id', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT * FROM product
        WHERE idProduct = ${req.params.id}`,
            (err, result) => {
                if (err) throw err;

                if (result == 0) {
                    res.status(200).send({
                        message: 'Id não existe'
                    });
                } else {
                    res.status(200).send(result);
                }
            });

        conn.release();
    });
});

module.exports = router;
