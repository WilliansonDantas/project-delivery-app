const md5 = require('md5');
const registerUser = require('../service/registerService');

const register = async (req, res) => {
  const { body: { name, email, password } } = req;
  try {
    await registerUser(name, email, md5(password));
    return res.status(201).json('Created');
  } catch (error) {
    return res.status(409).json('Conflict');
  }
};

module.exports = { register };
