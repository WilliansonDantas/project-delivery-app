const { Router } = require('express');

const loginRouter = Router();

const { getToken } = require('../controller/loginCrontoller');

loginRouter.post('/login', (req, res, next) => getToken(req, res, next));

module.exports = loginRouter;