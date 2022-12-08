const { Router } = require('express');
const { register } = require('../controller/saleController');
const { validateJWT, registerSaleValidation } = require('../middlewares');

const saleRouter = Router();

saleRouter.post('/sale',validateJWT, registerSaleValidation, register);

module.exports = saleRouter;