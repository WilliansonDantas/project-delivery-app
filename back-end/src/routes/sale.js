const { Router } = require('express');
const { register, getSale } = require('../controller/saleController');
const { validateJWT, registerSaleValidation } = require('../middlewares');

const saleRouter = Router();

saleRouter.post('/sale', validateJWT, registerSaleValidation, register);

saleRouter.get('/sale/:id', validateJWT, getSale);

module.exports = saleRouter;