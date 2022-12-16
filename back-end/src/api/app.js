const express = require('express');
const cors = require('cors');
const error = require('../middlewares/error');
const { 
  registerAdmRouter, 
  loginRouter,
  registerRouter,
  productsRouter,
  saleRouter,
  sellerRouter,
  orderDetails,
  usersRouter,
  } = require('../routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(loginRouter);
app.use(registerRouter);
app.use(registerAdmRouter);
app.use(express.static('public'));
app.use(productsRouter);
app.use(saleRouter);
app.use(sellerRouter);
app.use(orderDetails);
app.use(usersRouter);
app.use(error);

module.exports = app;