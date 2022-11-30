const { Router } = require('express');
const registerController = require('../controller/registerController');

const registerRouter = Router();

registerRouter.post('/register', (req, res, next) => registerController(req, res, next));