// const LoginService = require('../services/login.service');
import generateToken from '../token/generateToken';

const getToken = async (req, res) => {
  const { email, password } = req.body;
  const data = await LoginService.getUsers({ email, password });

  if (!data) return res.status(400).json({ message: 'Invalid fields' });

  const token = generateToken(data);

  res.status(200).json({ token });
};

export default {
  getToken,
};