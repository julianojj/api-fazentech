const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const bcryptServices = require('../services/bcryptServices');
const tokenServices = require('../services/tokenServices');

router.post('/new', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    if (user.name == '' || user.email == '' || user.password == '') {
        res.status(200).send({
            message: 'Campos estão nulos'
        });
    } else {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            const hash = bcryptServices.generateHash(user.password);

            conn.query(`INSERT INTO user(nameUser, emailUser, passwordUser)
            VALUES('${user.name}', '${user.email}', '${hash}')`,
                (err, result) => {
                    if (err) {
                        res.status(200).send({
                            message: 'Email em uso'
                        });
                    } else {
                        res.status(200).send({
                            token: tokenServices.generateToken({
                                idUser: result.insertId,
                            })
                        });
                    }
                });

            conn.release();
        });
    }
});

router.get('/:id', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(`SELECT idUser, nameUser, emailUser 
        FROM user
        WHERE idUser = ${req.params.id}`,
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
