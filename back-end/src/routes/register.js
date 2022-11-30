const { Router } = require('express');
const registerController = require('../controller/registerController');
const { validateRegister } = require('../middlewares');

const registerRouter = Router();

registerRouter.post('/register', validateRegister, registerController);

module.exports = registerRouter;