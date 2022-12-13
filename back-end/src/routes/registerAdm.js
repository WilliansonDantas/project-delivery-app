const { Router } = require('express');
const { registerAdm } = require('../controller/registerAdmController');
const { validateJWT, validateRegister } = require('../middlewares');

const registerAdmRouter = Router();

registerAdmRouter.post('/adm/register', validateRegister, registerAdm);

module.exports = registerAdmRouter;