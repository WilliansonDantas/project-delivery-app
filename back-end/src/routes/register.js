const { Router } = require('express');
const { register } = require('../controller/registerController');
const { validateRegister } = require('../middlewares');

const registerRouter = Router();

registerRouter.post('/register', validateRegister, register);

module.exports = registerRouter;