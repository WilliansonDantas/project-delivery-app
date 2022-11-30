const md5 = require('md5');
const registerUser = require('../service/registerService');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    await registerUser(name, email, md5(password));
    return res.status(201).json('Created');
  } catch (error) {
    next(error);
  }
};

module.exports = register;