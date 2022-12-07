const express = require('express');
const cors = require('cors');
const error = require('../middlewares/error');
const { loginRouter, registerRouter, productsRouter, saleRouter } = require('../routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(loginRouter);
app.use(registerRouter);
app.use(express.static('public'));
app.use(productsRouter);
app.use(saleRouter);
app.use(error);

module.exports = app;
