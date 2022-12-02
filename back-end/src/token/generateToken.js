const jwt = require('jsonwebtoken');
const jwtEvaluationKey = require('../../jwt.evaluation.key.js');

const secret = process.env.JWT_SECRET || jwtEvaluationKey;
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