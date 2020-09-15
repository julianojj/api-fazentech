const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(morgan('dev'));

const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const productRoutes = require('./routes/product');
const indexRoutes = require('./routes/index');

app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/products', productRoutes);
app.use('/', indexRoutes);

module.exports = app;
