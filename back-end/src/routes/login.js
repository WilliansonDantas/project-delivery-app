const { Router } = require('express');

const { validateLogin } = require('../middlewares');
const loginRouter = Router();
const { getToken } = require('../controller/loginCrontoller');

loginRouter.post('/login', validateLogin, getToken);

module.exports = loginRouter;
