const LoginService = require('../service/loginService')
const generateToken = require('../token/generateToken');
const md5 = require('md5')

const getToken = async (req, res) => {
  const { email, password } = req.body;

  const md5Password = md5(password)
  
  try {
    const data = await LoginService.getUser(email, md5Password);
    const token = generateToken(data);
    return res.status(200).json({ token });

  } catch (error) {
    return res.status(400).json({ message: error.message})
  }
};

module.exports = { getToken };