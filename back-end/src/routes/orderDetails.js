const { Router } = require('express');
const { orderByUser } = require('../controller/ordersDetailsController');
const { validateJWT } = require('../middlewares');

const orderDetails = Router();

orderDetails.get('/order/details/:id', validateJWT, orderByUser);

module.exports = orderDetails;