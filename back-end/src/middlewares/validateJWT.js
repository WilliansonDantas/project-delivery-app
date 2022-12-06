const jwt = require('jsonwebtoken');
const fs = require('fs');
const { join } = require('path');
require('dotenv').config();

const path = '../../jwt.evaluation.key';

const validateJWT = (req, res, next) => {
  const { headers: { authorization } } = req;

  try {
    jwt.verify(authorization, fs.readFileSync(join(__dirname, path), 'utf-8'));
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = validateJWT;