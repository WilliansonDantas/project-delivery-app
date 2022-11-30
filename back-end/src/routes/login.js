const { Router } = require("express");

const router = Router()

import loginController from '../controller/loginCrontoller'

router.post('/login', loginController.getToken)

export default router;