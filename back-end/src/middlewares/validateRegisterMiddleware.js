const registerSchema = require('../joi/schemas');

const registerValidation = (req, res, next) => {
  const { body: { email, password } } = req;

    const { error } = registerSchema.validate({ email, password });
    if (error) return res.status(400).json({ message: error.message });
   
    next();
};

module.exports = registerValidation;