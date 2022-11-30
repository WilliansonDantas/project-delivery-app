const { loginSchema } = require('../joi/schemas');

const mailValidation = (req, res, next) => {
  const { body: { email, password } } = req;

    const { error } = loginSchema.validate({ email, password });
    if (error) return res.status(400).json({ message: error.message });
   
    next();
};

module.exports = mailValidation;