const { Router } = require('express');
const { getSellers } = require('../controller/sellersController');
const { validateJWT } = require('../middlewares');

const sellerRouter = Router();

sellerRouter.get('/sellers', validateJWT, getSellers);

module.exports = sellerRouter;