const md5 = require('md5');
const LoginService = require('../service/loginService');
const generateToken = require('../token/generateToken');

const getToken = async (req, res) => {
  const { email, password } = req.body;

  const md5Password = md5(password);
  
  try {
    const data = await LoginService.getUser(email, md5Password);
    const { name, role } = data;
    const token = generateToken(data);
    return res.status(200).json({ name, role, email, token });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { getToken };