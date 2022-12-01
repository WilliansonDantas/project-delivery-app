const { Router } = require('express');
const { request } = require('../controller/requestProductsController');

const productsRouter = Router();

productsRouter.get('/products', request);

module.exports = productsRouter;