const { Router } = require('express');
const { request, deleteUser } = require('../controller/usersController');
const { validateJWT } = require('../middlewares');

const usersRouter = Router();

usersRouter.get('/users', validateJWT, request);

usersRouter.delete('/users/:id', validateJWT, deleteUser);

module.exports = usersRouter;