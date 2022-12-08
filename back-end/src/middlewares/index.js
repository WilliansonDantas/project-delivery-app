const validateLogin = require('./validateLoginMiddleware');
const validateRegister = require('./validateRegisterMiddleware');
const validateJWT = require('./validateJWT');
const registerSaleValidation = require('./validateRegisterSaleMiddleware');

module.exports = { 
  validateJWT,
  validateLogin, 
  validateRegister,
  registerSaleValidation
};