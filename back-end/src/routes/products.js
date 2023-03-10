const { Router } = require('express');
const { request } = require('../controller/requestProductsController');
const { validateJWT } = require('../middlewares');

const productsRouter = Router();

productsRouter.get('/products', validateJWT, request);

module.exports = productsRouter;