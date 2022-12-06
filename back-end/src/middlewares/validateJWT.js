const jwt = require('jsonwebtoken');
const jwtEvaluationKey = require('../../jwt.evaluation.key.js');
require('dotenv').config();

const validateJWT = (req, res, next) => {
  const { headers: { authorization } } = req;

  try {
    jwt.verify(authorization, process.env.JWT_SECRET || jwtEvaluationKey);
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = validateJWT;