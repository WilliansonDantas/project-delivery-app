const loginRouter = require('./login');

const registerRouter = require('./register');
const productsRouter = require('./products');
const saleRouter = require('./sale');

const registerAdmRouter = require('./registerAdm');

const sellerRouter = require('./sellers');
const orderDetails = require('./orderDetails')

module.exports = { 
  registerAdmRouter,
  loginRouter,
  registerRouter,
  productsRouter,
  saleRouter, 
  sellerRouter,
  orderDetails
};

