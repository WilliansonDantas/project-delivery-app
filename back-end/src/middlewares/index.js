const validateLogin = require('./validateLoginMiddleware');
const validateRegister = require('./validateRegisterMiddleware');
const validateJWT = require('./validateJWT');

module.exports = { 
  validateJWT,
  validateLogin, 
  validateRegister,
};