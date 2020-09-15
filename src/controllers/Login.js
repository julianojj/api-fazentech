const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const bcryptServices = require('../services/bcryptServices');
const tokenServices = require('../services/tokenServices');

router.post('/', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    if (user.email == '' || user.password == '') {
        res.status(200).send({
            message: 'Campos estão nulos'
        });
    } else {
        pool.getConnection((err, conn) => {
            if (err) throw err;
    
            conn.query(`SELECT * FROM user 
            WHERE emailUser = '${user.email}'`, 
            (err, result) => {
                if (err) throw err;
    
                if (result == 0) {
                    res.status(200).send({
                        message: 'Dados inválidos'
                    });
                } else {
                    const match = bcryptServices.decryptHash(user.password, result[0].passwordUser);
    
                    if (match) {
                        res.status(200).send({
                            token: tokenServices.generateToken({
                                idUser: result[0].idUser,
                                nameUser: result[0].nameUser,
                                emailUser: result[0].emailUser,
                                is_admin: result[0].is_admin
                            })
                        });
                    } else {
                        res.status(200).send({
                            message: 'Dados inválidos'
                        });
                    }
                }
            });
    
            conn.release();
        });
    }
});

module.exports = router;
