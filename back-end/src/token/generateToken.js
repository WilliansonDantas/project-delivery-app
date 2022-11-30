const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret_key';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = ({ email }) => {
  const token = jwt.sign({ data: { email } },
     secret, jwtConfig);
  return token;
};

module.exports = generateToken;