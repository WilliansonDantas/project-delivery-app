const { Router } = require('express');
const registerController = require('../controller/registerController');

const registerRouter = Router();

registerRouter.post('/register', registerController);

module.exports = registerRouter;