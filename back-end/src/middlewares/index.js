const validateLogin = require('./validateLoginMiddleware');
const validateRegister = require('./validateRegisterMiddleware');

module.exports = { 
  validateLogin, 
  validateRegister,
};