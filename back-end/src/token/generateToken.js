const jwt = require('jsonwebtoken');
const fs = require('fs');
const { join } = require('path');

const path = '../../jwt.evaluation.key';

const secret = fs.readFileSync(join(__dirname, path), 'utf-8');
const jwtConfig = {
  algorithm: 'HS256',
};

const generateToken = ({ email }) => {
  const token = jwt.sign({ data: { email } },
     secret, jwtConfig);
  return token;
};

module.exports = generateToken;