const { Router } = require('express');
const { getSellers, getSellerOrders } = require('../controller/sellersController');
const { validateJWT } = require('../middlewares');

const sellerRouter = Router();

sellerRouter.get('/sellers', validateJWT, getSellers);

sellerRouter.get('/sellers/:id/orders', validateJWT, getSellerOrders);

module.exports = sellerRouter;