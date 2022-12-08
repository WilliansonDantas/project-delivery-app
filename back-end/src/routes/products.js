const { Router } = require('express');
const { request } = require('../controller/requestProductsController');
const { validateJWT, registerSaleValidation } = require('../middlewares');

const productsRouter = Router();

productsRouter.get('/products', validateJWT, registerSaleValidation, request);

module.exports = productsRouter;