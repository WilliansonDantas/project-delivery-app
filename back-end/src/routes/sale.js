const { Router } = require('express');
const { register } = require('../controller/saleController');

const saleRouter = Router();

saleRouter.post('/sales', register);

module.exports = saleRouter;